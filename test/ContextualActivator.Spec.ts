/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import { ContextualActivator } from '../source/ContextualActivator'

describe('The [ContainerActivator]', function() {
    it('should return the result of the setted function with the requested name.', function() {
        let contextualActivator:ContextualActivator = new ContextualActivator();
        contextualActivator.setContextInstantiator<any, any>('settedFunction', function(contextTypeIntance, instanceIdentifier) { return 100; });
        assert.equal(contextualActivator.getContextInstantiator<any, any>('settedFunction')(null, null), 100, 'The result is not the expected one');
    })

    it('should throw an error is the requested name is not registered.', function() {
        try {
        let contextualActivator:ContextualActivator = new ContextualActivator();
        contextualActivator.getContextInstantiator<any, any>('settedFunction')(null, null);
        }
        catch(error) {
            assert.ok(error instanceof Error);
        }
    })
})
