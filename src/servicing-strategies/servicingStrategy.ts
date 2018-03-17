import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '..'

/**
 * Represents a servicing strategy that transform and serve dependency metadata references.
 */
export interface ServicingStrategy {

    /**
     * Serve the result of the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param dependencyMetadata Represents the dependency metadata to transformed.
     * @return The transformed reference target.
     */
  serve (resolutionContext: ResolutionContext , dependencyMetadata: DependencyMetadata): any
}
