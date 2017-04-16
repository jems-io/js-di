/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/Index";
import FakeTypeA from './fake_types/FakeTypeA';
import FakeTypeB from './fake_types/FakeTypeB';
import FakeTypeC from "./fake_types/FakeTypeC";
import FakeTypeDependant1 from "./fake_types/FakeTypeDependant1";
import FakeTypeDependant2 from "./fake_types/FakeTypeDependant2";

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

let constantInstance = {};

kernel.register({
     alias: 'fakeConstantType',
     servingStrategy: jemsdi.ServicingStrategy.CONSTANT,
     activationReference: constantInstance,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeDependant1',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeDependant1,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeDependant2',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeDependant2,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeNotStrategy',
     servingStrategy: -1,
     activationReference: FakeTypeC,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeNULL',
     servingStrategy: jemsdi.ServicingStrategy.CONSTANT,
     activationReference: null,
     activateAsSingelton: false
});


describe('The Kernel Should', function() {

    describe('Get', function() {

        it('an instance of FakeTypeA with fakeTypeA alias', function() {
            return kernel.resolve('fakeTypeA').then(function(resolvedObject:FakeTypeA) {
                assert.ok((resolvedObject instanceof FakeTypeA) == true, 'The resolved type is not: FakeTypeA'); 
            });           
        });

        it('an instance of FakeTypeB with fakeTypeB alias, resolving A as a dependency of B ', function() {
            return kernel.resolve('fakeTypeB').then(function(resolvedObject:FakeTypeB) {
                 assert.ok((resolvedObject instanceof FakeTypeB) == true, 'The resolved type is not: FakeTypeB');                 
                 assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA');
            });           
        });

        it('an instance of FakeTypeC with fakeTypeC alias, resolving A and B as a dependency of C', function() {
            return kernel.resolve('fakeTypeC').then(function(resolvedObject:FakeTypeC) {
                 assert.ok((resolvedObject instanceof FakeTypeC) == true, 'The resolved type is not: FakeTypeC');
                 assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) == true, 'The resolved A dependency type is not: FakeTypeA'); 
                 assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) == true, 'The resolved B dependency type is not: FakeTypeB');
            });             
        });

        it('the registered object', function() {
            return kernel.resolve('fakeConstantType').then(function(resolvedObject:any) {
                assert.ok(resolvedObject === constantInstance, 'The resolved object is not the registed one.'); 
            });           
        });
    });

    describe('Fail going throw', function() {

        it('jemsdi.Errors.UnregisteredAliasError because there is nothing registered with fakeTypeUnexisting alias', function() {
            return kernel.resolve('fakeTypeUnexisting').catch(function(error:Error) {
                assert.equal(error.name, 'UnregisteredAliasError', 'The error is not an instance of jemsdi.Errors.UnregisteredAliasError');                 
            });           
        });

        it('jemsdi.Errors.UnsupportedServicignStrategyError because there is not a servicing strategy that match with the metadata.', function() {
            return kernel.resolve('fakeTypeNotStrategy').catch(function(error:Error) {
                assert.equal(error.name, 'UnsupportedServicignStrategyError', 'The error is not an instance of jemsdi.Errors.UnsupportedServicignStrategyError');                 
            });           
        });

        it('jemsdi.Errors.ActivationFailError because the reuslt of the resolution is null.', function() {
            return kernel.resolve('fakeTypeNULL').catch(function(error:Error) {
                assert.equal(error.name, 'ActivationFailError', 'The error is not an instance of jemsdi.Errors.ActivationFailError');                 
            });           
        });   

        it('jemsdi.Errors.UnregisteredAliasError because there is nothing registered with fakeTypeUnexisting alias', function() {
            return kernel.unregister('fakeTypeUnexisting').catch(function(error:Error) {
                assert.equal(error.name, 'UnregisteredAliasError', 'The error is not an instance of jemsdi.Errors.UnregisteredAliasError');                 
            });           
        });

        it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy between dependant1 and dependant2 with alias fakeTypeDependant1', function() {
            return kernel.resolve('fakeTypeDependant1').catch(function(error:Error) {
                assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');                 
            });           
        });       

        it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy between dependant1 and dependant2 with alias fakeTypeDependant2', function() {
            return kernel.resolve('fakeTypeDependant2').catch(function(error:Error) {
                assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');                 
            });           
        });    
    });
});
