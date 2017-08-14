import { IServicingStrategy } from "./ServicingStrategy/IServicingStrategy";
import { IDeliveryStrategy } from "./DeliveryStrategy/IDeliveryStrategy"
         
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
}