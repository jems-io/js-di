/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import { Kernel } from '../Source/Kernel';
import { FakeTypeA } from './FakeTypes/FakeTypeA';
import { FakeTypeB } from './FakeTypes/FakeTypeB';
import { DependencyMetadata } from "../Source/DependencyMetadata";
import { ServicingStrategy } from "../Source/ServicingStrategy";

let kernel = new Kernel();


kernel.register({
     alias: 'fakeTypeA',
     servingStrategy: ServicingStrategy.INSTANCE,
     activationReference: FakeTypeA,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeB',
     servingStrategy: ServicingStrategy.INSTANCE,
     activationReference: FakeTypeB,
     activateAsSingelton: false
});



describe('The Kernel', function() {

    describe('Should', function() {

        it('Return an instance of ' + FakeTypeA + ' with fakeTypeA alias', function() {
            return kernel.resolve('fakeTypeA').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeA) == true, true, 'Fail bro'); 
            })             
        });

        it('Return an instance of ' + FakeTypeB + ' with fakeTypeB alias, resolving A as a dependency of B ', function() {
            return kernel.resolve('fakeTypeB').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeB) == true, true, 'Fail bro'); 
            })             
        });
    });
});