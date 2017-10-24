import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { BuildInContainerizedResolutionSyntax } from '../../src/fluent-syntaxes/buildInContainerizedResolutionSyntax'
import { ResolutionContext } from '../../src/resolutionContext'
import { Container } from '../../src/container'

describe('The [ContainerizedResolutionSyntax]', function () {
  it('should use the container to perform resolutions when is aked to resolve.', function () {
    let containerMock: IMock<Container> = Mock.ofType<Container>()
    containerMock.setup((x: Container) => x.resolve(It.isAny(), It.isAny())).returns(() => '')

    let containerizedResolutionSyntax: BuildInContainerizedResolutionSyntax = new BuildInContainerizedResolutionSyntax(containerMock.object)
    containerizedResolutionSyntax.resolve(null, null)

    containerMock.verify((x: Container) => x.resolve(It.isAny(), It.isAny()), Times.once())
  })

  it('should emit [resolution-performed] event when a resolution is performed.', function () {
    let containerMock: IMock<Container> = Mock.ofType<Container>()
    containerMock.setup((x: Container) => x.resolve(It.isAny(), It.isAny())).returns(() => '')

    let eventWasEmitted = false
    let containerizedResolutionSyntax: BuildInContainerizedResolutionSyntax = new BuildInContainerizedResolutionSyntax(containerMock.object)
    containerizedResolutionSyntax.on('resolution-performed', () => eventWasEmitted = true)
    containerizedResolutionSyntax.resolve(null, null)

    assert.ok(eventWasEmitted, 'The event [resolution-performed] was not emitted.')
  })
})
