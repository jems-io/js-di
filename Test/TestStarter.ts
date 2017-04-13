/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/Index";
import FakeTypeA from './fake_types/FakeTypeA';
import FakeTypeB from './fake_types/FakeTypeB';
import FakeTypeC from "./fake_types/FakeTypeC";

let kernel:jemsdi.Kernel = new jemsdi.Kernel();

kernel.register({
     alias: 'fakeTypeA',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeA,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeB',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeB,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeC',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeC,
     activateAsSingelton: false
});

describe('The Kernel Should', function() {

    describe('Create an instance', function() {

        it('of FakeTypeA with fakeTypeA alias', function() {
            return kernel.resolve('fakeTypeA').then(function(resolvedObject:FakeTypeA) {
                assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA'); 
            });           
        });

        it('of FakeTypeB with fakeTypeB alias, resolving A as a dependency of B ', function() {
            return kernel.resolve('fakeTypeB').then(function(resolvedObject:FakeTypeB) {
                 assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
                 assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');
            });           
        });

        it('of FakeTypeC with fakeTypeC alias, resolving A and B as a dependency of C', function() {
            return kernel.resolve('fakeTypeC').then(function(resolvedObject:FakeTypeC) {
                 assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
                 assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
                 assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');
            });             
        });
    });

    describe('Fail going throw', function() {

        it('jemsdi.Errors.AliasNotRegisteredError because there is nothing registered with fakeTypeE alias', function() {
            return kernel.resolve('fakeTypeE').catch(function(error:Error) {
                assert.equal(error.name, 'AliasNotRegisteredError', 'The error is not an instance of jemsdi.Errors.AliasNotRegisteredError');                 
            });           
        });
    });
});
