import { ResolutionContext } from '../resolutionContext'
import { ServicingStrategy } from './servicingStrategy'
import { ServicingError } from '../errors/servicingError'
import { DependencyMetadata } from '..'

/**
 * Represents a servicing strategy that transform and serve dependency metadata references as an instance.
 */
export class InstanceServicingStrategy implements ServicingStrategy {

    /**
     * Serve the result of the given reference target transformation.
     * @param resolutionContext Represents the resolution context of the servicing.
     * @param dependencyMetadata Represents the dependency metadata to transformed.
     * @return The transformed reference target.
     */
  public serve (resolutionContext: ResolutionContext , dependencyMetadata: DependencyMetadata): any {
    if (!dependencyMetadata.isArgumentable) {
      throw new ServicingError(`The provided metadata reference target of type [${typeof dependencyMetadata.activationReference}], is not argumentable.`)
    }

    let argumets: any[] = [null]

    dependencyMetadata.argumentsNames.forEach((argumentName) => {
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

    return new (Function.prototype.bind.apply(dependencyMetadata.activationReference, argumets))()
  }
}
