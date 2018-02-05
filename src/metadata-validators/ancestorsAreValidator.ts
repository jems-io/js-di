import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function AncestorsAre (resolutionContext: ResolutionContext,
                                     dependencyMetadata: DependencyMetadata,
                                     ...expectedAncestors: Function[]): boolean {
  return !!expectedAncestors.find(
    expectedAncestor => dependencyMetadata.activationReference.prototype instanceof expectedAncestor
  )
}
