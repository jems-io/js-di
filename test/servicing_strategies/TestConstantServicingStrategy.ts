/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../../distribution/Index";
import { IContainer } from "../../distribution/IContainer";

describe('with cosntant servicing strategy', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();
    let constantInstance = {};

    before(function(done) {
        kernel.getDefaultContainer().then(function(container:IContainer) {
            
            container.registerDependencyMetadata('fakeConstantType', ({
                servingStrategy: jemsdi.ServicingStrategy.CONSTANT,
                activationReference: constantInstance,
                activateAsSingelton: false
            }));
        });

        done();
    });

    it('should resolve the registered object', function() {
        return kernel.resolve('fakeConstantType').then(function(resolvedObject:any) {
            assert.ok(resolvedObject === constantInstance, 'The resolved object is not the registed one.'); 
        });           
    });
});