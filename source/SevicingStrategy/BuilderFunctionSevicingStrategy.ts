import contextualActivator from '../ContextualActivator'

import { ResolutionContext } from "../ResolutionContex";
import { ISevicingStrategy } from "./ISevicingStrategy";
import { IArgumentsNamesProvider } from "../IArgumentsNamesProvider";
import { ServicingError } from "../../source/Errors/ServicingError"

/**
 * Represents a servicing strategy that transform and serve metadata reference targets as the result of an invokation.
 */
export class BuilderFunctionSevicingStrategy implements ISevicingStrategy {
    /**
     * Represents the arguments name provider that identify the arguments in a argumentable reference.
     */
    private _argumentsNamesProvider:IArgumentsNamesProvider;

    /**
     * Instantiate a new builer function servicing strategy.
     */
    constructor() {
        // Resolving it with poors man constructor. :(
        this._argumentsNamesProvider = contextualActivator.getContextInstantiator<any, IArgumentsNamesProvider>('argumentsNamesProvider')(null, '');
    }

    /**
     * Invoke and serve the result of the invokation of the given reference target.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param referenceTarget Represents the reference target to invoke.
     * @return The result of the invokation of the reference target.
     */
    public serve(resolutionContext:ResolutionContext , referenceTarget:any):any {
        if (!this._argumentsNamesProvider.isArgumetable(referenceTarget))
            throw new ServicingError(`The provided metadata reference target of type [${typeof referenceTarget}], is not argumentable.`);

        let argumetsNames:string[] = this._argumentsNamesProvider.getArgumentsNames(referenceTarget);
        let argumets:any[] = [];

        

        argumetsNames.forEach((argumentName) => {
            console.log('resolving:', argumentName);
            argumets.push(resolutionContext.originContainer.resolve(argumentName, resolutionContext));
            console.log('result:', argumets);
        });

        

        return referenceTarget.call(null, argumets);
    }
}