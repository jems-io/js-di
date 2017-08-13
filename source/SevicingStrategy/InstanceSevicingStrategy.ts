import contextualActivator from '../ContextualActivator'

import { ResolutionContext } from "../ResolutionContex";
import { ISevicingStrategy } from "./ISevicingStrategy";
import { IArgumentsNamesProvider } from "../IArgumentsNamesProvider";
import { ServicingError } from "../../source/Errors/ServicingError"

/**
 * Represents a servicing strategy that transform and serve metadata reference targets as an instance.
 */
export class InstanceSevicingStrategy implements ISevicingStrategy {
    /**
     * Represents the arguments name provider that identify the arguments in a argumentable reference.
     */
    private _argumentsNamesProvider:IArgumentsNamesProvider;

    /**
     * Instantiate a new instance servicing strategy.
     */
    constructor() {
        // Resolving it with poors man constructor. :(
        this._argumentsNamesProvider = contextualActivator.getContextInstantiator<any, IArgumentsNamesProvider>('argumentsNamesProvider')(null, '');
    }

    /**
     * Instantiate and serve the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param referenceTarget Represents the reference target to instantiate.
     * @return The instantiated reference target.
     */
    public serve(resolutionContext:ResolutionContext , referenceTarget:any):any {
        if (!this._argumentsNamesProvider.isArgumetable(referenceTarget))
            throw new ServicingError(`The provided metadata reference target of type [${typeof referenceTarget}], is not argumentable.`);

        let argumetsNames:string[] = this._argumentsNamesProvider.getArgumentsNames(referenceTarget);
        let argumets:any[] = [null];

        argumetsNames.forEach((argumentName) => {
            argumets.push(resolutionContext.originContainer.resolve(argumentName, resolutionContext));
        });

        return new (Function.prototype.bind.apply(referenceTarget, argumets));
    }
}