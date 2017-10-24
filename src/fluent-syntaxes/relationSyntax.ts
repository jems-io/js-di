import { BindSyntax } from './bindSyntax'
import { InsideAndToSytax } from './insideAndToSytax'
import { ToSyntax } from './toSyntax'
import { AsAndInAndWhenSyntax } from './asAndInAndWhenSyntax'
import { BehaviorSyntax } from './behaviorSyntax'
import { Kernel } from '../kernel'
import { Container } from '../container'

/**
 * Represents an syntax extention that allow relate aliases to targets and specify containers.
 */
export class RelationSyntax implements BindSyntax, InsideAndToSytax {

    /**
     * Represents the kernel where the binding is occurring.
     */
  private _kernel: Kernel

    /**
     * Represents the bind alias.
     */
  private _alias: string

    /**
     * Represents the container that will contain the bind.
     */
  private _containerAlias: string

    /**
     * Creates a new relation syntax that allow relates aliases to targets with the given kernel.
     * @param kernel Reprersents the kernel where the binding is happening.
     */
  constructor (kernel: Kernel) {
    this._kernel = kernel
  }

    /**
     * Creates a bind for the alias and allow fluently configure it.
     * @param alias Represents the alias to bind.
     * @return A syntax extension to associate the target or setup a container.
     */
  public bind (alias: string): InsideAndToSytax {

    this._alias = alias

    return this
  }

    /**
     * Set the current binded alias into the container with the given container alias.
     * @param containerAlias Represents the alias to look for.
     * @return A syntax extension to associate a targer to the current bind.
     */
  public inside (containerAlias: string): ToSyntax {

    this._containerAlias = containerAlias

    return this
  }

    /**
     * Associate the given target to the current bind.
     * @param reference Represets the target that will be associated to the current bind.
     * @return A syntax extension to setup the servicing, delivery and conditions.
     */
  public to (reference: any): AsAndInAndWhenSyntax {

    if (this._containerAlias && !this._kernel.hasContainer(this._containerAlias)) {
      this._kernel.createContainer(this._containerAlias)
    }

    let container: Container = this._kernel.getContainer(this._containerAlias || 'default')

    let identifier: string = container.registerDependencyMetadata(this._alias, {
      activationReference: reference,
      deliveryStrategy: this._kernel.getConfiguration().defaultDeliveryStrategy,
      servicingStrategy: this._kernel.getConfiguration().defaultServicingStrategy,
      validators: []
    })

    return new BehaviorSyntax(container.getDependencyMetadataWithIdentifier(identifier))
  }
}
