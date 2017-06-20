/// <reference path="../typings/index.d.ts" />

describe('The kernel,', function() {

    describe('when is resolving,', function() {

        describe('if everithing is good,', function() {
            // Test the instance servicing strategy
            require('./TestInstanceServicingStrategy');

            // Test the constant servicing strategy
            require('./TestConstantServicingStrategy');

            // Test the function builder servicing strategy
            require('./TestBuilderFunctionServicingStrategy');

            // Test the contention
            require('./TestContention');  
            
            // Test the alias sufixing configuration
            require('./TestAliasSufixingConfiguration');            
        });

        describe('if something is bad,', function() {
            // Test the error triggering
            require('./TestErrorTriggering');
        });
    });
});


