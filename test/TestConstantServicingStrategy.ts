

import * as assert from 'assert'
import * as jemsdi from "../source/Index";
import { IContainer } from "../source/IContainer";

describe('with cosntant servicing strategy resolution', function() {

    let kernel:jemsdi.IKernel =  jemsdi.createKernel();
    let constantInstance = {};

    before(function() {
        kernel.bind('fakeConstantType').toConstant(constantInstance);        
    });

    it('should resolve the registered object', function() {
        let resolvedObject:any = kernel.resolve('fakeConstantType');
        assert.ok(resolvedObject === constantInstance, 'The resolved object is not the registed one.');                 
    });
});