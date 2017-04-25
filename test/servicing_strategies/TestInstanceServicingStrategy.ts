/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../../distribution/Index";
import FakeTypeA from '.././fake_types/FakeTypeA';
import FakeTypeB from '.././fake_types/FakeTypeB';
import FakeTypeC from ".././fake_types/FakeTypeC";
import { IContainer } from "../../distribution/IContainer";

describe('with instance servicing strategy', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();

     before(function(done) {
        kernel.getDefaultContainer().then(function(container:IContainer) {
            
            container.registerDependencyMetadata('fakeTypeA', ({
                servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
                activationReference: FakeTypeA,
                activateAsSingelton: false
            }));

            container.registerDependencyMetadata('fakeTypeB', ({
                servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
                activationReference: FakeTypeB,
                activateAsSingelton: false
            }));

            container.registerDependencyMetadata('fakeTypeC', ({
                servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
                activationReference: FakeTypeC,
                activateAsSingelton: false
            }));
        });

        done();
     });

    it('should resolve an instance of FakeTypeA with fakeTypeA alias', function() {
        return kernel.resolve('fakeTypeA').then(function(resolvedObject:FakeTypeA) {
            assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA'); 
        });           
    });

    it('should resolve an instance of FakeTypeB with fakeTypeB alias, resolving A as a dependency of B ', function() {
        return kernel.resolve('fakeTypeB').then(function(resolvedObject:FakeTypeB) {
            assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
            assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');
        });           
    });

    it('should resolve an instance of FakeTypeC with fakeTypeC alias, resolving A and B as a dependency of C', function() {
        return kernel.resolve('fakeTypeC').then(function(resolvedObject:FakeTypeC) {
            assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
            assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
            assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');
        });             
    });
});
