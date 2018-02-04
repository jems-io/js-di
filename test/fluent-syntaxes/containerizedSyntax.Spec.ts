import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { BuildInContainerizedKernel } from '../../src/buildInContainerizedKernel'
import { ResolutionContext } from '../../src/resolutionContext'
import { Container } from '../../src/container'

describe('The [ContainerizedKernel]', function () {
  it('should use the container to perform resolutions when is aked to resolve.', function () {
    let containerMock: IMock<Container> = Mock.ofType<Container>()
    containerMock.setup((x: Container) => x.resolve(It.isAny(), It.isAny())).returns(() => '')

    let containerizedKernel: BuildInContainerizedKernel = new BuildInContainerizedKernel(containerMock.object)
    containerizedKernel.resolve(null, null)

    containerMock.verify((x: Container) => x.resolve(It.isAny(), It.isAny()), Times.once())
  })
})
