'use strict';

import { publish as ovsxPublish, PublishOptions as OVSXPublishOptions } from 'ovsx';
import { publishVSIX as vscePublishVSIX, IPublishOptions as VSCEPublishOptions } from 'vsce';

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
    const { baseContentUrl, baseImagesUrl, pat, yarn: useYarn, packagePath: cwd } = { ...options };
    const result = { baseContentUrl, useYarn, pat, baseImagesUrl, cwd };
    return result;
}

export { publish };
