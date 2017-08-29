import { ResolutionContext } from '../ResolutionContext'
import { DependencyMetadata } from '../DependencyMetadata'

export default function AncestorIs(resolutionContext:ResolutionContext,
                             dependencyMetadata:DependencyMetadata, 
                             expectedAncestor:Function):boolean {

    return dependencyMetadata.activationReference.prototype instanceof expectedAncestor;
}