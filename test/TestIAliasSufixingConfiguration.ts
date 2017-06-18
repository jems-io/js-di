/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/Index";
// import FakeTypeA from './fake_types/FakeTypeA';
// import FakeTypeB from './fake_types/FakeTypeB';
// import FakeTypeC from "./fake_types/FakeTypeC";
import { IContainer } from "../distribution/IContainer";

describe('with an alias that contain sufixing configuration', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();

     before(async function() {
        let container:IContainer = await kernel.getDefaultContainer();
            
        await container.registerDependencyMetadata('fakeType', ({
            servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
            activationReference: function() { this.fake = true; },
            activateAsSingelton: false
        }));

        await container.registerDependencyMetadata('fakeType', ({
            servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
            activationReference: function() { this.fake = true; },
            activateAsSingelton: false
        }));

        await container.registerDependencyMetadata('fakeType', ({
            servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
            activationReference: function() { this.fake = true; },
            activateAsSingelton: false
        }));
     });

    it('should resolve an array with instances of FakeTypeA, FakeTypeB, FakeTypeC with fakeType alias', async function() {
        let resolvedObjects:any[] = await kernel.resolve('fakeTypeList');
        
        console.log(resolvedObjects);
        //assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA');                 
    });

    // it('should resolve an instance of FakeTypeB with fakeTypeB alias, resolving A as a dependency of B ', async function() {
    //     let resolvedObject:FakeTypeB = await kernel.resolve('fakeTypeB');
    //     assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
    //     assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');                
    // });

    // it('should resolve an instance of FakeTypeC with fakeTypeC alias, resolving A and B as a dependency of C', async function() {
    //     let resolvedObject:FakeTypeC = await kernel.resolve('fakeTypeC');
    //     assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
    //     assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
    //     assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');                   
    // });
});
