import { expect } from 'chai';

import { validateCredentials } from '../src/credentials';

describe('validateCredentials', () => {
    const oidcEnv = {
        ACTIONS_ID_TOKEN_REQUEST_URL: 'https://token.actions.example',
        ACTIONS_ID_TOKEN_REQUEST_TOKEN: 'requestToken'
    };

    it('should accept a personal access token', () => {
        expect(() => validateCredentials({ pat: 'myPersonalAccessToken' }, {})).not.to.throw();
    });

    it('should accept trusted publishing when the job can request an OIDC token', () => {
        expect(() => validateCredentials({ trustedPublishing: true }, oidcEnv)).not.to.throw();
    });

    it('should throw when neither a token nor trusted publishing is set', () => {
        expect(() => validateCredentials({}, oidcEnv)).to.throw('Set "pat" to a personal access token, or set "trustedPublishing" to "true".');
    });

    it('should throw when both a token and trusted publishing are set', () => {
        expect(() => validateCredentials({ pat: 'myPersonalAccessToken', trustedPublishing: true }, oidcEnv))
            .to.throw('Set either "pat" or "trustedPublishing", not both.');
    });

    it('should throw when trusted publishing is set but the job lacks id-token: write', () => {
        expect(() => validateCredentials({ trustedPublishing: true }, {})).to.throw('Add "permissions: id-token: write" to the job.');
    });

    it('should not require credentials for a dry run', () => {
        expect(() => validateCredentials({ dryRun: true }, {})).not.to.throw();
    });
});
