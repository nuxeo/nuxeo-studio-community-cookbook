#!/usr/bin/env bash
#
# Installs pdf2htmlEX in a Nuxeo LTS 2025 image/container (Oracle Linux 9, x86_64 or aarch64). Run as root.
#
# There is no dnf package for pdf2htmlEX on Oracle Linux 9, so it is compiled from source (~2 minutes on a recent
# machine). The compilers and -devel packages installed for the build are removed at the end.
#
#   In a Dockerfile:          COPY build_nuxeo/install-pdf2htmlex.sh /tmp/install-pdf2htmlex.sh
#                             RUN bash /tmp/install-pdf2htmlex.sh && rm -f /tmp/install-pdf2htmlex.sh
#
#   In a running container:   docker cp install-pdf2htmlex.sh <container>:/tmp/
#                             docker exec -u 0 <container> bash /tmp/install-pdf2htmlex.sh
#
# Safe to run again after a failure.

set -euo pipefail

# Versions (can be overridden from the environment)
PDF2HTMLEX_REF="${PDF2HTMLEX_REF:-cb7806aecbbee435e086be248fa068fbe3dc24c9}"   # master, July 2025
PDF2HTMLEX_VERSION="${PDF2HTMLEX_VERSION:-0.18.8.rc2}"
POPPLER_VERSION="${POPPLER_VERSION:-24.04.0}"   # most recent poppler that builds with EL9's FreeType 2.10 / GLib 2.68
POPPLER_DATA_VERSION="${POPPLER_DATA_VERSION:-0.4.12}"
FONTFORGE_VERSION="${FONTFORGE_VERSION:-20230101}"

PREFIX=/opt/pdf2htmlEX
WORK=/tmp/pdf2htmlex-build
RPMS_BEFORE=/tmp/pdf2htmlex-rpms-before
RPMS_AFTER=/tmp/pdf2htmlex-rpms-after

if [ "$(id -u)" -ne 0 ]; then
    echo "Must run as root (docker exec -u 0 ...)" >&2
    exit 1
fi

set -x

# Runtime libraries needed by pdf2htmlEX (kept), + metric-compatible fonts for Word documents
dnf -y install cairo freetype fontconfig glib2 libpng libjpeg-turbo openjpeg2 libxml2 zlib \
    liberation-fonts google-carlito-fonts dejavu-sans-fonts

# Remember what was installed before adding the build tools, to remove only those at the end.
# (Kept from a previous failed run, so that a re-run still removes the right packages.)
[ -s "$RPMS_BEFORE" ] || rpm -qa --qf '%{NAME}\n' | sort -u > "$RPMS_BEFORE"

# Build-only packages (removed at the end)
dnf -y --enablerepo=ol9_codeready_builder --setopt=install_weak_deps=False install \
    gcc gcc-c++ make cmake pkgconf-pkg-config xz gettext \
    cairo-devel freetype-devel fontconfig-devel glib2-devel libpng-devel \
    libjpeg-turbo-devel openjpeg2-devel libxml2-devel zlib-devel
rpm -qa --qf '%{NAME}\n' | sort -u > "$RPMS_AFTER"

# Sources
rm -rf "$WORK"
mkdir -p "$WORK/poppler" "$WORK/poppler-data" "$WORK/fontforge"
cd "$WORK"
curl -fsSL "https://github.com/pdf2htmlEX/pdf2htmlEX/archive/${PDF2HTMLEX_REF}.tar.gz" | tar xz --strip-components=1
curl -fsSL "https://poppler.freedesktop.org/poppler-${POPPLER_VERSION}.tar.xz" | tar xJ --strip-components=1 -C poppler
curl -fsSL "https://poppler.freedesktop.org/poppler-data-${POPPLER_DATA_VERSION}.tar.gz" | tar xz --strip-components=1 -C poppler-data
curl -fsSL "https://github.com/fontforge/fontforge/archive/${FONTFORGE_VERSION}.tar.gz" | tar xz --strip-components=1 -C fontforge

