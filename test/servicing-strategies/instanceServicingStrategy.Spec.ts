import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ResolutionContext } from '../../src/resolutionContext'
import { InstanceServicingStrategy } from '../../src/servicing-strategies/instanceServicingStrategy'
import { Container } from '../../src/container'
import { ServicingError } from '../../src/errors/servicingError'

describe('The [InstanceServicingStrategy]', function () {
  it('should return an instance of the given reference target.', function () {
    class IntatiableFunction {}

    let resolutionContext: ResolutionContext = new ResolutionContext()

    let instanceServicingStrategy: InstanceServicingStrategy = new InstanceServicingStrategy()
    let servicingResult: any = instanceServicingStrategy.serve(resolutionContext, IntatiableFunction)

    assert.ok(servicingResult instanceof IntatiableFunction,
                 `The served instance is [${typeof servicingResult}] when it should be [${typeof IntatiableFunction}]`)
  })

  it('should return an instance of the given reference target and resolve its dependencies with the context origin container.', function () {
    class IntatiableFunctionWithArgument { props: number; constructor (argument1: string) { this.props = 1 } }

    let resolutionContext: ResolutionContext = new ResolutionContext()
    let containerMock: IMock<Container> = Mock.ofType<Container>()
    containerMock.setup(x => x.resolve('argument1', It.isAny())).returns(() => '')
    resolutionContext.originContainer = containerMock.object

    let instanceServicingStrategy: InstanceServicingStrategy = new InstanceServicingStrategy()
    let servicingResult: any = instanceServicingStrategy.serve(resolutionContext, IntatiableFunctionWithArgument)

    assert.ok(servicingResult instanceof IntatiableFunctionWithArgument,
                 `The served instance is [${typeof servicingResult}] when it should be [${typeof IntatiableFunctionWithArgument}]`)

    containerMock.verify(x => x.resolve('argument1', It.isAny()), Times.once())
  })

  it('should throw an error if the given metadata reference target is not argumentable as a function, class or lambda.', function () {
    assert.throws(() => {
      let resolutionContext: ResolutionContext = new ResolutionContext()

      let instanceServicingStrategy: InstanceServicingStrategy = new InstanceServicingStrategy()
      let servicingResult: any = instanceServicingStrategy.serve(resolutionContext, {})
    }, ServicingError)
  })

  require('./commonArgumentableServicig.Test')(() => new InstanceServicingStrategy())
})
