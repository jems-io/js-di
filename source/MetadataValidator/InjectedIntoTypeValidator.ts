import { ResolutionContext } from '../ResolutionContext'
import { DependencyMetadata } from '../DependencyMetadata'

export default function InjecteIntoType(resolutionContext:ResolutionContext,
                                        dependencyMetadata:DependencyMetadata, 
                                        expectedFunction:Function):boolean {

    return resolutionContext.targetResolutionStack.indexOf(expectedFunction) >= 0;
}