import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'
import { DeliveryStrategy } from './deliveryStrategy'
import { DeliveryError } from '../errors/deliveryError'

/**
 * Represenst an strategy to deliver the same instance targets with an specific strategy.
 */
export class SingletonDeliveryStrategy implements DeliveryStrategy {

    /**
     * Represents a boolean value specifying if the target has been served.
     */
  private _isServed: boolean

    /**
     * Represets an instance of the target.
     */
  private _instance: any

    /**
     * Deliver the transformed reference in the provided dependency metadata.
     * @param resolutionContext Represents the context in which the request was made.
     * @param dependencyMetadata Represents the dependency metadata that will be delivered.
     * @return The transformed reference.
     */
  public deliver (resolutionContext: ResolutionContext, dependencyMetadata: DependencyMetadata): any {
    if (!resolutionContext) {
      throw new DeliveryError('Must provide a valid resolution context.')
    }

    if (!dependencyMetadata) {
      throw new DeliveryError('Must provide the depencency metadata to deliver from.')
    }

    if (!dependencyMetadata.activationReference) {
      throw new DeliveryError('The provided dependency metadata must have a valid reference.')
    }

    if (!dependencyMetadata.servicingStrategy) {
      throw new DeliveryError('The provided dependency metadata must have a valid servicing strategy.')
    }

    if (!this._isServed) {
      this._instance = dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference)
      this._isServed = true
    }

    return this._instance
  }
}
