import * as assert from 'assert'

import { ResolutionContext } from "../../src/resolutionContext";
import { ConstantServicingStrategy } from "../../src/servicing-strategies/constantServicingStrategy";
import { ServicingError } from "../../src/errors/servicingError"

describe('The [ConstantServicingStrategy]', function() {
    it('should return the given reference target.', function() {
        let referece = { id : 1 };
        let resolutionContext:ResolutionContext = new ResolutionContext();
        
        let constantServicingStrategy:ConstantServicingStrategy = new ConstantServicingStrategy();
        let servicingResult:any = constantServicingStrategy.serve(resolutionContext, referece);

        assert.equal(servicingResult, referece,
                 `The served reference is [${servicingResult}] when it should be [${referece}]`);
    });

    it('should trow an error if the given reference target is undefined or null.', function() {
        let resolutionContext:ResolutionContext = new ResolutionContext();

        let constantServicingStrategy:ConstantServicingStrategy = new ConstantServicingStrategy();

        assert.throws(() => {            
            let servicingResult:any = constantServicingStrategy.serve(resolutionContext, undefined);
        }, ServicingError);

        assert.throws(() => {            
            let servicingResult:any = constantServicingStrategy.serve(resolutionContext, null);
        }, ServicingError);
    });
});