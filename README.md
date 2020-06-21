# open-vsx-github-action

GitHub action to publish your VS Code Extension to the [Open VSX Registry](https://open-vsx.org/)

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: HaaLeo/open-vsx-github-action@v1
with:
  who-to-greet: 'Mona the Octocat'
