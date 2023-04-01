'use strict';

import * as core from '@actions/core';

import * as packageJSON from '../package.json';
import { createPackage } from './createPackage';
import { publish } from './publish';
import { ActionOptions, PackageJSON } from './types';

export async function main(): Promise<void> {
    process.on('uncaughtException', _errorHandler);
    process.on('unhandledRejection', _errorHandler);

    const actionInfo = packageJSON as PackageJSON;
    core.info(`Specifically, running GitHub Action ${typeof actionInfo.author === 'string' ? actionInfo.author : actionInfo.author.name}/${actionInfo.name}@v${actionInfo.version}.`);

    const options = _getInputs();
    core.debug(`Start action with options="${JSON.stringify(options)}".`);

    const vsixPath = await core.group('Package the Extension', () => createPackage(options));
    core.setOutput('vsixPath', vsixPath);

    if (options.dryRun) {
        core.info('"dryRun" option is set. Skip publishing.');
    } else {
        options.extensionFile = vsixPath;
        await core.group('Publish the Extension', () => publish(options));
    }
}

function _errorHandler(error: Error): void {
    const message = error.stack || error.message || String(error);
    core.setFailed(message);
    process.exit();
}

function _getInputs(): ActionOptions {
    let registryUrl = core.getInput('registryUrl');

    if (registryUrl.endsWith('/')) {
        registryUrl = registryUrl.substring(0, registryUrl.length - 1);
    }

    return {
        pat: core.getInput('pat', { required: true }),
        registryUrl,
        packagePath: core.getInput('packagePath'), // Different naming convention than vsce's
        yarn: core.getInput('yarn') === 'true',
        dryRun: core.getInput('dryRun') === 'true',
        // Set default value to undefined for not required inputs without default value
        extensionFile: core.getInput('extensionFile') || undefined,
        baseContentUrl: core.getInput('baseContentUrl') || undefined,
        baseImagesUrl: core.getInput('baseImageUrl') || undefined,
        noVerify: core.getInput('noVerify') === 'true',
        preRelease: core.getInput('preRelease') === 'true',
        dependencies: core.getInput('dependencies') !== 'false',
    };
}
