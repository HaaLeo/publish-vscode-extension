'use strict';

import * as path from 'path';
import * as fs from 'fs';
import { expect, use } from 'chai';
import { stub, SinonStub } from 'sinon';
import * as chaiAsPromise from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import * as vsce from 'vsce';
import { createPackage } from '../src/createPackage';
use(sinonChai);
use(chaiAsPromise);

describe('createPackage', () => {
    let readFileStub: SinonStub;
    let createVSIXStub: SinonStub;
    before(() => {
        readFileStub = stub(fs.promises, 'readFile').resolves('{"name": "testName","version":"testVersion"}');
        createVSIXStub = stub(vsce, 'createVSIX').resolves();
    });

    beforeEach(() => {
        createVSIXStub.resetHistory();
        readFileStub.resetHistory();
    });

    it('should skip package creation and return path.', async () => {
        const result = await createPackage({
            registryUrl: 'https://marketplace.visualstudio.com',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            extensionFile: 'myExtensionFile',
            packagePath: 'myPackagePath',
            pat: 'myPersonalAccessToken',
            yarn: false
        });

        expect(readFileStub).to.have.been.not.calledOnce;
        expect(result).to.be.equal('myExtensionFile');
    });

    it('should package extension.', async () => {
        const result = await createPackage({
            registryUrl: 'https://marketplace.visualstudio.com',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            extensionFile: undefined,
            packagePath: 'myPackagePath',
            pat: 'myPersonalAccessToken',
            yarn: false
        });

        expect(readFileStub).to.have.been.calledOnce;
        expect(result).to.be.equal(path.normalize('myPackagePath/testName-testVersion.vsix'));
        expect(createVSIXStub).to.have.been.calledOnceWithExactly({
            cwd: 'myPackagePath',
            baseContentUrl: 'myBaseContentUrl',
            baseImagesUrl: 'myBaseImageUrl',
            useYarn: false,
            packagePath: path.normalize('myPackagePath/testName-testVersion.vsix')
        });
    });

    it('should throw if package.json is incomplete.', async () => {
        readFileStub.resolves('{"foo": "testName","bar":"testVersion"}');

        await expect(
            createPackage({
                registryUrl: 'https://marketplace.visualstudio.com',
                baseContentUrl: 'myBaseContentUrl',
                baseImagesUrl: 'myBaseImageUrl',
                extensionFile: undefined,
                packagePath: 'myPackagePath',
                pat: 'myPersonalAccessToken',
                yarn: false
            })
        ).to.be.rejectedWith(Error);
    });
});
