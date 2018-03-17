import { BindSyntax } from './bindSyntax'
import { ToSyntax } from './toSyntax'
import { BehaviorSyntax } from './behaviorSyntax'
import { Kernel } from '../kernel'
import { Container } from '../container'
import { ContainerizedKernel } from '../containerizedKernel'
import { DependencyMetadata } from '../index'
import { ArgumentsNamesProvider } from '../argumentsNamesProvider'
import { BuildInArgumentsNamesProvider } from '../buildInArgumentsNamesProvider'
import { WithAndAsAndInAndWhenSyntax } from './withAndAsAndInAndWhenSyntax'

/**
 * Represents an syntax extention that allow relate aliases to targets and specify containers.
 */
export class RelationSyntax implements BindSyntax, ToSyntax {

    /**
     * Represents the arguments name provider that identify the arguments in a argumentable reference.
     */
  private _argumentsNamesProvider: ArgumentsNamesProvider

    /**
     * Represents the bind alias.
     */
  private _alias: string

    /**
     * Represents the containerized syntax where the bind will be performed.
     */
  private _containerizedKernel: ContainerizedKernel

    /**
     * Creates a new relation syntax that allow relates aliases to targets with the given kernel.
     * @param kernel Reprersents the kernel where the binding is happening.
     */
  constructor (containerizedKernel: ContainerizedKernel) {

    // Resolving it with poors man constructor. :(
    this._argumentsNamesProvider = new BuildInArgumentsNamesProvider()

    this._containerizedKernel = containerizedKernel
  }

    /**
     * Creates a bind for the alias and allow fluently configure it.
     * @param alias Represents the alias to bind.
     * @return A syntax extension to associate the target or setup a container.
     */
  public bind (alias: string): ToSyntax {

    this._alias = alias

    return this
  }

  /**
   * Associate the given target to the current bind.
   * @param reference Represets the target that will be associated to the current bind.
   * @return A syntax extension to setup the dependencies, servicing, delivery and conditions.
   */
  public to (reference: any): WithAndAsAndInAndWhenSyntax {
    let isArgumentable: boolean = this._argumentsNamesProvider.isArgumetable(reference)

    const dependencyMetadata: DependencyMetadata = {
      activationReference: reference,
      isArgumentable: isArgumentable,
      argumentsNames: isArgumentable ? this._argumentsNamesProvider.getArgumentsNames(reference) : []
    }

    let identifier: string = this._containerizedKernel.registerDependencyMetadata(this._alias, dependencyMetadata)

    return new BehaviorSyntax(dependencyMetadata)
  }
}
