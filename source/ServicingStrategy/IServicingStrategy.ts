import { ResolutionContext } from "../ResolutionContex";

/**
 * Represents a servicing strategy that transform and serve metadata reference targets.
 */
export interface IServicingStrategy {

    /**
     * Serve the result of the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param referenceTarget Represents the reference target to transforme.
     * @return The transformed reference target.
     */
    serve(resolutionContext:ResolutionContext , referenceTarget:any):any;
}