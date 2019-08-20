
# SAML User Mapping

## Description

SAML authorizations contain a number of Attributes that can be mapped for a particular user account.  Based on the OpenSAML parsing of the response, this mapper will translate those values to a Nuxeo Principal account.  This example can be used to map the first & last names as well as email.  The native SAML identifier is used for the system username.

## Installation

### Studio Modeler

Create an XML extension with the content of `mapping-config.xml`
