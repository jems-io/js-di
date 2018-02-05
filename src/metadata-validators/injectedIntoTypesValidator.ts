import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function InjecteIntoTypes (resolutionContext: ResolutionContext,
                                        dependencyMetadata: DependencyMetadata,
                                        ...expectedFunctions: Function[]): boolean {
  return !!expectedFunctions.find(expectedFunction =>
    resolutionContext.targetResolutionStack.indexOf(expectedFunction) >= 0
  )
}
