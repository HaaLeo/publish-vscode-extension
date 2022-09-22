'use strict';

import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';

import { createVSIX, IPackageOptions } from 'vsce';
import { ActionOptions } from './types';

async function createPackage(ovsxOptions: ActionOptions): Promise<string> {
    let vsixPath: string;

    if (ovsxOptions.extensionFile) {
        vsixPath = ovsxOptions.extensionFile;
        core.info('The extension was already packaged. Skip packaging.');
    }
    else if (ovsxOptions.packagePath) {
        const packageName = await _getPackageName(ovsxOptions.packagePath);
        vsixPath = path.join(ovsxOptions.packagePath, packageName);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const options = _convertToVSCECreateVSIXOptions(ovsxOptions, vsixPath);
        core.info('Start packaging the extension.');
        await createVSIX(options);
    } else {
        throw new Error('Either option "packagePath" or "extensionFile" must be set.');
    }

    return vsixPath;
}

function _convertToVSCECreateVSIXOptions(options: ActionOptions, targetVSIXPath: string): IPackageOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, yarn: useYarn, packagePath: cwd, preRelease } = { ...options };
    const result: IPackageOptions = { baseContentUrl, useYarn, baseImagesUrl, cwd, packagePath: targetVSIXPath, preRelease };
    return result;
}

async function _getPackageName(packagePath: string): Promise<string> {
    const rawJson = await fs.promises.readFile(path.join(packagePath, 'package.json'), 'utf8');
    const json = JSON.parse(rawJson) as { name: string; version: string };
    if (!json.name || !json.version) {
        throw new Error('The extension\'s package.json must contain a "name" and "version" field.');
    }

    return `${json.name}-${json.version}.vsix`;
}
export { createPackage };
