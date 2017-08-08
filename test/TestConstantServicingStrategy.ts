/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/Index";
import { IContainer } from "../distribution/IContainer";

describe('with cosntant servicing strategy resolution', function() {

    let kernel:jemsdi.IKernel =  jemsdi.createKernel();
    let constantInstance = {};

    before(function() {
        let container:IContainer = kernel.getDefaultContainer();

        container.registerDependencyMetadata('fakeConstantType', ({
            servicingStrategy: jemsdi.ServicingStrategy.CONSTANT,
            activationReference: constantInstance,
            activateAsSingelton: false
        }));
        
    });

    it('should resolve the registered object', function() {
        let resolvedObject:any = kernel.resolve('fakeConstantType');
        assert.ok(resolvedObject === constantInstance, 'The resolved object is not the registed one.');                 
    });
});