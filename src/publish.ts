'use strict';

import { publishVSIX as vscePublishVSIX, IPublishVSIXOptions as VSCEPublishOptions } from '@vscode/vsce';
import { PublishOptions } from 'ovsx';

import { ActionOptions } from './types';
import { ovsxPublish } from './ovsx';

async function publish(ovsxOptions: ActionOptions): Promise<void> {
    if (ovsxOptions.registryUrl === 'https://marketplace.visualstudio.com') {
        const vsceOptions = _convertToVSCEPublishOptions(ovsxOptions);
        await vscePublishVSIX(ovsxOptions.extensionFile, vsceOptions);
    } else {
        let options: PublishOptions;

        // Set explicitly: ovsx would otherwise use trusted publishing whenever it can get an OIDC token.
        const trustedPublishing = Boolean(ovsxOptions.trustedPublishing);

        if (ovsxOptions.target) {
            const targets = ovsxOptions.target.split(' ');

            options = { ...ovsxOptions, trustedPublishing, targets, packagePath: [ovsxOptions.packagePath] };
        } else {
            options = { ...ovsxOptions, trustedPublishing, packagePath: [ovsxOptions.packagePath] };
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
    const { baseContentUrl, baseImagesUrl, pat, trustedPublishing, yarn: useYarn, noVerify, dependencies, skipDuplicate, preRelease, target } = { ...options };
    const result: VSCEPublishOptions = {
        baseContentUrl,
        useYarn,
        ...(trustedPublishing ? { oidc: true } : { pat }),
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
