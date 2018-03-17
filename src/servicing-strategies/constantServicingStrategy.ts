import { ResolutionContext } from '../resolutionContext'
import { ServicingStrategy } from './servicingStrategy'
import { ServicingError } from '../errors/servicingError'
import { DependencyMetadata } from '..'

/**
 * Represents a servicing strategy that transform and serve dependency metadata references as a constant.
 */
export class ConstantServicingStrategy implements ServicingStrategy {

    /**
     * Serve the result of the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param dependencyMetadata Represents the dependency metadata to transformed.
     * @return The transformed reference target.
     */
  public serve (resolutionContext: ResolutionContext , dependencyMetadata: DependencyMetadata): any {
    if (dependencyMetadata.activationReference === undefined || dependencyMetadata.activationReference === null) {
      throw new ServicingError('The metadata reference target can not be undefined or null')
    }

    return dependencyMetadata.activationReference
  }
}
