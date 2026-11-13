'use strict';

import { ActionOptions } from './types';

/**
 * Checks that the options name exactly one way to authenticate, and that a trusted publishing
 * job can request an OIDC token, so a misconfigured workflow fails before packaging.
 */
function validateCredentials(options: ActionOptions, env: NodeJS.ProcessEnv = process.env): void {
    if (options.dryRun) {
        return;
    }

    if (options.trustedPublishing) {
        if (options.pat) {
            throw new Error('Set either "pat" or "trustedPublishing", not both.');
        }
        if (!env.ACTIONS_ID_TOKEN_REQUEST_URL || !env.ACTIONS_ID_TOKEN_REQUEST_TOKEN) {
            throw new Error('"trustedPublishing" needs an OIDC token, but this job cannot request one. Add "permissions: id-token: write" to the job.');
        }
    } else if (!options.pat) {
        throw new Error('Set "pat" to a personal access token, or set "trustedPublishing" to "true".');
    }
}

export { validateCredentials };
