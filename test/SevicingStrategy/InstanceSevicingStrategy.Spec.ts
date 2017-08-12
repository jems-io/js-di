/// <reference path="../../typings/index.d.ts" />

import * as assert from 'assert'
import { IMock,Mock } from 'typemoq'

import { ResolutionContext } from "../../source/ResolutionContex";
import { InstanceSevicingStrategy } from "../../source/SevicingStrategy/InstanceSevicingStrategy";
import { IContainer } from "../../source/IContainer";

class IntatiableFunction {};
class IntatiableFunctionWithArgument { constructor(argument1:string) {} };

describe('The [InstanceSevicingStrategy]', function() {
    it('should return an instance of the given reference target.', function() {
        let resolutionContext:ResolutionContext = new ResolutionContext();
    
        let instanceSevicingStrategy:InstanceSevicingStrategy = new InstanceSevicingStrategy();
        let servicingResult:any = instanceSevicingStrategy.serve(resolutionContext, IntatiableFunction);

        assert.ok(servicingResult instanceof IntatiableFunction,
                 `The served isntance is [${typeof servicingResult}] when it should be [${typeof IntatiableFunction}]`);
    })

    it('should return an instance of the given reference target and resolve its dependencies with the context origin container.', function() {
        let resolutionContext:ResolutionContext = new ResolutionContext();
        let containerMock:IMock<IContainer> = Mock.ofType<IContainer>();        
        containerMock.setup(x => x.resolve('argument1', resolutionContext)).returns(() => {});
        resolutionContext.originContainer = containerMock.object;
    
        let instanceSevicingStrategy:InstanceSevicingStrategy = new InstanceSevicingStrategy();
        let servicingResult:any = instanceSevicingStrategy.serve(resolutionContext, IntatiableFunctionWithArgument);

        assert.ok(servicingResult instanceof IntatiableFunctionWithArgument,
                 `The served isntance is [${typeof servicingResult}] when it should be [${typeof IntatiableFunctionWithArgument}]`);
    })    
})
