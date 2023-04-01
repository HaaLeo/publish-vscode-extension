'use strict';

import { publish as ovsxPublish, PublishOptions } from 'ovsx';
import { publishVSIX as vscePublishVSIX, IPublishVSIXOptions as VSCEPublishOptions } from '@vscode/vsce';
import { ActionOptions } from './types';

async function publish(ovsxOptions: ActionOptions): Promise<void> {
    if (ovsxOptions.registryUrl === 'https://marketplace.visualstudio.com') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const vsceOptions = _convertToVSCEPublishOptions(ovsxOptions);
        await vscePublishVSIX(ovsxOptions.extensionFile, vsceOptions);
    } else {
        const options: PublishOptions = { ...ovsxOptions, packagePath: [ovsxOptions.packagePath] };
        await ovsxPublish(options);
    }
}

function _convertToVSCEPublishOptions(options: ActionOptions): VSCEPublishOptions {
    // Shallow copy of options
    const { baseContentUrl, baseImagesUrl, pat, yarn: useYarn, noVerify, dependencies } = { ...options };
    const result = {
        baseContentUrl,
        useYarn,
        pat,
        baseImagesUrl,
        noVerify,
        dependencies,
    };
    return result;
}

export { publish };
