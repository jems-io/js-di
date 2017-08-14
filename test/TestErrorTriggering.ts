/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../source/Index";
import { IContainer } from "../source/IContainer";
import { FakeTypeDependant1 } from "./fake_types/FakeTypeDependant1";
import { FakeTypeDependant2 } from "./fake_types/FakeTypeDependant2";
import { FakeTypeC } from "./fake_types/FakeTypeC";

describe('must throw an the error', function() {

    let kernel:jemsdi.IKernel =  jemsdi.createKernel();

    before(function() {
        kernel.bind('fakeTypeDependant1').to(FakeTypeDependant1);
        kernel.bind('fakeTypeDependant2').to(FakeTypeDependant2);
        kernel.bind('fakeTypeNotStrategy').toCustomServicingStragy(FakeTypeC, null);
        kernel.bind('fakeTypeNULL').toConstant(null);
        kernel.bind('fakeType').to(function() { this.fake = true; });
        kernel.bind('fakeType').to(function() { this.fake = true; });
    });

    it('jemsdi.Errors.UnregisteredAliasError because there is nothing registered with fakeTypeUnexisting alias', function() {
         try {
             let resolvedObject:any = kernel.resolve('fakeTypeUnexisting');             
             assert.ok(false, 'Must throw the exception because the alias is not registered.');
         } catch (error) {
             assert.equal(error.name, 'UnregisteredAliasError', 'The error is not an instance of jemsdi.Errors.UnregisteredAliasError');                 
         }                  
    });

    it('jemsdi.Errors.UnsupportedServicignStrategyError because there is not a servicing strategy that match with the metadata.',function() {
        try {
             let resolvedObject:any = kernel.resolve('fakeTypeNotStrategy');             
             assert.ok(false, 'Must throw the exception because the strategy is not suported.');
         } catch (error) {
             assert.equal(error.name, 'UnsupportedServicignStrategyError', 'The error is not an instance of jemsdi.Errors.UnsupportedServicignStrategyError');                 
         }          
    });

    it('jemsdi.Errors.ActivationFailError because the reuslt of the resolution is null.', function() {
        try {
            let resolvedObject:any = kernel.resolve('fakeTypeNULL');             
            assert.ok(false, 'Must throw the exception because the activation result is null.');
        } catch (error) {            
            assert.equal(error.name, 'DeliveryError', 'The error is not an instance of ServicingError');                 
        }      
    });

    // it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy between dependant1 and dependant2 with alias fakeTypeDependant1', function() {
    //     try {
    //         let resolvedObject:any = kernel.resolve('fakeTypeDependant1');             
    //         assert.ok(false, 'Must throw the exception because there is a ciclyc dependency.');
    //     } catch (error) {
    //         assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');                 
    //     }          
    // });       

    // it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy between dependant1 and dependant2 with alias fakeTypeDependant2', function() {
    //     try {
    //         let resolvedObject:any = kernel.resolve('fakeTypeDependant2');             
    //         assert.ok(false, 'Must throw the exception because there is a ciclyc dependency.');
    //     } catch (error) {
    //         assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');                 
    //     }          
    // });

    it('jemsdi.Errors.ResolutionConfigurationError because there is an ambiguety with the faketype alias.', function() {
        try {
            let resolvedObject:any = kernel.resolve('fakeType');             
            assert.ok(false, 'Must throw the exception because there is a resolution configuration error with the quantities.');
        } catch (error) {
            assert.equal(error.name, 'ResolutionConfigurationError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');                 
        }          
    });

    it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy with the containers support hierarchy.', function() {
        try {             
            kernel.createContainer('ContainerB').setSupportContainersAliases(['default']); 
            kernel.createContainer('ContainerA').setSupportContainersAliases(['ContainerB']);
            kernel.getDefaultContainer().setSupportContainersAliases(['ContainerA']);

            assert.ok(false, 'Must throw the exception because there is a resolution configuration error with the quantities.');
        } catch (error) {     
            assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError:\n\n' + error.message);                 
        }          
    });
});