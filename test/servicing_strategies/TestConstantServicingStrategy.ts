/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../../distribution/Index";
import { IContainer } from "../../distribution/IContainer";

describe('with cosntant servicing strategy resolution', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();
    let constantInstance = {};

    before(async function() {
        let container:IContainer = await kernel.getDefaultContainer();

        await container.registerDependencyMetadata('fakeConstantType', ({
            servingStrategy: jemsdi.ServicingStrategy.CONSTANT,
            activationReference: constantInstance,
            activateAsSingelton: false
        }));
        
    });

    it('should resolve the registered object', async function() {
        let resolvedObject:any = await kernel.resolve('fakeConstantType');
        assert.ok(resolvedObject === constantInstance, 'The resolved object is not the registed one.');                 
    });
});