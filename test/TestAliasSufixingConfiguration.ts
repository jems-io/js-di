

import * as assert from 'assert'
import * as jemsdi from "../source/Index";
import { IContainer } from "../source/IContainer";

describe('with an alias that contain sufixing configuration', function() {

    let kernel:jemsdi.IKernel =  jemsdi.createKernel();    

     before(function() {
        kernel.bind('fakeType').to(function() { this.fake = true; });
        kernel.bind('fakeType').to(function() { this.fake = true; });
        kernel.bind('fakeType').to(function() { this.fake = true; });        
     });

   it('should resolve an array with instances of FakeTypeA, FakeTypeB, FakeTypeC with fakeType alias when is using the List sufix.', function() {
        let resolvedObjects:any[] = kernel.resolve('fakeTypeList');

        assert.equal(3, resolvedObjects.length, 'The resolved objects quantity must be 3.');

        resolvedObjects.forEach(function(resolvedObject:any) { if (!resolvedObject.hasOwnProperty('fake')) throw new Error('Not all resolved objects are correrct.')});             
    });

    it('should resolve an array with instances of FakeTypeA, FakeTypeB, FakeTypeC with fakeType alias when is using the OptionalList sufix.', function() {
        let resolvedObjects:any[] = kernel.resolve('fakeTypeOptionalList');

        assert.equal(3, resolvedObjects.length, 'The resolved objects quantity must be 3.');

        resolvedObjects.forEach(function(resolvedObject:any) { if (!resolvedObject.hasOwnProperty('fake')) throw new Error('Not all resolved objects are correrct.')});             
    });

    it('should resolve a null with fakeTypeUnexisting alias when is using the Optional sufix.', function() {        
        let resolvedObject:any = kernel.resolve('fakeTypeUnexistingOptional');
        
        assert.equal(null, resolvedObject, "The resolved object is not registered, it must be null.")
    });

    it('should resolve a null with fakeTypeUnexisting alias when is using the OptionalList sufix.', function() {        
        let resolvedObjects:any[] = kernel.resolve('fakeTypeUnexistingOptionalList');
        
        assert.equal(null, resolvedObjects, "The resolved object is not registered, it must be null.")
    });
});
