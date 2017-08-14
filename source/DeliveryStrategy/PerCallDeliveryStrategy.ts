import { ResolutionContext } from "../ResolutionContext";
import { DependencyMetadata } from "../DependencyMetadata";
import { IDeliveryStrategy } from "./IDeliveryStrategy";

/**
 * Represenst an strategy to deliver a new instance targets with an specific strategy.
 */
export class PerCallDeliveryStrategy implements IDeliveryStrategy {
    /**
     * Deliver the transformed reference in the provided dependency metadata.
     * @param resolutionContext Represents the context in which the request was made.
     * @param dependencyMetadata Represents the dependency metadata that will be delivered.
     * @return The transformed reference.
     */
    public deliver(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata):any {
        return dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference);        
    }
}