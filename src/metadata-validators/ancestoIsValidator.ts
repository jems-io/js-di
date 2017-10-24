import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function AncestorIs (resolutionContext: ResolutionContext,
                             dependencyMetadata: DependencyMetadata,
                             expectedAncestor: Function): boolean {

  return dependencyMetadata.activationReference.prototype instanceof expectedAncestor
}
