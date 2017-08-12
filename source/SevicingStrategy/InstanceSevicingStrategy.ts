import { ResolutionContext } from "../ResolutionContex";
import { ISevicingStrategy } from "./ISevicingStrategy";

/**
 * Represents a servicing strategy that transform and serve metadata reference targets as an instance.
 */
export class InstanceSevicingStrategy implements ISevicingStrategy {

    /**
     * Instantiate and serve the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param referenceTarget Represents the reference target to instantiate.
     * @return The instantiated reference target.
     */
    public serve(resolutionContext:ResolutionContext , referenceTarget:any):any {
        
    }
}