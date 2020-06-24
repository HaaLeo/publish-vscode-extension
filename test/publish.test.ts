'use strict';

import { expect, use } from 'chai';
import { stub, SinonStub } from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as vsce from 'vsce';

import { publish } from '../src/publish';

use(sinonChai);

describe('publish', () => {
    let publishVSIXStub: SinonStub;
    beforeEach(() => {
        publishVSIXStub = stub(vsce, 'publishVSIX').resolves();
    });

    it('attempt to publish to Visual Studio Marketplace', async () => {
        await publish({
            registryUrl: 'https://marketplace.visualstudio.com',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            extensionFile: 'myExtensionFile',
            packagePath: 'myPackagePath',
            pat: 'myPersonalAccessToken',
            yarn: false
        });
        const expectation: vsce.IPublishVSIXOptions = {
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            pat: 'myPersonalAccessToken',
            useYarn: false
        };
        expect(publishVSIXStub).to.have.been.calledOnceWith('myExtensionFile', expectation);
    });
});
