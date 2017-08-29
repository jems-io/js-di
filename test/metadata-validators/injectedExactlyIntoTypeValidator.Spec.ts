import * as assert from "assert"

import injectedExactlyIntoTypeValidator from "../../src/metadata-validators/injectedExactlyIntoTypeValidator" 
import { ResolutionContext } from "../../src/resolutionContext";


describe('The [InjectedExactlyIntoTypeValidator]', function() {
    it('should return true if the reference is injected exactly into the given type.', function() {
        class Class1 {}
        class Class2 {}
        
        let resolutionContext:ResolutionContext = new ResolutionContext();
        resolutionContext.targetResolutionStack = [Class1, Class2];

        assert.ok(injectedExactlyIntoTypeValidator(resolutionContext, null, Class2),
                 `The reference is not been injeted exactly into the type [${Class2.name}]`)
    })

    it('should return false if the reference is not injected exactly into the given type.', function() { 
        class Class1 {}
        class Class2 {}

        let resolutionContext:ResolutionContext = new ResolutionContext();
        resolutionContext.targetResolutionStack = [Class1, Class2];

        assert.ok(!injectedExactlyIntoTypeValidator(resolutionContext, null, Class1),
                 `The reference is been injeted exactly into the type [${Class2.name}] not into [${Class1.name}]`)
    })
})