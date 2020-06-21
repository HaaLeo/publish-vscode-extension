import * as core from '@actions/core';
import { publish, PublishOptions } from 'ovsx';

async function main(): Promise<void> {
    process.on("uncaughtException", _errorHandler);
    process.on("unhandledRejection", _errorHandler);

    const inputs: PublishOptions = _getInputs();

    await publish(inputs)

}

function _errorHandler(error: Error): void {
    const message = error.stack || error.message || String(error);
    core.setFailed(message);
    process.exit();
}

function _getInputs(): PublishOptions {
    return {
        pat: core.getInput('pat', { required: true }),
        registryUrl: core.getInput('registryUrl'),
        packagePath: core.getInput('packagePath'),
        yarn: core.getInput('yarn') === 'true',
        // Set default value to undefined for not required inputs without default value
        extensionFile: core.getInput('extensionFile') || undefined,
        baseContentUrl: core.getInput('baseContentUrl') || undefined,
        baseImagesUrl: core.getInput('baseImageUrl') || undefined
    }
}

main();
