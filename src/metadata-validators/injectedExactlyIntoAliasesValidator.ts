import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function InjectedExactlyIntoAliases (resolutionContext: ResolutionContext,
                                                    dependencyMetadata: DependencyMetadata,
                                                    ...expectedAliases: string[]): boolean {
  return !!expectedAliases.find((expectedAlias) => {
    let aliasIndex: number = resolutionContext.aliasResolutionStack.indexOf(expectedAlias)
    return aliasIndex > 0 && aliasIndex === (resolutionContext.aliasResolutionStack.length - 1)
  })
}
