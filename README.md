<img src="nuxeo-logo.png" style="width:7%" align="right" />

# Nuxeo Studio Custom Elements

This repository aims at helping the Nuxeo Community to enrich Nuxeo Studio projects. It provides a list of features and visual elements ready to be copy-pasted. The modules are for **LTS 2019**:

- They can be unrelated to the UI (to provide new backend features, such as utilities to handle multimedia files, specific conversions, email templates etc.).
- They can be related to provide elements for Nuxeo Web UI, or any frontend applications.

## Module listing

For reasons of clarity, all the contributions are referenced in a separate page. Each module will be categorized by:

- Contributor
- Supported Version
- Feature category
- Requiered addons

## Getting Started

There is nothing to build. Each module generally contains:

- XML extension, Page providers, Automation chain or automation scripting into Nuxeo Studio Modeler
- Layouts, contributions within the Nuxeo Bundle file,  HTML resources, medias that should be created in Nuxeo Studio Designer.

You can clone the repository:

```
git clone https://github.com/nuxeo/nuxeo-studio-custom-elements.git
```

### Prerequisites

A **Nuxeo Studio Account** as well as an **active Nuxeo Studio Project** is needed. You can create an account from our [registration page](https://connect.nuxeo.com/register/#/) and benefit from a free 30-day trial to get access to:

- Nuxeo Studio, the web-based configuration and customization environment
- Nuxeo Marketplace, the application store with ready-to-install plugins and packages

## Repository Structuration

Each new module should are created in a specific folder:

- `/contributions/nuxeo`: Contributions from the Nuxeo Team, for demos, PoC or tests.
- `/contributions/partners`: Contributions from the Nuxeo Partner Ecosystem.
- `/contributions/community`: Contributions from the Nuxeo Community.

## Contributing

You should follow the repository contribution [guidelines](toolkit-and-guidelines) when submitting a new addon

- If you're a partner, create your partner folder under `/contributions/partners/` if it doesn't exist already. Then, create the readme file to present your company and the contributions. We provide a [README-PARTNER.MD template](toolkit-and-guidelines/README-PARTNER.md).
- Create a README file to present your contribution, using the [README-MODULE.MD template](toolkit-and-guidelines/README-MODULE.md)
- Upload your ressources
- Your contribution will be then checked by the Nuxeo Team before being published.

## Support

:warning: **These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Learn

- [Nuxeo Documentation](https://doc.nuxeo.com)
- [Nuxeo University](https://university.nuxeo.com)

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)


## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
