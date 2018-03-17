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
  servicingStrategy?: ServicingStrategy

    /**
     * Get or set the delivery strategy.
     */
  deliveryStrategy?: DeliveryStrategy

    /**
     * Get or set a boolean value specifying if the activation reference is argumentable.
     */
  isArgumentable: boolean

    /**
     * Get or set the arguments names which are the aliases that will be used to resolve
     * the dependency metadata dependencies in the construction or invokation
     * of an argumentable activation reference.
     */
  argumentsNames: string[]

    /**
     * Represents the validators that determine if the metadata is valid for the resolution.
     */
  validators?: ((resolutionContext: ResolutionContext,
                 dependencyMetadata: DependencyMetadata) => boolean)[]
}
