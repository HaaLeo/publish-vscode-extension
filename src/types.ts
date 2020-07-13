import { PublishOptions as OVSXPublishOptions } from 'ovsx';

export interface ActionOptions extends OVSXPublishOptions {
    dryRun: boolean;
}

export interface PackageJSON {
    name: string;
    version: string;
    author: {
        name: string;
        url?: string;
    } | string;
}

export { OVSXPublishOptions };
