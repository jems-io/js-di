import contextualActivator from '../contextualActivator'

import { ResolutionContext } from "../resolutionContext";
import { ServicingStrategy } from "./servicingStrategy";
import { ServicingError } from "../../source/errors/servicingError"

/**
 * Represents a servicing strategy that transform and serve metadata reference targets as a constant.
 */
export class ConstantServicingStrategy implements ServicingStrategy {
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