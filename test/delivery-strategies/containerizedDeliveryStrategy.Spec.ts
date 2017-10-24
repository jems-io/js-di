import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ResolutionContext } from '../../src/resolutionContext'
import { ContainerizedDeliveryStrategy } from '../../src/delivery-strategies/containerizedDeliveryStrategy'
import { ServicingStrategy } from '../../src/servicing-strategies/servicingStrategy'
import { DependencyMetadata } from '../../src/dependencyMetadata'
import { DeliveryError } from '../../src/errors/deliveryError'
import { Container } from '../../src/container'

describe('The [ContainerizedDeliveryStrategy]', function () {
  it('should return the same reference target for the same container.', function () {
    class InstantiableClass {}

    let containerizedDeliveryStrategy: ContainerizedDeliveryStrategy = new ContainerizedDeliveryStrategy()
    let servicingStrategyMock: IMock<ServicingStrategy> = Mock.ofType<ServicingStrategy>()
    servicingStrategyMock.setup((x: ServicingStrategy) => x.serve(It.isAny(), It.isAny()))
                                                               .returns(() => new InstantiableClass())

    let resolutionContext: ResolutionContext = new ResolutionContext()
    resolutionContext.originContainer = Mock.ofType<Container>().object
    let dependencyMetadata: DependencyMetadata = new DependencyMetadata()
    dependencyMetadata.activationReference = InstantiableClass
    dependencyMetadata.servicingStrategy = servicingStrategyMock.object

        // Should return the same because is the same resolution context, it mean that is the same resolution.
    let deliveryResult1: any = containerizedDeliveryStrategy.deliver(resolutionContext, dependencyMetadata)
    let deliveryResult2: any = containerizedDeliveryStrategy.deliver(resolutionContext, dependencyMetadata)

    assert.ok(deliveryResult1 instanceof InstantiableClass,
                 `The delivered 1 of type [${typeof deliveryResult1}] sould  [InstantiableClass].`)
    assert.ok(deliveryResult2 instanceof InstantiableClass,
                 `The delivered 2 of type [${typeof deliveryResult2}] sould  [InstantiableClass].`)
    assert.equal(deliveryResult1, deliveryResult2, 'The delivered result should be equals')

    servicingStrategyMock.verify((x: ServicingStrategy) => x.serve(It.isAny(), It.isAny()), Times.once())
  })

  it('should return differents reference target for differents container.', function () {
    class InstantiableClass {}

    let containerizedDeliveryStrategy: ContainerizedDeliveryStrategy = new ContainerizedDeliveryStrategy()
    let servicingStrategyMock: IMock<ServicingStrategy> = Mock.ofType<ServicingStrategy>()
    servicingStrategyMock.setup((x: ServicingStrategy) => x.serve(It.isAny(), It.isAny()))
                                                               .returns(() => new InstantiableClass())

    let resolutionContext1: ResolutionContext = new ResolutionContext()
    resolutionContext1.originContainer = Mock.ofType<Container>().object

    let resolutionContext2: ResolutionContext = new ResolutionContext()
    resolutionContext2.originContainer = Mock.ofType<Container>().object

    let dependencyMetadata: DependencyMetadata = new DependencyMetadata()
    dependencyMetadata.activationReference = InstantiableClass
    dependencyMetadata.servicingStrategy = servicingStrategyMock.object

        // Should return the diferent because are diferent resolution context original containers,
        // it mean that is the same resolution.
    let deliveryResult1: any = containerizedDeliveryStrategy.deliver(resolutionContext1, dependencyMetadata)
    let deliveryResult2: any = containerizedDeliveryStrategy.deliver(resolutionContext2, dependencyMetadata)

    assert.ok(deliveryResult1 instanceof InstantiableClass,
                 `The delivered 1 of type [${typeof deliveryResult1}] sould  [InstantiableClass].`)
    assert.ok(deliveryResult2 instanceof InstantiableClass,
                 `The delivered 2 of type [${typeof deliveryResult2}] sould  [InstantiableClass].`)
    assert.notEqual(deliveryResult1, deliveryResult2, 'The delivered result should be equals')

    servicingStrategyMock.verify((x: ServicingStrategy) => x.serve(It.isAny(), It.isAny()), Times.atLeast(2))
  })

  require('./commonDelivery.Test')(() => new ContainerizedDeliveryStrategy())

})
