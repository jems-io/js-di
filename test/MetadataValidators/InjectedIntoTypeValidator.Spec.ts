/// <reference path="../../typings/index.d.ts" />

import * as assert from "assert"

import injectedIntoTypeValidator from "../../source/MetadataValidator/InjectedIntoTypeValidator" 
import { ResolutionContext } from "../../source/ResolutionContext";


describe('The [InjectedIntoTypeValidator]', function() {
    it('should return true if the reference is injected into the given type.', function() {
        class Class1 {}
        class Class2 {}

        let resolutionContext:ResolutionContext = new ResolutionContext();
        resolutionContext.targetResolutionStack = [Class1, Class2];

        assert.ok(injectedIntoTypeValidator(resolutionContext, null, Class1),
                 `The reference is not been injeted into the type [${Class1.name}]`)

        assert.ok(injectedIntoTypeValidator(resolutionContext, null, Class2),
                 `The reference is not been injeted into the type [${Class2.name}]`)
    })

    it('should return false if the reference is not injected into the given type.', function() { 
        class Class1 {}
        class Class2 {}

        let resolutionContext:ResolutionContext = new ResolutionContext();
        resolutionContext.targetResolutionStack = [Class1];

        assert.ok(!injectedIntoTypeValidator(resolutionContext, null, Class2),
                 `The reference is been injeted into the type [${Class2.name}]`)
    })
})