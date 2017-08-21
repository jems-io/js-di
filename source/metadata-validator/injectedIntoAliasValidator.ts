import { ResolutionContext } from '../ResolutionContext'
import { DependencyMetadata } from '../DependencyMetadata'

export default function InjecteIntoAlias(resolutionContext:ResolutionContext,
                                         dependencyMetadata:DependencyMetadata, 
                                         expectedAlias:string):boolean {

    return resolutionContext.aliasResolutionStack.indexOf(expectedAlias) >= 0;
}