

import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ResolutionContext } from "../../source/ResolutionContext";
import { SingletonDeliveryStrategy } from "../../source/delivery-strategy/SingletonDeliveryStrategy";
import { IServicingStrategy } from "../../source/servicing-strategy/IServicingStrategy";
import { DependencyMetadata } from "../../source/DependencyMetadata";
import { DeliveryError } from "../../source/errors/DeliveryError";

describe('The [SingletonDeliveryStrategy]', function() {
    it('should return the same instance of reference target in the given dependency metadata.', function() {
        class InstantiableClass {};
        let singletonDeliveryStrategy:SingletonDeliveryStrategy = new SingletonDeliveryStrategy();        
        let servicingStrategyMock:IMock<IServicingStrategy> = Mock.ofType<IServicingStrategy>();
        servicingStrategyMock.setup((x:IServicingStrategy) => x.serve(It.isAny(), It.isAny()))
                                                               .returns(() => new InstantiableClass());

        let dependencyMetadata:DependencyMetadata = new DependencyMetadata();
        dependencyMetadata.activationReference = InstantiableClass;
        dependencyMetadata.servicingStrategy = servicingStrategyMock.object;
        
        let deliveryResult1:any = singletonDeliveryStrategy.deliver(new ResolutionContext(), dependencyMetadata);
        let deliveryResult2:any = singletonDeliveryStrategy.deliver(new ResolutionContext(), dependencyMetadata);

        assert.ok(deliveryResult1 instanceof InstantiableClass,
                 `The delivered 1 of type [${typeof deliveryResult1}] sould  [InstantiableClass].`);
        assert.ok(deliveryResult2 instanceof InstantiableClass,
                 `The delivered 2 of type [${typeof deliveryResult2}] sould  [InstantiableClass].`);
        assert.equal(deliveryResult1, deliveryResult2, 'The delivered result should be equal');
        
        servicingStrategyMock.verify((x:IServicingStrategy) => x.serve(It.isAny(), It.isAny()), Times.once())
    });

    require('./CommonDelivery.Test')(() => new SingletonDeliveryStrategy());

});