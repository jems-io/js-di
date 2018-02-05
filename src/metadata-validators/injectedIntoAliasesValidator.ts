import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

export default function InjecteIntoAliases (resolutionContext: ResolutionContext,
                                         dependencyMetadata: DependencyMetadata,
                                         ...expectedAliases: string[]): boolean {
  return !!expectedAliases.find(expectedAlias =>
    resolutionContext.aliasResolutionStack.indexOf(expectedAlias) >= 0
  )
}
