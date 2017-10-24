import { ResolutionContext } from '../resolutionContext'
import { ServicingStrategy } from './servicingStrategy'
import { ArgumentsNamesProvider } from '../argumentsNamesProvider'
import { ServicingError } from '../errors/servicingError'
import { BuildInArgumentsNamesProvider } from '../buildInArgumentsNamesProvider'

/**
 * Represents a servicing strategy that transform and serve metadata reference targets as the result of an invokation.
 */
export class BuilderFunctionServicingStrategy implements ServicingStrategy {
    /**
     * Represents the arguments name provider that identify the arguments in a argumentable reference.
     */
  private _argumentsNamesProvider: ArgumentsNamesProvider

    /**
     * Instantiate a new builer function servicing strategy.
     */
  constructor () {
        // Resolving it with poors man constructor. :(
    this._argumentsNamesProvider = new BuildInArgumentsNamesProvider()
  }

    /**
     * Invoke and serve the result of the invokation of the given reference target.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param referenceTarget Represents the reference target to invoke.
     * @return The result of the invokation of the reference target.
     */
  public serve (resolutionContext: ResolutionContext , referenceTarget: any): any {
    if (!this._argumentsNamesProvider.isArgumetable(referenceTarget)) {
      throw new ServicingError(`The provided metadata reference target of type [${typeof referenceTarget}], is not argumentable.`)
    }

    let argumetsNames: string[] = this._argumentsNamesProvider.getArgumentsNames(referenceTarget)
    let argumets: any[] = []

    argumetsNames.forEach((argumentName) => {

      let argument: any

      if (resolutionContext &&
                resolutionContext.resolutionOption &&
                resolutionContext.resolutionOption.dependencies &&
                resolutionContext.resolutionOption.dependencies[argumentName]) {
        argument = resolutionContext.resolutionOption.dependencies[argumentName]
      } else {
        argument = resolutionContext.kernel.usingContainer(resolutionContext.originContainerAlias).resolveWithContext(argumentName, resolutionContext)
      }

      argumets.push(argument)
    })

    return referenceTarget.call(null, argumets)
  }
}
