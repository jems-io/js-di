import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ResolutionContext } from '../../src/resolutionContext'
import { BuilderFunctionServicingStrategy } from '../../src/servicing-strategies/builderFunctionServicingStrategy'
import { Container } from '../../src/container'
import { ServicingError } from '../../src/errors/servicingError'
import { ContainerizedKernel } from '../../src/containerizedKernel'
import { Kernel } from '../../src/kernel'

describe('The [BuilderFunctionServicingStrategy]', function () {
  it('should return the result of the invokation of the given reference target.', function () {
    let resolutionContext: ResolutionContext = new ResolutionContext()

    let builderFunctionServicingStrategy: BuilderFunctionServicingStrategy = new BuilderFunctionServicingStrategy()
    let servicingResult: any = builderFunctionServicingStrategy.serve(resolutionContext, () => 123)

    assert.equal(servicingResult, 123,
                 `The served result is [${servicingResult}] when it should be [123]`)
  })

  it('should return the result of the invokation of the given reference target and resolve its dependencies with the context origin container.', function () {
    let resolutionContext: ResolutionContext = new ResolutionContext()

    let containerSyntaxMock: IMock<ContainerizedKernel> = Mock.ofType<ContainerizedKernel>()
    containerSyntaxMock.setup(x => x.resolveWithContext('argument1', It.isAny())).returns(() => 'moto')

    let kernelMock: IMock<Kernel> = Mock.ofType<Kernel>()
    kernelMock.setup(x => x.usingContainer(It.isAny())).returns(() => containerSyntaxMock.object)

    resolutionContext.kernel = kernelMock.object

    let builderFunctionServicingStrategy: BuilderFunctionServicingStrategy = new BuilderFunctionServicingStrategy()
    let servicingResult: any = builderFunctionServicingStrategy.serve(resolutionContext, (argument1: string) => 'hello ' + argument1)

    assert.equal(servicingResult, 'hello moto',
                 `The served result is [${servicingResult}] when it should be [hello moto]`)

    containerSyntaxMock.verify(x => x.resolveWithContext('argument1', resolutionContext), Times.once())
  })

  it('should throw an error if the given metadata reference target is not argumentable as a function, class or lambda.', function () {
    assert.throws(() => {
      let resolutionContext: ResolutionContext = new ResolutionContext()

      let builderFunctionServicingStrategy: BuilderFunctionServicingStrategy = new BuilderFunctionServicingStrategy()
      let servicingResult: any = builderFunctionServicingStrategy.serve(resolutionContext, {})
    }, ServicingError)
  })

  require('./commonArgumentableServicig.Test')(() => new BuilderFunctionServicingStrategy())
})
