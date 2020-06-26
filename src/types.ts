import { PublishOptions as OVSXPublishOptions } from 'ovsx';

export interface ActionOptions extends OVSXPublishOptions {
    dryRun: boolean;
}

export { OVSXPublishOptions };
