# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). 

## Unreleased

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.6...master)

## [v1.0.6](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.6) 2022-07-23

### Security
* Updated dependencies to 
    * `vsce@2.10.0`

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.5...v1.0.6)

## [v1.0.5](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.5) 2022-07-15

### Security
* Updated dependencies to 
    * `vsce@2.9.3`

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.4...v1.0.5)

## [v1.0.4](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.4) 2022-06-22

### Security
* Updated dependencies to 
    * `vsce@2.9.2`

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.3...v1.0.4)

## [v1.0.3](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.3) 2022-06-19

### Security
* Updated dependencies to 
    * `ovsx@0.5.1`
    * `vsce@2.9.1`

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.2...v1.0.3)

## [v1.0.2](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.2) 2022-04-11

### Security
* Updated dependencies

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.1...v1.0.2)

## [v1.0.1](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.1) 2022-03-20

### Security
* Updated dependencies

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v1.0.0...v1.0.1)

## [v1.0.0](https://github.com/HaaLeo/publish-vscode-extension/tree/v1.0.0) 2021-12-17

### BREAKING CHANGES

* Now requires minimum NodeJs version v16
* Options `packagePath` and `extensionFile` are no longer mutually exclusive. If both options are set `extensionFile` is preferred and the extension won't be packaged.

### Added
* Adds `--pre-release` functionality for `vsce`. Issue [#16](https://github.com/HaaLeo/publish-vscode-extension/issues/16). Contributed by [@gnikit](https://github.com/gnikit).

### Security
* Updated dependencies

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.4.2...v1.0.0)

## [v0.4.2](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.4.2) 2021-06-26

### Fixed
* Issue [#13](https://github.com/HaaLeo/publish-vscode-extension/issues/13). Update vsce to v1.95.0 to fix [microsoft/vscode-vsce#576](https://github.com/microsoft/vscode-vsce/issues/576).

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.4.1...v0.4.2)

## [v0.4.1](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.4.1) 2021-06-24

### Security
* Updated dependencies

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.4.0...v0.4.1)

## [v0.4.0](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.4.0) 2021-05-12

## Added
* support for vsce's `--noVerify` option to enable publishing of extensions to the visual studio marketplace which use a proposed API [#8](https://github.com/HaaLeo/publish-vscode-extension/issues/8). Implemented by [@AnWeber](https://github.com/AnWeber).

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.3.1...v0.4.0)

## [v0.3.1](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.3.1) 2020-12-16

## Fixed
* a bug that caused to log the wrong version of the action

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.3.0...v0.3.1)

## [v0.3.0](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.3.0) 2020-12-16

## Deprecated
* to publish extensions without a license to the Open VSX registry

### Security
* Updated dependencies
    * ovsx [`0.1.0-next.b868597`](https://www.npmjs.com/package/ovsx/v/0.1.0-next.b868597)
    * vsce [`1.81.1`](https://www.npmjs.com/package/vsce/v/1.81.1)

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.2.4...v0.3.0)

## [v0.2.4](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.2.4) 2020-10-02

### Security
* Fixed `@actions/core` vulnerability.
* Updated dependencies

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.2.3...v0.2.4)

## [v0.2.3](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.2.3) 2020-07-20

### Security
* Fixed `lodash` vulnerability.
* Updated dependencies

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.2.2...v0.2.3)

## [v0.2.2](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.2.2) 2020-07-14

### Fixed
* Log the correct version. 

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.2.1...v0.2.2)

## [v0.2.1](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.2.1) 2020-07-14

### Added
* Logging of the action's specific version for better debugging. 

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.2.0...v0.2.1)

## [v0.2.0](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.2.0) 2020-06-26

### Added
* `dryRun` option to only package the extension but not publish it.

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.1.3...v0.2.0)

## [v0.1.3](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.1.3) 2020-06-26

### Fixed
* Now the `dist/index.js` contains the actual fixes of release `v0.1.2`.

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.1.2...v0.1.3)

## [v0.1.2](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.1.2) 2020-06-26

### Fixed
* The outputs `vsixPath` is now set correctly.

### Added 
* Unit Tests
* Code Coverage
* Another usage example

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.1.1...v0.1.2)

## [v0.1.1](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.1.1) 2020-06-22

### Fixed
* The usage sample in the README.
* The parameter description in the README.

[All Changes](https://github.com/HaaLeo/publish-vscode-extension/compare/v0.1.0...v0.1.1)

## [v0.1.0](https://github.com/HaaLeo/publish-vscode-extension/tree/v0.1.0) 2020-06-22

Initial release 🎉