# Poppler: static libs only, the minimum pdf2htmlEX needs (same options as pdf2htmlEX's own build scripts)
cmake -S poppler -B poppler/build -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX="$PREFIX" \
    -DBUILD_SHARED_LIBS=OFF -DENABLE_UNSTABLE_API_ABI_HEADERS=OFF -DENABLE_UTILS=OFF -DENABLE_CPP=OFF \
    -DENABLE_GLIB=ON -DENABLE_GOBJECT_INTROSPECTION=OFF -DENABLE_GTK_DOC=OFF -DENABLE_QT5=OFF -DENABLE_QT6=OFF \
    -DENABLE_BOOST=OFF -DENABLE_SPLASH=ON -DENABLE_LIBOPENJPEG=openjpeg2 -DENABLE_DCTDECODER=libjpeg \
    -DENABLE_LCMS=OFF -DENABLE_LIBCURL=OFF -DENABLE_LIBTIFF=OFF -DENABLE_NSS3=OFF -DENABLE_GPGME=OFF \
    -DENABLE_ZLIB=ON -DENABLE_ZLIB_UNCOMPRESS=OFF -DBUILD_GTK_TESTS=OFF -DBUILD_QT5_TESTS=OFF \
    -DBUILD_QT6_TESTS=OFF -DBUILD_CPP_TESTS=OFF -DBUILD_MANUAL_TESTS=OFF -DRUN_GPERF_IF_PRESENT=OFF \
    -DEXTRA_WARN=OFF -DWITH_JPEG=ON -DWITH_PNG=ON -DWITH_Cairo=ON
make -C poppler/build -j"$(nproc)"

# FontForge: static lib, no GUI, no python
cmake -S fontforge -B fontforge/build -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX="$PREFIX" \
    -DBUILD_SHARED_LIBS=OFF -DENABLE_GUI=OFF -DENABLE_X11=OFF -DENABLE_NATIVE_SCRIPTING=ON \
    -DENABLE_PYTHON_SCRIPTING=OFF -DENABLE_PYTHON_EXTENSION=OFF -DENABLE_LIBSPIRO=OFF \
    -DENABLE_LIBUNINAMESLIST=OFF -DENABLE_LIBGIF=OFF -DENABLE_LIBJPEG=ON -DENABLE_LIBPNG=ON \
    -DENABLE_LIBREADLINE=OFF -DENABLE_LIBTIFF=OFF -DENABLE_WOFF2=OFF -DENABLE_DOCS=OFF \
    -DENABLE_CODE_COVERAGE=OFF -DENABLE_DEBUG_RAW_POINTS=OFF -DENABLE_FONTFORGE_EXTRAS=OFF \
    -DENABLE_MAINTAINER_TOOLS=OFF -DENABLE_TILE_PATH=OFF -DENABLE_WRITE_PFM=OFF \
    -DENABLE_SANITIZER=none -DREAL_TYPE=double -DTHEME=tango
make -C fontforge/build -j"$(nproc)"

# pdf2htmlEX itself (statically linked with the poppler + fontforge built above)
PDF2HTMLEX_VERSION="$PDF2HTMLEX_VERSION" cmake -S pdf2htmlEX -B pdf2htmlEX/build \
    -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX="$PREFIX"
make -C pdf2htmlEX/build -j"$(nproc)"
make -C pdf2htmlEX/build install
make -C poppler-data install prefix="$PREFIX" datadir="$PREFIX/share/pdf2htmlEX"
ln -sf "$PREFIX/bin/pdf2htmlEX" /usr/local/bin/pdf2htmlEX

# Cleanup: remove only the packages added for the build, then the sources
cd /
comm -13 "$RPMS_BEFORE" "$RPMS_AFTER" | xargs -r dnf -y remove
dnf clean all
rm -rf "$WORK" /tmp/pdf2htmlEX "$RPMS_BEFORE" "$RPMS_AFTER" /var/cache/dnf

# Fails if a runtime library is missing
pdf2htmlEX --version

set +x
echo "pdf2htmlEX installed in $PREFIX (command: /usr/local/bin/pdf2htmlEX)"
