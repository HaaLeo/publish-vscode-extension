# Publish VS Code Extension &#8212; GitHub Action

[![Build Status](https://github.com/HaaLeo/publish-open-vsx-github-action/workflows/CI/badge.svg)](https://github.com/HaaLeo/publish-open-vsx-github-action/actions?query=workflow%3ACI) [![Build Status](https://github.com/HaaLeo/publish-open-vsx-github-action/workflows/CD/badge.svg)](https://github.com/HaaLeo/publish-open-vsx-github-action/actions?query=workflow%3ACD) [![Stars](https://img.shields.io/github/stars/HaaLeo/publish-open-vsx-github-action.svg?label=Stars&logo=github&style=flat-square)](https://github.com/HaaLeo/publish-open-vsx-github-action/stargazers) 
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/HaaLeo/publish-open-vsx-github-action/master/LICENSE.txt)  
[![David](https://img.shields.io/david/HaaLeo/publish-open-vsx-github-action.svg?style=flat-square)](https://david-dm.org/HaaLeo/publish-open-vsx-github-action) [![David](https://img.shields.io/david/dev/HaaLeo/publish-open-vsx-github-action.svg?style=flat-square)](https://david-dm.org/HaaLeo/publish-open-vsx-github-action?type=dev)  
[![Donate](https://img.shields.io/badge/☕️-Buy%20Me%20a%20Coffee-blue.svg?&style=flat-square)](https://www.paypal.me/LeoHanisch/3eur)

GitHub action to publish your VS Code Extension to the [Open VSX Registry](https://open-vsx.org/) or the [Visual Studio Marketplace](https://marketplace.visualstudio.com).

**Note**: This GitHub action was not tested extensively yet and is under continuous development. If you encounter any bugs, please open an [issue](https://github.com/HaaLeo/publish-open-vsx-github-action/issues/new/choose).

From [semver.org](https://semver.org/#spec-item-4):
> 4. Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.

## Usage
To use the GitHub Action, you'll need to add it as a step in your [workflow file](https://help.github.com/en/actions/automating-your-workflow-with-github-actions).
Your [extension's namespace](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#2-create-the-namespace) must be created beforehand.
By default, the only thing you need to do is set the `pat` (Personal Access Token) parameter to your [Open VSX access token](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#1-create-an-access-token) or the [Visual Studio Marketplace access token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) respectively.


```yaml
on: push

name: Deploy Extension to Open VSX
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - name: Publish extension to Open VSX
        uses: HaaLeo/publish-vscode-github-action@v0
        with:
          pat: ${{ secrets.OPEN_VSX_TOKEN }}
      - name: Publish extension to Visual Studio Marketplace
        uses: HaaLeo/publish-vscode-github-action@v0
        with:
          pat: ${{ secrets.OPEN_VSX_TOKEN }}
          registryUrl: https://marketplace.visualstudio.com
```



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
|-|-|-|-|-
|`vsixPath` |string |The path to the packaged and published VSIX file.

## Contribution

If you found a bug or are missing a feature do not hesitate to [file an issue](https://github.com/HaaLeo/publish-open-vsx-github-action/issues/new/choose).  
Pull Requests are welcome!

## Support
When you like this extension make sure to [star the repo](https://github.com/HaaLeo/publish-open-vsx-github-action/stargazers). I am always looking for new ideas and feedback.  
In addition, it is possible to [donate via paypal](https://www.paypal.me/LeoHanisch/3eur).
