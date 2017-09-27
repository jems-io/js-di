import * as assert from 'assert'

import * as jemsdi from "../src/index";

describe('with cosntant servicing strategy resolution', function() {

    let kernel:jemsdi.Kernel =  jemsdi.createKernel();
    let constantInstance = {};

    before(function() {
        kernel.bind('fakeConstantType').to(constantInstance).asConstant();        
    });

    it('should resolve the registered object', function() {
        let resolvedObject:any = kernel.resolve('fakeConstantType');
        assert.ok(resolvedObject === constantInstance, 'The resolved object is not the registed one.');                 
    });
});