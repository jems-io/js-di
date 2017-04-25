/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../../distribution/Index";
import { IContainer } from "../../distribution/IContainer";
import FakeTypeDependant1 from "../fake_types/FakeTypeDependant1";
import FakeTypeDependant2 from "../fake_types/FakeTypeDependant2";
import FakeTypeC from "../fake_types/FakeTypeC";

describe('must throw an the error', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();

    before(function(done) {
        kernel.getDefaultContainer().then(function(container:IContainer) {
            
            container.registerDependencyMetadata( 'fakeTypeDependant1',({
                servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
                activationReference: FakeTypeDependant1,
                activateAsSingelton: false
            }));

            container.registerDependencyMetadata('fakeTypeDependant2',({
                servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
                activationReference: FakeTypeDependant2,
                activateAsSingelton: false
            }));

            container.registerDependencyMetadata('fakeTypeNotStrategy',({
                servingStrategy: -1,
                activationReference: FakeTypeC,
                activateAsSingelton: false
            }));

            container.registerDependencyMetadata( 'fakeTypeNULL',({
                servingStrategy: jemsdi.ServicingStrategy.CONSTANT,
                activationReference: null,
                activateAsSingelton: false
            }));

        });

        done();
    });

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

    // it('jemsdi.Errors.UnregisteredAliasError because there is nothing registered with fakeTypeUnexisting alias', function() {
    //     return kernel.getCurrentContainer().then(function(container) {
    //         container.unregisterDependenciesMetadataWithAlias('fakeTypeUnexisting').catch(function(error:Error) {
    //             assert.equal(error.name, 'UnregisteredAliasError', 'The error is not an instance of jemsdi.Errors.UnregisteredAliasError');                 
    //         });          
    //     });  
    // });

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