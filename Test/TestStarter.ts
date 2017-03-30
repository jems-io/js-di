/// <reference path="../typings/index.d.ts" />

import * as assert from 'assert'
import { Kernel } from '../Source/Kernel';
import { FakeTypeA } from './FakeTypes/FakeTypeA';
import { FakeTypeB } from './FakeTypes/FakeTypeB';
import { FakeTypeC } from "./FakeTypes/FakeTypeC";
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

kernel.register({
     alias: 'fakeTypeC',
     servingStrategy: ServicingStrategy.INSTANCE,
     activationReference: FakeTypeC,
     activateAsSingelton: false
});





describe('The Kernel Should', function() {

    describe('Create an instance', function() {

        it('Of ' + FakeTypeA + ' with fakeTypeA alias', function() {
            return kernel.resolve('fakeTypeA').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeA) == true, true, 'Fail bro'); 
            })             
        });

        it('Of ' + FakeTypeB + ' with fakeTypeB alias, resolving A as a dependency of B ', function() {
            return kernel.resolve('fakeTypeB').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeB) == true, true, 'Fail bro'); 
            })             
        });

         it('Of ' + FakeTypeC + ' with fakeTypeC alias, resolving A and B as a dependency of C', function() {
            return kernel.resolve('fakeTypeC').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeC) == true, true, 'Fail bro'); 
            })             
        });
    });
});