import * as core from '@actions/core';
import { publish, PublishOptions as OVSXPublishOptions } from 'ovsx';
import { publish as vscePublish, publishVSIX as vscePublishVSIX, IPublishOptions as VSCEPublishOptions} from 'vsce';

async function main(): Promise<void> {
    process.on("uncaughtException", _errorHandler);
    process.on("unhandledRejection", _errorHandler);

    const ovsxOptions: OVSXPublishOptions = _getInputs();

    if ((!ovsxOptions.packagePath && !ovsxOptions.extensionFile)|| (ovsxOptions.packagePath && ovsxOptions.extensionFile)) {
        throw new Error('Please specify either an extension file or a package path, but not both.');
    }

    if (ovsxOptions.registryUrl === 'https://marketplace.visualstudio.com') {
        const vsceOptions = _convertToVSCEPublishOptions(ovsxOptions);
        if (ovsxOptions.extensionFile){
            await vscePublishVSIX(ovsxOptions.extensionFile, vsceOptions);
        } else {
            await vscePublish(vsceOptions);
        }
    } else {
        await publish(ovsxOptions)
    }
}

function _errorHandler(error: Error): void {
    const message = error.stack || error.message || String(error);
    core.setFailed(message);
    process.exit();
}

function _getInputs(): OVSXPublishOptions {
    let registryUrl = core.getInput('registryUrl')

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
    }
}

function _convertToVSCEPublishOptions(options: OVSXPublishOptions): VSCEPublishOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, pat, yarn:useYarn,  packagePath:cwd } = { ...options };
    const result = { baseContentUrl, useYarn, pat, baseImagesUrl, cwd };
    return result;
}

main();
