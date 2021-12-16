# How To Contribute

First of all, thank you for considering to contribute! :pray::tada:

The following is a set of guidelines for contributing to the [`publish-vscode-extension`](https://github.com/HaaLeo/publish-vscode-extension#readme). These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents
[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Code Contribution](#code-contribution)
  * [Pull Requests](#pull-requests)
  * [Documentation](#documentation)

## How Can I Contribute?

### Reporting Bugs

To report a :bug: please file an issue using the [bug template](https://github.com/HaaLeo/publish-vscode-extension/issues/new?template=bug_report.md).
Please fill out the template tediously and provide information as detailed as possible.
Include screenshots or GIFs to visualize the problem.

### Suggesting Enhancements

To suggest an enhancement please file an issue using the [feature request template](https://github.com/HaaLeo/publish-vscode-extension/issues/new?template=feature_request.md).
Please fill out the template tediously and provide information as detailed as possible. 
The template will ask you for all relevant information.

### Code Contribution

Before starting to code please ensure you explicitly address an [issue](https://github.com/HaaLeo/publish-vscode-extension/issues) and comment on that issue indicating that you are working on it.

It would be a shame to reject a PR with your awesome work just because somebody else was faster or due to the lack of an issue.

#### Setup

First you need to fork the repo, clone it and install all dependencies.

```zsh
# Clone the repository
git clone git@github.com:yourUserName/publish-vscode-extension.git
cd publish-vscode-extension

# Install the dependencies
npm i

# Open the project with VS Code
code .
```

When you open the project the first time with VS Code the editor will ask you to install all recommended workspace extensions.
Confirm that dialog and you are all set up.

The repo is setup to work out of the box.
To start debugging just navigate in VS Code to the debug view and start the debug configuration of your choice.

If you are new to VS Code and typescript check out the [official documentation](https://code.visualstudio.com/docs/typescript/typescript-tutorial) to get started.

#### Notes

1. When you made changes please also always commit the files in `dist/` directory.
1. When you introduce new parameters do not forget to extend the [`action.yml`](./action.yml) file.

### Pull Requests

Please follow these steps to have your contribution considered:

1. Reference the issue you are working on e.g.: `Fixes #1`
1. Add information on how you solved the issue.
1. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing.

After your pull request was submitted and the status checks pass I will review your changes.
I may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

### Documentation

publish-vscode-extension organizes its documentation in its [README](https://github.com/HaaLeo/publish-vscode-extension#readme) file.
When contributing new features please extend the README as well as the [CHANGELOG](./CHANGELOG.md) correspondingly.
Please ensure you opened an issue beforehand which provides an explanation of the changes you want to propose to the wiki.
After that you can fork the wiki and [submit a pull request](#pull-requests) to address that issue.
