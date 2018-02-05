import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function InjectedExactlyIntoTypes (resolutionContext: ResolutionContext,
                                                 dependencyMetadata: DependencyMetadata,
                                                 ...expectedFunctions: Function[]): boolean {
  return !!expectedFunctions.find((expectedFunction) => {
    let aliasIndex: number = resolutionContext.targetResolutionStack.indexOf(expectedFunction)
    return aliasIndex > 0 && aliasIndex === (resolutionContext.targetResolutionStack.length - 1)
  })
}
