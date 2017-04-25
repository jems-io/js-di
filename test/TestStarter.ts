/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/Index";
import FakeTypeA from './fake_types/FakeTypeA';
import FakeTypeB from './fake_types/FakeTypeB';
import FakeTypeC from "./fake_types/FakeTypeC";
import FakeTypeDependant1 from "./fake_types/FakeTypeDependant1";
import FakeTypeDependant2 from "./fake_types/FakeTypeDependant2";
import { IContainer } from "../distribution/IContainer";

let kernel:jemsdi.Kernel = new jemsdi.Kernel();
let constantInstance = {};

describe('The kernel', function() {

    describe('if everithing is good', function() {
        // Test the instance servicing strategy
        require('./servicing_strategies/TestInstanceServicingStrategy');

        // Test the constant servicing strategy
        require('./servicing_strategies/TestConstantServicingStrategy');
    });

     describe('if something is bad', function() {
        // Test the instance servicing strategy
        require('./errors/TestErrorTriggering');
    });
});


