import { ResolutionContext } from "../ResolutionContext";
import { DependencyMetadata } from "../DependencyMetadata";
import { IDeliveryStrategy } from "./IDeliveryStrategy";
import { DeliveryError } from "../errors/DeliveryError"

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
        if (!resolutionContext)
            throw new DeliveryError('Must provide a valid resolution context.');

        if (!dependencyMetadata)
            throw new DeliveryError('Must provide the depencency metadata to deliver from.');

        if (!dependencyMetadata.activationReference)
            throw new DeliveryError('The provided dependency metadata must have a valid reference.')

        if (!dependencyMetadata.servicingStrategy)
            throw new DeliveryError('The provided dependency metadata must have a valid servicing strategy.')

        return dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference);        
    }
}