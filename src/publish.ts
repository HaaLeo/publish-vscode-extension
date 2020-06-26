'use strict';

import { publish as ovsxPublish } from 'ovsx';
import { publishVSIX as vscePublishVSIX, IPublishVSIXOptions as VSCEPublishOptions } from 'vsce';
import { OVSXPublishOptions } from './types';

async function publish(ovsxOptions: OVSXPublishOptions): Promise<void> {
    if (ovsxOptions.registryUrl === 'https://marketplace.visualstudio.com') {
        const vsceOptions = _convertToVSCEPublishOptions(ovsxOptions);
        await vscePublishVSIX(ovsxOptions.extensionFile, vsceOptions);
    } else {
        await ovsxPublish(ovsxOptions);
    }
}

function _convertToVSCEPublishOptions(options: OVSXPublishOptions): VSCEPublishOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, pat, yarn: useYarn } = { ...options };
    const result = { baseContentUrl, useYarn, pat, baseImagesUrl };
    return result;
}

export { publish };
