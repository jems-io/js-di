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

   it('should resolve an array with instances of FakeTypeA, FakeTypeB, FakeTypeC with fakeType alias when is using the List sufix.', async function() {
        let resolvedObjects:any[] = await kernel.resolve('fakeTypeList');

        assert.equal(3, resolvedObjects.length, 'The resolved objects quantity must be 3.');

        resolvedObjects.forEach(function(resolvedObject:any) { if (!resolvedObject.hasOwnProperty('fake')) throw new Error('Not all resolved objects are correrct.')});             
    });

    it('should resolve an array with instances of FakeTypeA, FakeTypeB, FakeTypeC with fakeType alias when is using the OptionalList sufix.', async function() {
        let resolvedObjects:any[] = await kernel.resolve('fakeTypeOptionalList');

        assert.equal(3, resolvedObjects.length, 'The resolved objects quantity must be 3.');

        resolvedObjects.forEach(function(resolvedObject:any) { if (!resolvedObject.hasOwnProperty('fake')) throw new Error('Not all resolved objects are correrct.')});             
    });

    it('should resolve a null with fakeTypeUnexisting alias when is using the Optional sufix.', async function() {        
        let resolvedObject:any = await kernel.resolve('fakeTypeUnexistingOptional');
        
        assert.equal(null, resolvedObject, "The resolved object is not registered, it must be null.")
    });

    it('should resolve a null with fakeTypeUnexisting alias when is using the OptionalList sufix.', async function() {        
        let resolvedObjects:any[] = await kernel.resolve('fakeTypeUnexistingOptionalList');
        
        assert.equal(null, resolvedObjects, "The resolved object is not registered, it must be null.")
    });
});
