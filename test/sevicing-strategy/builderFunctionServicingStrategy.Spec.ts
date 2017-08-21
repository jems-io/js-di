

import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { ResolutionContext } from "../../source/ResolutionContext";
import { BuilderFunctionServicingStrategy } from "../../source/servicing-strategy/BuilderFunctionServicingStrategy";
import { IContainer } from "../../source/IContainer";
import { ServicingError } from "../../source/errors/ServicingError"

describe('The [BuilderFunctionServicingStrategy]', function() {
    it('should return the result of the invokation of the given reference target.', function() {
        let resolutionContext:ResolutionContext = new ResolutionContext();
    
        let builderFunctionServicingStrategy:BuilderFunctionServicingStrategy = new BuilderFunctionServicingStrategy();
        let servicingResult:any = builderFunctionServicingStrategy.serve(resolutionContext, () => 123);

        assert.equal(servicingResult, 123,
                 `The served result is [${servicingResult}] when it should be [123]`);
    })

    it('should return the result of the invokation of the given reference target and resolve its dependencies with the context origin container.', function() {        
        let resolutionContext:ResolutionContext = new ResolutionContext();
        let containerMock:IMock<IContainer> = Mock.ofType<IContainer>();        
        containerMock.setup(x => x.resolve('argument1', It.isAny())).returns(() => 'moto');
        resolutionContext.originContainer = containerMock.object;
    
        let builderFunctionServicingStrategy:BuilderFunctionServicingStrategy = new BuilderFunctionServicingStrategy();
        let servicingResult:any = builderFunctionServicingStrategy.serve(resolutionContext, (argument1:string) => 'hello ' + argument1);

        assert.equal(servicingResult, 'hello moto',
                 `The served result is [${servicingResult}] when it should be [hello moto]`);

        containerMock.verify(x => x.resolve('argument1', resolutionContext), Times.once());
    })  
    
    it('should throw an error if the given metadata reference target is not argumentable as a function, class or lambda.', function() { 
        assert.throws(() => {
            let resolutionContext:ResolutionContext = new ResolutionContext();

            let builderFunctionServicingStrategy:BuilderFunctionServicingStrategy = new BuilderFunctionServicingStrategy();
            let servicingResult:any = builderFunctionServicingStrategy.serve(resolutionContext, {});
        }, ServicingError);
    })

    require('./CommonArgumentableServicig.Test')(() => new BuilderFunctionServicingStrategy());
})
