import { ServicingStrategy } from './servicing-strategies/servicingStrategy'
import { DeliveryStrategy } from './delivery-strategies/deliveryStrategy'
import { ResolutionContext } from './resolutionContext'

/**
 * Represents the alias metadata that contain the activation and servicing information of the alias.
 */
export class DependencyMetadata {
    /**
     * Get or set the activation reference, it can be a function type, object instance, function buildier and so on.
     */
  activationReference: any

    /**
     * Get or set the servicing strategy.
     */
  servicingStrategy: ServicingStrategy

    /**
     * Get or set the delivery strategy.
     */
  deliveryStrategy: DeliveryStrategy

    /**
     * Represents the validators that determine if the metadata is valid for the resolution.
     */
  validators: ((resolutionContext: ResolutionContext,
                dependencyMetadata: DependencyMetadata) => boolean)[]
}
