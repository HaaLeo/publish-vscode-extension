'use strict';

import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';

import { PublishOptions as OVSXPublishOptions } from 'ovsx';
import { createVSIX, ICreateVSIXOptions } from 'vsce';

async function createPackage(ovsxOptions: OVSXPublishOptions): Promise<string> {
    let vsixPath: string;

    if (ovsxOptions.extensionFile) {
        vsixPath = ovsxOptions.extensionFile;
        core.info('The extension was already packaged. Skip packaging.');
    }
    else {
        vsixPath = await _getOutputPath(ovsxOptions.packagePath);
        const options = _convertToVSCECreateVSIXOptions(ovsxOptions, vsixPath);
        core.info('Start packaging the extension.');
        await createVSIX(options);
    }

    return vsixPath;
}

function _convertToVSCECreateVSIXOptions(options: OVSXPublishOptions, targetVSIXPath: string): ICreateVSIXOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, yarn: useYarn, packagePath: cwd } = { ...options };
    const result = { baseContentUrl, useYarn, baseImagesUrl, cwd, packagePath: targetVSIXPath };
    return result;
}

async function _getOutputPath(packagePath: string): Promise<string> {
    const rawJson = await fs.promises.readFile(path.join(packagePath, 'package.json'), 'utf8');
    const json = JSON.parse(rawJson) as { name: string; version: string };
    if (!json.name || !json.version) {
        throw new Error('The extension\'s package.json must contain a "name" and "version" field.');
    }

    return path.join(packagePath, `${json.name}-${json.version}.vsix`);
}
export { createPackage };
