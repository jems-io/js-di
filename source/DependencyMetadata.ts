import { IServicingStrategy } from "./servicing-strategy/IServicingStrategy";
import { IDeliveryStrategy } from "./delivery-strategy/IDeliveryStrategy"
import { ResolutionContext } from "./ResolutionContext";

/**
 * Represents the alias metadata that contain the activation and servicing information of the alias.
 */
export class DependencyMetadata {
    /**
     * Get or set the activation reference, it can be a function type, object instance, function buildier and so on.
     */
    activationReference:any;

    /**
     * Get or set the servicing strategy.
     */
    servicingStrategy:IServicingStrategy;

    /**
     * Get or set the delivery strategy.
     */
    deliveryStrategy:IDeliveryStrategy;

    /**
     * Represents the validators that determine if the metadata is valid for the resolution.
     */
    validators:((resolutionContext:ResolutionContext,
                dependencyMetadata:DependencyMetadata) => boolean)[]
}