import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function InjecteIntoAlias(resolutionContext:ResolutionContext,
                                         dependencyMetadata:DependencyMetadata, 
                                         expectedAlias:string):boolean {

    return resolutionContext.aliasResolutionStack.indexOf(expectedAlias) >= 0;
}