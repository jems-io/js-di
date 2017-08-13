/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'

import { ArgumentsNamesProvider } from "../source/ArgumentsNamesProvider";

describe('The [ArgumentsNamesProvider]', function() {
    it('should return an empty array if the given argumentable object does not contain arguments', function() { 
        let argumentsNamesProvider:ArgumentsNamesProvider = new ArgumentsNamesProvider();
        
        let argumentNames:string[] = argumentsNamesProvider.getArgumentsNames(function() {});

        assert.ok(argumentNames instanceof Array, 
                 `The returned object of type [${typeof argumentNames}] is not an array`);
        assert.equal(argumentNames.length, 0, 
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`);
    });

    it('should return an array with 1 arguments names.', function() { 
        let argumentsNamesProvider:ArgumentsNamesProvider = new ArgumentsNamesProvider();
        
        let argumentNames:string[] = argumentsNamesProvider.getArgumentsNames(function(arg1:any) {});

        assert.equal(argumentNames.length, 1, 
                 `The returned arguments name should be equal to 1, not ${argumentNames.length}`);
    });

    it('should return an array with 3 arguments names.', function() { 
        let argumentsNamesProvider:ArgumentsNamesProvider = new ArgumentsNamesProvider();
        
        let argumentNames:string[] = argumentsNamesProvider.getArgumentsNames(function(arg1:any, arg2:any, arg3:any) {});

        assert.equal(argumentNames.length, 3, 
                 `The returned arguments name should be equal to 3, not ${argumentNames.length}`);
    });

    it('should be able to resolve functions with the corret arguments quantity', function() { 
        let argumentsNamesProvider:ArgumentsNamesProvider = new ArgumentsNamesProvider();
        
        let argumentNames:string[] = argumentsNamesProvider.getArgumentsNames(function(arg1:any) {});

        assert.equal(argumentNames.length, 1, 
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`);
    });

    it('should be able to resolve classes with the corret arguments quantity', function() { 
        class AClass { constructor(arg1:any) {} };

        let argumentsNamesProvider:ArgumentsNamesProvider = new ArgumentsNamesProvider();
        
        let argumentNames:string[] = argumentsNamesProvider.getArgumentsNames(AClass);

        assert.equal(argumentNames.length, 1, 
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`);
    });

    it('should be able to resolve lambdas with the corret arguments quantity', function() {        
        let argumentsNamesProvider:ArgumentsNamesProvider = new ArgumentsNamesProvider();
        
        let argumentNames:string[] = argumentsNamesProvider.getArgumentsNames((arg1:any) => {});

        assert.equal(argumentNames.length, 1, 
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`);
    });
});