function run(input, params) {
    var storyboard = input['vid:storyboard'];
    if (storyboard && storyboard.length) {
        for (var i = 0; i < storyboard.length; i++) {
            var thumb = storyboard[i];
            if (thumb.timecode == params.value) {
                input = Document.SetBlob(
                    input, {
                        'file': thumb.content,
                        'save': true,
                        'xpath': 'thumb:thumbnail'
                    }
                );
                if (input.hasFacet("Video")) {
                    ctx.Picture = thumb.content;
                    RunScript(
                        input, {
                            'script': 'Context.Views = [ new org.nuxeo.ecm.platform.picture.api.PictureConversion("Small", null, null, 350), new org.nuxeo.ecm.platform.picture.api.PictureConversion("StaticPlayerView", null, null, 640) ];' +
                                'Context.Blobs = org.nuxeo.runtime.api.Framework.getService(org.nuxeo.ecm.platform.picture.api.ImagingService).computeViewsFor(Context.Picture, Context.Views, true);'
                        }
                    );
                    if (ctx.Blobs) {
                        // Remove old views
                        input = Document.RemoveProperty(
                            input, {
                                'xpath': 'picture:views',
                                'save': false
                            }
                        );

                        // Add new views
                        var views = [];
                        var blobs = [];
                        for (var x = 0; x < ctx.Blobs.length; x++) {
                            var map = ctx.Blobs[x].asMap();
                            var blob = map.remove("content");
                            blobs.push(blob);
                            var complex = {
                                "filename": map.filename,
                                "width": map.width,
                                "description": map.description,
                                "tag": map.tag,
                                "title": map.title,
                                "height": map.height,
                                "info": {
                                    "colorSpace": map.info.colorSpace,
                                    "depth": map.info.depth,
                                    "width": map.info.width,
                                    "format": map.info.format,
                                    "height": map.info.height
                                }
                            };
                            views.push(complex);
                        }
                        input = Document.AddItemToListProperty(
                            input, {
                                'xpath': 'picture:views',
                                'save': false,
                                'complexJsonProperties': JSON.stringify(views)
                            }
                        );
                        for (var y = 0; y < blobs.length; y++) {
                            var image = blobs[y];
                            input = Document.SetBlob(input, {
                                'file': image,
                                'xpath': 'picture:views/' + y + '/content',
                                'save': false
                            });
                        }
                        input = Document.Save(input, {});
                    }
                }
                break;
            }
        }
    }
    return input;
}
