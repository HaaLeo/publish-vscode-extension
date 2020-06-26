'use strict';

import * as core from '@actions/core';
import { PublishOptions as OVSXPublishOptions } from 'ovsx';
import { createPackage } from './createPackage';
import { publish } from './publish';

async function main(): Promise<void> {
    process.on('uncaughtException', _errorHandler);
    process.on('unhandledRejection', _errorHandler);

    const ovsxOptions: OVSXPublishOptions = _getInputs();
    core.debug(`Start action with options="${JSON.stringify(ovsxOptions)}"`);
    if ((!ovsxOptions.packagePath && !ovsxOptions.extensionFile) || (ovsxOptions.packagePath && ovsxOptions.extensionFile)) {
        throw new Error('Please specify either an extension file or a package path, but not both.');
    }

    const vsixPath = await core.group('Package the Extension', () => createPackage(ovsxOptions));
    core.setOutput('vsixPath', vsixPath);

    ovsxOptions.extensionFile = vsixPath;
    await core.group('Publish the Extension', () => publish(ovsxOptions));
}

function _errorHandler(error: Error): void {
    const message = error.stack || error.message || String(error);
    core.setFailed(message);
    process.exit();
}

function _getInputs(): OVSXPublishOptions {
    let registryUrl = core.getInput('registryUrl');

    if (registryUrl.endsWith('/')) {
        registryUrl = registryUrl.substring(0, registryUrl.length - 1);
    }

    return {
        pat: core.getInput('pat', { required: true }),
        registryUrl,
        packagePath: core.getInput('packagePath'), // Different naming convention than vsce's
        yarn: core.getInput('yarn') === 'true',
        // Set default value to undefined for not required inputs without default value
        extensionFile: core.getInput('extensionFile') || undefined,
        baseContentUrl: core.getInput('baseContentUrl') || undefined,
        baseImagesUrl: core.getInput('baseImageUrl') || undefined
    };
}

void main();
