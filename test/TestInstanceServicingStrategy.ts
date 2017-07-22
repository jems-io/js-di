/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/Index";
import { FakeTypeA } from './fake_types/FakeTypeA';
import { FakeTypeB } from './fake_types/FakeTypeB';
import { FakeTypeC } from "./fake_types/FakeTypeC";
import { IContainer } from "../distribution/IContainer";

describe('with instance servicing strategy resolution', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();

     before(function() {
        let container:IContainer = kernel.getDefaultContainer();
            
        container.registerDependencyMetadata('fakeTypeA', ({
            servicingStrategy: jemsdi.ServicingStrategy.INSTANCE,
            activationReference: FakeTypeA,
            activateAsSingelton: false
        }));

        container.registerDependencyMetadata('fakeTypeB', ({
            servicingStrategy: jemsdi.ServicingStrategy.INSTANCE,
            activationReference: FakeTypeB,
            activateAsSingelton: false
        }));

        container.registerDependencyMetadata('fakeTypeC', ({
            servicingStrategy: jemsdi.ServicingStrategy.INSTANCE,
            activationReference: FakeTypeC,
            activateAsSingelton: false
        }));
     });

    it('should resolve an instance of FakeTypeA with fakeTypeA alias', function() {
        let resolvedObject:FakeTypeA = kernel.resolve('fakeTypeA');
        assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA');                 
    });

    it('should resolve an instance of FakeTypeA with function [FakeTypeA]', function() {
        let resolvedObject:FakeTypeA = kernel.resolve(FakeTypeA);
        assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA');                 
    });

    it('should resolve an instance of FakeTypeB with fakeTypeB alias, resolving A as a dependency of B ', function() {
        let resolvedObject:FakeTypeB = kernel.resolve('fakeTypeB');
        assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
        assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');                
    });

    it('should resolve an instance of FakeTypeB with  function [FakeTypeB], resolving A as a dependency of B ', function() {
        let resolvedObject:FakeTypeB = kernel.resolve(FakeTypeB);
        assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
        assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');                
    });

    it('should resolve an instance of FakeTypeC with fakeTypeC alias, resolving A and B as a dependency of C', function() {
        let resolvedObject:FakeTypeC = kernel.resolve('fakeTypeC');
        assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
        assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
        assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');                   
    });

    it('should resolve an instance of FakeTypeC with  function [FakeTypeC], resolving A and B as a dependency of C', function() {
        let resolvedObject:FakeTypeC = kernel.resolve(FakeTypeC);
        assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
        assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
        assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');                   
    });
});
