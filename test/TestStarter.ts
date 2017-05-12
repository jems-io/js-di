/// <reference path="../typings/index.d.ts" />

describe('The kernel', function() {

    describe('when is resolving', function() {

        describe('if everithing is good', function() {
            // Test the instance servicing strategy
            require('./servicing_strategies/TestInstanceServicingStrategy');

            // Test the constant servicing strategy
            require('./servicing_strategies/TestConstantServicingStrategy');

            // Test the function builder servicing strategy
            require('./servicing_strategies/TestBuilderFunctionServicingStrategy');

            // Test the contention
            require('./contention/TestContention');                
        });

        describe('if something is bad', function() {
            // Test the error triggering
            require('./errors/TestErrorTriggering');
        });
    });
});


