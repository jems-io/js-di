/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../../distribution/Index";
import { IContainer } from "../../distribution/IContainer";

describe('with builder function servicing strategy resolution', function() {

    let kernel:jemsdi.Kernel = new jemsdi.Kernel();
    let constantInstance = {};

    before(async function () {

        let container:IContainer = await kernel.getDefaultContainer();
        
        await container.registerDependencyMetadata('fakeFunctionBuilder', ({
            servingStrategy: jemsdi.ServicingStrategy.BUILDER_FUNCTION,
            activationReference: function() { return constantInstance; },
            activateAsSingelton: false
        }));            
    });

    it('should resolve the function value', async function () {
        let resolvedObject:any = await kernel.resolve('fakeFunctionBuilder');
        assert.ok(resolvedObject === constantInstance, 'The resolved object is not the function value.');        
    });
});
