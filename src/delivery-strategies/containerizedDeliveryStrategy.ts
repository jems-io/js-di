import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'
import { DeliveryStrategy } from './deliveryStrategy'
import { DeliveryError } from '../errors/deliveryError'
import { Container } from '../container'

/**
 * Represenst an strategy to deliver a new instance targets per container with an specific strategy.
 */
export class ContainerizedDeliveryStrategy implements DeliveryStrategy {

  private _containerInstanceMap: {containerAlias: string, instance: any}[]

  constructor () {
    this._containerInstanceMap = []
  }

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

    if (!resolutionContext.originContainerAlias) {
      throw new DeliveryError('The provided resolution context must have a valid origin container alias.')
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

    let map = this._containerInstanceMap.find(map => map.containerAlias === resolutionContext.originContainerAlias)
    let servingResult: any

    if (!map) {
      servingResult = dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference)
      this._containerInstanceMap.push({ containerAlias: resolutionContext.originContainerAlias, instance: servingResult })
    } else {
      servingResult = map.instance
    }

    return servingResult
  }
}
