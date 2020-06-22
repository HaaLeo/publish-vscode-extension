# Publish VS Code Extension &#8212; GitHub Action

[![Build Status](https://github.com/HaaLeo/publish-vscode-extension/workflows/CI/badge.svg)](https://github.com/HaaLeo/publish-vscode-extension/actions?query=workflow%3ACI) [![Stars](https://img.shields.io/github/stars/HaaLeo/publish-vscode-extension.svg?label=Stars&logo=github&style=flat-square)](https://github.com/HaaLeo/publish-vscode-extension/stargazers) 
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/HaaLeo/publish-vscode-extension/master/LICENSE.txt)  
[![David](https://img.shields.io/david/HaaLeo/publish-vscode-extension.svg?style=flat-square)](https://david-dm.org/HaaLeo/publish-vscode-extension) [![David](https://img.shields.io/david/dev/HaaLeo/publish-vscode-extension.svg?style=flat-square)](https://david-dm.org/HaaLeo/publish-vscode-extension?type=dev)  
[![Donate](https://img.shields.io/badge/☕️-Buy%20Me%20a%20Coffee-blue.svg?&style=flat-square)](https://www.paypal.me/LeoHanisch/3eur)

GitHub action to publish your VS Code Extension to the [Open VSX Registry](https://open-vsx.org/) or the [Visual Studio Marketplace](https://marketplace.visualstudio.com).

## Usage

To use the GitHub Action, you need to [reference the action](https://help.github.com/en/actions/automating-your-workflow-with-github-actions) in your workflow file.

### Example

The following example shows a workflow that publishes an extension to the Open VSX Registry as well as to the Visual Studio Marketplace when a new tag was created:

```yaml
on:
  push:
    tags:
      - "*"

name: Deploy Extension
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - name: Publish to Open VSX Registry
        uses: HaaLeo/publish-vscode-extension@v0
        with:
          pat: ${{ secrets.OPEN_VSX_TOKEN }}
      - name: Publish to Visual Studio Marketplace
        uses: HaaLeo/publish-vscode-extension@v0
        with:
          pat: ${{ secrets.OPEN_VSX_TOKEN }}
          registryUrl: https://marketplace.visualstudio.com
```

### Open VSX Registry

To publish to the Open VSX Registry ensure that your [extension's namespace](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#2-create-the-namespace) was created **beforehand**.
By default, the only thing you need to do is to set the `pat` parameter to your [Open VSX access token](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#1-create-an-access-token). 

### Visual Studio Marketplace

In order to upload your extension to the VS Marketplace you need to set the `pat` option to the corresponding [access token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token). 
Further, the `registryUrl` must be set to `https://marketplace.visualstudio.com`.


## Input Parameters

You can set any or all of the following input parameters:

|Name |Type |Required? |Default |Description
|-|-|-|-|-
|`pat` |string  |yes |-|The [Open VSX access token](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#1-create-an-access-token)
|`extensionFile` |string  |no | - |Path to the vsix file to be published. Cannot be used together with packagePath.
|`registryUrl` |string  |no |`https://open-vsx.org` |Use the registry API at this base URL
|`packagePath` |string |no | `./` |Path to the extension to be packaged and published. Cannot be used together with extensionFile.
|`baseContentUrl` |string |no | - | Prepend all relative links in README.md with this URL.
|`baseImagesUrl` |string |no | - | Prepend all relative image links in README.md with this URL.
|`yarn` |boolean |no | `false` | Use yarn instead of npm while packing extension files.

## Outputs

The action exposes the following outputs:

|Name |Type |Description
|-|-|-
|`vsixPath` |string |The path to the packaged and published VSIX file.

## Contribution

If you found a bug or are missing a feature do not hesitate to [file an issue](https://github.com/HaaLeo/publish-vscode-extension/issues/new/choose).  
Pull Requests are welcome!

## Support

When you like this extension make sure to [star the repo](https://github.com/HaaLeo/publish-vscode-extension/stargazers). I am always looking for new ideas and feedback.  
In addition, it is possible to [donate via paypal](https://www.paypal.me/LeoHanisch/3eur).
