/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import { Kernel } from '../Source/Kernel';
import { FakeTypeA } from './FakeTypes/FakeTypeA';
import { DependencyMetadata } from "../Source/DependencyMetadata";
import { ServicingStrategy } from "../Source/ServicingStrategy";

let kernel = new Kernel();


kernel.register({
     alias: 'fakeTypeA',
     servingStrategy: ServicingStrategy.INSTANCE,
     activationReference: FakeTypeA,
     activateAsSingelton: false
});



describe('The Kernel', function() {

    describe('Should', function() {

        it('should return -1 when the value is not present', function() {
            return kernel.resolve('fakeTypeA').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeA) == true, true, 'Fail bro'); 
            })             
        });
    });
});