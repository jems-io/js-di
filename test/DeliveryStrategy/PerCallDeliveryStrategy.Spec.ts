/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ResolutionContext } from "../../source/ResolutionContext";
import { PerCallDeliveryStrategy } from "../../source/DeliveryStrategy/PerCallDeliveryStrategy";
import { IServicingStrategy } from "../../source/ServicingStrategy/IServicingStrategy";
import { DependencyMetadata } from "../../source/DependencyMetadata";
import { DeliveryError } from "../../source/Errors/DeliveryError";

describe('The [PerCallDeliveryStrategy]', function() {
    it('should return a new instance of reference target in the given dependency metadata.', function() {
        class InstantiableClass {};
        let perCallDeliveryStrategy:PerCallDeliveryStrategy = new PerCallDeliveryStrategy();        
        let servicingStrategyMock:IMock<IServicingStrategy> = Mock.ofType<IServicingStrategy>();
        servicingStrategyMock.setup((x:IServicingStrategy) => x.serve(It.isAny(), It.isAny()))
                                                               .returns(() => new InstantiableClass());

        let dependencyMetadata:DependencyMetadata = new DependencyMetadata();
        dependencyMetadata.activationReference = InstantiableClass;
        dependencyMetadata.servicingStrategy = servicingStrategyMock.object;
        
        let deliveryResult1:any = perCallDeliveryStrategy.deliver(new ResolutionContext(), dependencyMetadata);
        let deliveryResult2:any = perCallDeliveryStrategy.deliver(new ResolutionContext(), dependencyMetadata);

        assert.ok(deliveryResult1 instanceof InstantiableClass,
                 `The delivered 1 of type [${typeof deliveryResult1}] sould  [InstantiableClass].`);
        assert.ok(deliveryResult2 instanceof InstantiableClass,
                 `The delivered 2 of type [${typeof deliveryResult2}] sould  [InstantiableClass].`);
        assert.notEqual(deliveryResult1, deliveryResult2, 'The delivered result should be diferent');
        
        servicingStrategyMock.verify((x:IServicingStrategy) => x.serve(It.isAny(), It.isAny()), Times.atLeast(2))
    });

    require('./CommonDelivery.Test')(() => new PerCallDeliveryStrategy());

});