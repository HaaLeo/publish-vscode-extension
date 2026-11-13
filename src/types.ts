export interface ActionOptions {
    /**
    * The base URL of the registry API.
    */
    registryUrl?: string;
    /**
     * Personal access token. Cannot be used together with `trustedPublishing`.
     */
    pat?: string;
    /**
     * Publish without a personal access token, by exchanging the job's GitHub Actions OIDC token
     * for a short-lived registry credential. The registry must list the repository and workflow
     * as a trusted publisher, and the job needs the `id-token: write` permission.
     */
    trustedPublishing?: boolean;
    /**
     * Path to the vsix file to be published. Cannot be used together with `packagePath`.
     */
    extensionFile?: string;
    /**
     * Path to the extension to be packaged and published. Cannot be used together
     * with `extensionFile`.
     */
    packagePath?: string;
    /**
     * The base URL for links detected in Markdown files. Only valid with `packagePath`.
     */
    baseContentUrl?: string;
    /**
     * The base URL for images detected in Markdown files. Only valid with `packagePath`.
     */
    baseImagesUrl?: string;
    /**
     * Should use `yarn` instead of `npm`. Only valid with `packagePath`.
     */
    yarn?: boolean;
    dryRun?: boolean;
    /**
     * Use this flag to enable publishing extensions which use a proposed extension API.
     */
    noVerify?: boolean;
    /**
     * Mark this package as a pre-release, vsce argument `--pre-release`
     */
    preRelease?: boolean;
    /**
     * This is the inverse of the `--no-dependencies` flag in vsce. When false, vsce will
     * not check for the existence of dependencies defined in package.json in node_modules.
     * Set this to false if using pnpm or yarn v2+ with PnP enabled.
     */
    dependencies?: boolean;

    /**
     * Don't throw an error when the package version is already present in the registry
     */
    skipDuplicate?: boolean;

    /**
     * Target architecture(s) the extension should run on.
     * This string needs to be formatted like 'arch1 arch2 arch3' when targeting multiple architectures.
     *
     * See the following for the possible target values:
     *
     * https://code.visualstudio.com/api/working-with-extensions/publishing-extension#platformspecific-extensions
     */
    target?: string;
}

export interface PackageJSON {
    name: string;
    version: string;
    author: {
        name: string;
        url?: string;
    } | string;
}
