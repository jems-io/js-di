import { ResolutionContext } from '../ResolutionContext'
import { DependencyMetadata } from '../DependencyMetadata'

export default function InjectedExactlyIntoAlias(resolutionContext:ResolutionContext,
                                                 dependencyMetadata:DependencyMetadata, 
                                                 expectedAlias:string):boolean {

    let aliasIndex:number = resolutionContext.aliasResolutionStack.indexOf(expectedAlias);
    return aliasIndex > 0 && aliasIndex == (resolutionContext.aliasResolutionStack.length - 1);
}