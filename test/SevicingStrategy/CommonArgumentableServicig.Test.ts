import * as assert from 'assert'
import { IServicingStrategy } from "../../source/ServicingStrategy/IServicingStrategy";
import { ResolutionContext } from "../../source/ResolutionContext";
import { ResolutionOption } from "../../source/ResolutionOption";

export = function(servicingStrategyProvider:() => IServicingStrategy) {
    it('shold override de arguments with the resolution option dependencies when it contains matching arguments', function() {
        let resolutionContext:ResolutionContext = new ResolutionContext(); 
        resolutionContext.resolutionOption = new ResolutionOption();
        resolutionContext.resolutionOption.dependencies = {
            toResolveArgument: 'Hello Moto'        
        }

        let argumentableServicingStrategy:IServicingStrategy = servicingStrategyProvider();
        
        let servicingResult:any = argumentableServicingStrategy.serve(resolutionContext, function(toResolveArgument:string) {
            if (this)
                this.resolvedArgument = toResolveArgument;
                        
            return {
                resolvedArgument: toResolveArgument
            }
        })

        console.log(servicingResult);

        assert.equal(servicingResult.resolvedArgument, 'Hello Moto');
    })
}