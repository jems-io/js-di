import * as assert from "assert"

import ancestoIsValidator from "../../src/metadata-validators/ancestoIsValidator" 
import { DependencyMetadata } from "../../src/dependencyMetadata";


describe('The [AncestoIsValidator]', function() {
    it('should return true if the ancestor is the given one.', function() { 
        class BaseClass {};
        class TheClass extends BaseClass {}

        let dependencyMetadata:DependencyMetadata = new DependencyMetadata();
        dependencyMetadata.activationReference = TheClass;

        assert.ok(ancestoIsValidator(null, dependencyMetadata, BaseClass),
                 `The given referene [${TheClass.name}] is not inheriting from [${BaseClass.name}]`)
    })

    it('should return false if the ancestor is not the given one.', function() { 
        class BaseClass {};
        class TheClass {}

        let dependencyMetadata:DependencyMetadata = new DependencyMetadata();
        dependencyMetadata.activationReference = TheClass;

        assert.ok(!ancestoIsValidator(null, dependencyMetadata, BaseClass),
                 `The given referene [${TheClass.name}] is inheriting from [${BaseClass.name}]`)
    })
})