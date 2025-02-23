import { expect, use } from 'chai';
import { stub, SinonStub } from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as vsce from '@vscode/vsce';
import * as ovsx from '../src/ovsx';

import { publish } from '../src/publish';

use(sinonChai);

describe('publish', () => {
    let publishVSIXStub: SinonStub;
    let publishOpenVSXStub: SinonStub;

    before(() => {
        publishVSIXStub = stub(vsce, 'publishVSIX').resolves();
        publishOpenVSXStub = stub(ovsx, 'ovsxPublish').resolves();
    });

    beforeEach(() => {
        publishOpenVSXStub.resetHistory();
        publishVSIXStub.resetHistory();
    });

    it('should attempt to publish to Visual Studio Marketplace', async () => {
        await publish({
            registryUrl: 'https://marketplace.visualstudio.com',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            extensionFile: 'myExtensionFile',
            packagePath: 'myPackagePath',
            pat: 'myPersonalAccessToken',
            yarn: false,
            noVerify: true,
            dependencies: true,
            skipDuplicate: false,
            preRelease: false,
            target: 'win32-x64 linux-x64'
        });

        expect(publishVSIXStub).to.have.been.calledOnceWithExactly('myExtensionFile', {
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            pat: 'myPersonalAccessToken',
            useYarn: false,
            noVerify: true,
            dependencies: true,
            skipDuplicate: false,
            preRelease: false,
            target: 'win32-x64 linux-x64'
        });
    });

    it('should attempt to publish to Open VSX registry', async () => {
        await publish({
            registryUrl: 'https://open-vsx.org',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            extensionFile: 'myExtensionFile',
            packagePath: 'myPackagePath',
            pat: 'myPersonalAccessToken',
            yarn: false,
            target: 'win32-x64 linux-x64'
        });

        expect(publishOpenVSXStub).to.have.been.calledOnceWithExactly({
            registryUrl: 'https://open-vsx.org',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            extensionFile: 'myExtensionFile',
            packagePath: ['myPackagePath'],
            pat: 'myPersonalAccessToken',
            yarn: false,
            targets: ['win32-x64', 'linux-x64'],
            target: 'win32-x64 linux-x64'
        });
    });

    it('should throw if publishing to Open VSX registry has failed', async () => {
        const failReason = 'some reason.';
        const failedPromise = await Promise.allSettled([Promise.resolve(0), Promise.reject(new Error(failReason))]);
        publishOpenVSXStub.resolves(failedPromise);

        await expect(
            publish({
                registryUrl: 'https://open-vsx.org',
                baseContentUrl: 'myBaseContentUrl',
                baseImagesUrl: 'myBaseImageUrl',
                extensionFile: 'myExtensionFile',
                packagePath: 'myPackagePath',
                pat: 'myPersonalAccessToken',
                yarn: false
            })
        ).to.be.rejectedWith(failReason);
    });

    it('should not throw if publishing to Open VSX registry has not failed', async () => {
        const resolvedPromise = await Promise.allSettled([Promise.resolve(0), Promise.resolve(0)]);
        publishOpenVSXStub.resolves(resolvedPromise);

        await expect(
            publish({
                registryUrl: 'https://open-vsx.org',
                baseContentUrl: 'myBaseContentUrl',
                baseImagesUrl: 'myBaseImageUrl',
                extensionFile: 'myExtensionFile',
                packagePath: 'myPackagePath',
                pat: 'myPersonalAccessToken',
                yarn: false
            })
        ).not.to.be.rejectedWith();
    });
});
