import contextualActivator from '../ContextualActivator'

import { ResolutionContext } from "../ResolutionContex";
import { ISevicingStrategy } from "./ISevicingStrategy";
import { IArgumentsNamesProvider } from "../IArgumentsNamesProvider";
import { ServicingError } from "../../source/Errors/ServicingError"

/**
 * Represents a servicing strategy that transform and serve metadata reference targets as a constant.
 */
export class ConstantSevicingStrategy implements ISevicingStrategy {
    /**
     * Instantiate and serve the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param referenceTarget Represents the reference target to serve.
     * @return The reference target.
     */
    public serve(resolutionContext:ResolutionContext , referenceTarget:any):any {
        if (referenceTarget === undefined || referenceTarget === null)
            throw new ServicingError('The metadata reference target can not be undefined or null');

        return referenceTarget;       
    }
}