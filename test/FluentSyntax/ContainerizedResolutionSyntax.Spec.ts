/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ContainerizedResolutionSyntax } from "../../source/FluentSyntax/ContainerizedResolutionSyntax"
import { ResolutionContext } from "../../source/ResolutionContext";
import { IContainer } from "../../source/IContainer";

describe('The [ContainerizedResolutionSyntax]', function() {
    it('should use the container to perform resolutions when is aked to resolve.', function() {
        let containerMock:IMock<IContainer> = Mock.ofType<IContainer>();
        containerMock.setup((x:IContainer) => x.resolve(It.isAny(), It.isAny())).returns(() => {})

        let containerizedResolutionSyntax:ContainerizedResolutionSyntax = new ContainerizedResolutionSyntax(containerMock.object);
        containerizedResolutionSyntax.resolve(null, null);

        containerMock.verify((x:IContainer) => x.resolve(It.isAny(), It.isAny()), Times.once());
    })

    it('should emit [resolution-performed] event when a resolution is performed.', function() {
        let containerMock:IMock<IContainer> = Mock.ofType<IContainer>();
        containerMock.setup((x:IContainer) => x.resolve(It.isAny(), It.isAny())).returns(() => {})

        let eventWasEmitted = false;
        let containerizedResolutionSyntax:ContainerizedResolutionSyntax = new ContainerizedResolutionSyntax(containerMock.object);
        containerizedResolutionSyntax.on('resolution-performed', () => eventWasEmitted = true);
        containerizedResolutionSyntax.resolve(null, null);

        assert.ok(eventWasEmitted, 'The event [resolution-performed] was not emitted.')
    })
});