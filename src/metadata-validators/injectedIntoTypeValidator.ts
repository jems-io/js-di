import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function InjecteIntoType(resolutionContext:ResolutionContext,
                                        dependencyMetadata:DependencyMetadata, 
                                        expectedFunction:Function):boolean {

    return resolutionContext.targetResolutionStack.indexOf(expectedFunction) >= 0;
}