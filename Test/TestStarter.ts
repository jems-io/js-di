/// <reference path="../typings/index.d.ts" />
/// <reference path="../distribution/Index.d.ts" />

import * as assert from 'assert'
import * as jemsdi from "../distribution/index";
import { FakeTypeA } from './fake_types/FakeTypeA';
import { FakeTypeB } from './fake_types/FakeTypeB';
import { FakeTypeC } from "./fake_types/FakeTypeC";

let kernel:jemsdi.Kernel = new jemsdi.Kernel();

kernel.register({
     alias: 'fakeTypeA',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeA,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeB',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeB,
     activateAsSingelton: false
});

kernel.register({
     alias: 'fakeTypeC',
     servingStrategy: jemsdi.ServicingStrategy.INSTANCE,
     activationReference: FakeTypeC,
     activateAsSingelton: false
});

describe('The Kernel Should', function() {

    describe('Create an instance', function() {

        it('Of ' + FakeTypeA + ' with fakeTypeA alias', function() {
            return kernel.resolve('fakeTypeA').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeA) == true, true, 'Fail bro'); 
            });           
        });

        it('Of ' + FakeTypeB + ' with fakeTypeB alias, resolving A as a dependency of B ', function() {
            return kernel.resolve('fakeTypeB').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeB) == true, true, 'Fail bro'); 
            });           
        });

         it('Of ' + FakeTypeC + ' with fakeTypeC alias, resolving A and B as a dependency of C', function() {
            return kernel.resolve('fakeTypeC').then(function(resolvedObject:any) {
                console.log(resolvedObject);
                assert.equal((resolvedObject instanceof FakeTypeC) == true, true, 'Fail bro'); 
            });             
        });
    });
});