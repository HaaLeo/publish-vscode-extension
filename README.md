# Publish VS Code Extension &#8212; GitHub Action

[![Build, Lint, Test and Deploy](https://img.shields.io/github/workflow/status/HaaLeo/publish-vscode-extension/CI?style=flat-square&label=Lint%2C%20Build%2C%20Test%20and%20Deploy)](https://github.com/HaaLeo/publish-vscode-extension/actions?query=workflow%3A%22Build%2C+Lint%2C+Test+and+Deploy%22) [![Coverage Status](https://img.shields.io/coveralls/github/HaaLeo/publish-vscode-extension?style=flat-square)](https://coveralls.io/github/HaaLeo/publish-vscode-extension)  
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/HaaLeo/publish-vscode-extension/master/LICENSE.txt) [![Stars](https://img.shields.io/github/stars/HaaLeo/publish-vscode-extension.svg?label=Stars&logo=github&style=flat-square)](https://github.com/HaaLeo/publish-vscode-extension/stargazers)  
[![David](https://img.shields.io/david/HaaLeo/publish-vscode-extension.svg?style=flat-square)](https://david-dm.org/HaaLeo/publish-vscode-extension) [![David](https://img.shields.io/david/dev/HaaLeo/publish-vscode-extension.svg?style=flat-square)](https://david-dm.org/HaaLeo/publish-vscode-extension?type=dev)  
[![Donate](https://img.shields.io/badge/☕️-Buy%20Me%20a%20Coffee-blue.svg?&style=flat-square)](https://www.paypal.me/LeoHanisch/3eur)

GitHub action to publish your VS Code Extension to the [Open VSX Registry](https://open-vsx.org/) or the [Visual Studio Marketplace](https://marketplace.visualstudio.com).

## Usage

To use the GitHub Action, just [reference the action](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow#referencing-actions-in-your-workflow) in your workflow file.

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
          pat: ${{ secrets.VS_MARKETPLACE_TOKEN }}
          registryUrl: https://marketplace.visualstudio.com
```

To package the extension only once and publish the **identical** `.vsix` file to both registries one can use the following two steps instead:

```yaml
- name: Publish to Open VSX Registry
  uses: HaaLeo/publish-vscode-extension@v0
  id: publishToOpenVSX
  with:
    pat: ${{ secrets.OPEN_VSX_TOKEN }}
- name: Publish to Visual Studio Marketplace
  uses: HaaLeo/publish-vscode-extension@v0
  with:
    pat: ${{ secrets.VS_MARKETPLACE_TOKEN }}
    registryUrl: https://marketplace.visualstudio.com
    extensionFile: ${{ steps.publishToOpenVSX.outputs.vsixPath }}
    packagePath: ''
```

### Open VSX Registry

To publish to the Open VSX Registry ensure that your [extension's namespace](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#2-create-the-namespace) was created **beforehand**.
You need to set the `pat` parameter to your [Open VSX access token](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#1-create-an-access-token).
Further, you should ensure that you only publish an extension which is licensed.
For more information regarding Open VSX' timeline and its extensions' licensing check out [Brian King's blog](https://blogs.eclipse.org/post/brian-king/open-vsx-registry-under-new-management) (section "Licensing" and "Timeline").

Currently, this GitHub action allows you to publish extensions which do not state their license terms.
However, this behavior is deprecated and a future release of this action will reject unlicensed extensions.
Therefore, I heavily encourage you to publish an extension with a (permissive) license such as the [MIT license](https://choosealicense.com/licenses/mit/).

### Visual Studio Marketplace

In order to upload your extension to the VS Marketplace you need to set the `pat` option to the corresponding [access token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token). 
Further, the `registryUrl` must be set to `https://marketplace.visualstudio.com`.


## Input Parameters

You can set any or all of the following input parameters:

|Name |Type |Required? |Default |Description
|-|-|-|-|-
|`pat` |string  |yes |-|The personal access token to the corresponding registry.
|`extensionFile` |string  |no | - |Path to the vsix file to be published. Cannot be used together with packagePath.
|`registryUrl` |string  |no |`https://open-vsx.org` |Use the registry API at this base URL
|`packagePath` |string |no | `./` |Path to the extension to be packaged and published. Cannot be used together with extensionFile.
|`baseContentUrl` |string |no | - | Prepend all relative links in README.md with this URL.
|`baseImagesUrl` |string |no | - | Prepend all relative image links in README.md with this URL.
|`yarn` |boolean |no | `false` | Use yarn instead of npm while packing extension files.
|`dryRun` |boolean |no | `false` | Set this option to `true` to package your extension but do not publish it.

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
