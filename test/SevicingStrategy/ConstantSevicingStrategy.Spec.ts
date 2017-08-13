/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'

import { ResolutionContext } from "../../source/ResolutionContex";
import { ConstantSevicingStrategy } from "../../source/SevicingStrategy/ConstantSevicingStrategy";
import { IContainer } from "../../source/IContainer";
import { ServicingError } from "../../source/Errors/ServicingError"

describe('The [ConstantSevicingStrategy]', function() {
    it('should return the given reference target.', function() {
        let referece = { id : 1 };
        let resolutionContext:ResolutionContext = new ResolutionContext();
        
        let constantSevicingStrategy:ConstantSevicingStrategy = new ConstantSevicingStrategy();
        let servicingResult:any = constantSevicingStrategy.serve(resolutionContext, referece);

        assert.equal(servicingResult, referece,
                 `The served reference is [${servicingResult}] when it should be [${referece}]`);
    });

    it('should trow an error if the given reference target is undefined or null.', function() {
        let resolutionContext:ResolutionContext = new ResolutionContext();

        let constantSevicingStrategy:ConstantSevicingStrategy = new ConstantSevicingStrategy();

        assert.throws(() => {            
            let servicingResult:any = constantSevicingStrategy.serve(resolutionContext, undefined);
        }, ServicingError);

        assert.throws(() => {            
            let servicingResult:any = constantSevicingStrategy.serve(resolutionContext, null);
        }, ServicingError);
    });
});