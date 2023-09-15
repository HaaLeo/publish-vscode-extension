'use strict';

import { publish as ovsxPublish, PublishOptions } from 'ovsx';
import { publishVSIX as vscePublishVSIX, IPublishVSIXOptions as VSCEPublishOptions } from '@vscode/vsce';
import { ActionOptions } from './types';

async function publish(ovsxOptions: ActionOptions): Promise<void> {
    if (ovsxOptions.registryUrl === 'https://marketplace.visualstudio.com') {
        const vsceOptions = _convertToVSCEPublishOptions(ovsxOptions);
        await vscePublishVSIX(ovsxOptions.extensionFile, vsceOptions);
    } else {
        let options: PublishOptions;

        if (ovsxOptions.target) {
            const targets = ovsxOptions.target.split(' ');

            options = { ...ovsxOptions, targets, packagePath: [ovsxOptions.packagePath] };
        } else {
            options = { ...ovsxOptions, packagePath: [ovsxOptions.packagePath] };
        }

        const results = await ovsxPublish(options);
        results?.forEach(result => {
            if (result.status === 'rejected') {
                throw result.reason;
            }
        });
    }
}

function _convertToVSCEPublishOptions(options: ActionOptions): VSCEPublishOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, pat, yarn: useYarn, noVerify, dependencies, skipDuplicate, preRelease, target } = { ...options };
    const result = {
        baseContentUrl,
        useYarn,
        pat,
        baseImagesUrl,
        noVerify,
        dependencies,
        skipDuplicate,
        preRelease,
        target
    };
    return result;
}

export { publish };
