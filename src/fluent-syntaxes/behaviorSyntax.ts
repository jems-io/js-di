import { DependencyMetadata } from '../dependencyMetadata'
import { InAndWhenSyntax } from './inAndWhenSyntax'
import { ServicingStrategy } from '../servicing-strategies/servicingStrategy'
import { WhenSyntax } from './whenSyntax'
import { DeliveryStrategy } from '../delivery-strategies/deliveryStrategy'
import { ResolutionContext } from '../resolutionContext'
import { InstanceServicingStrategy } from '../servicing-strategies/instanceServicingStrategy'
import { BuilderFunctionServicingStrategy } from '../servicing-strategies/builderFunctionServicingStrategy'
import { ConstantServicingStrategy } from '../servicing-strategies/constantServicingStrategy'
import { PerCallDeliveryStrategy } from '../delivery-strategies/perCallDeliveryStrategy'
import { SingletonDeliveryStrategy } from '../delivery-strategies/singletonDeliveryStrategy'
import { PerResolutionDeliveryStrategy } from '../delivery-strategies/perResolutionDeliveryStrategy'
import { ContainerizedDeliveryStrategy } from '../delivery-strategies/containerizedDeliveryStrategy'
import ancestorsAreValidator from '../metadata-validators/ancestorsAreValidator'
import injectedExactlyIntoTypesValidator from '../metadata-validators/injectedExactlyIntoTypesValidator'
import injectedExactlyIntoAliasesValidator from '../metadata-validators/injectedExactlyIntoAliasesValidator'
import injectedIntoTypesValidator from '../metadata-validators/injectedIntoTypesValidator'
import injectedIntoAliasesValidator from '../metadata-validators/injectedIntoAliasesValidator'
import { WithAndAsAndInAndWhenSyntax } from './withAndAsAndInAndWhenSyntax'
import { AsAndInAndWhenSyntax } from './asAndInAndWhenSyntax'
import { Errors } from '..'

/**
 * Represents a syntax that allow setup the dependecy resolution behavior.
 */
export class BehaviorSyntax implements WithAndAsAndInAndWhenSyntax {

    /**
     * Represents the dependency metadata to affect in a fluently way.
     */
  private _dependencyMetadata: DependencyMetadata

    /**
     * Creates a new behavior syntax that allow setup the dependecy resolution behavior.
     * @param dependencyMetadata Represents the dependency metadata to affect in a fluently way.
     */
  constructor (dependencyMetadata: DependencyMetadata) {

    if (!dependencyMetadata.validators) {
      dependencyMetadata.validators = []
    }

    this._dependencyMetadata = dependencyMetadata
  }

    /*********************************
     *  The Dependencies (With Syntax)
     *********************************/

    /**
     * Setup the aliases that will repsents the argument names with the given aliases.
     * @param aliases Represents the aliases that will repsents the argument names.
     * @return A syntax extension to setup the serving, delivery and conditions.
     */
  public with (aliases: string[]): AsAndInAndWhenSyntax {
    if (!this._dependencyMetadata.isArgumentable) {
      throw new Errors.InvalidDataError('Can not add arguments names to a not argumentable dependency.')
    }

    this._dependencyMetadata.argumentsNames = aliases

    return this
  }

     /*********************************
     *  The servicing (As Syntax)
     *********************************/

    /**
     * Setup the current alias bind to be served as an instace.
     * @return A syntax extension to setup the delivery and conditions.
     */
  public asInstance (): InAndWhenSyntax {

    this._dependencyMetadata.servicingStrategy = new InstanceServicingStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be served as the result of the referenced function..
     * @return A syntax extension to setup the delivery and conditions.
     */
  public asBuilderFunction (): InAndWhenSyntax {

    this._dependencyMetadata.servicingStrategy = new BuilderFunctionServicingStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be served as a constant.
     * @return A syntax extension to setup the delivery and conditions.
     */
  public asConstant (): InAndWhenSyntax {

    this._dependencyMetadata.servicingStrategy = new ConstantServicingStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be served with the given servicing strategy.
     * @param servicingStrategy Represents the servicing strategy to serve the reference.
     * @return A syntax extension to setup the delivery and conditions.
     */
  public as (servicingStrategy: ServicingStrategy): InAndWhenSyntax {

    this._dependencyMetadata.servicingStrategy = servicingStrategy

    return this
  }

    /*********************************
     *  The delivery modes (In Syntax)
     *********************************/

    /**
     * Setup the current alias bind to be served in each call.
     * @return A syntax extension to setup conditions.
     */
  public inPerCallMode (): WhenSyntax {

    this._dependencyMetadata.deliveryStrategy = new PerCallDeliveryStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be served once per each resolution process.
     * @return A syntax extension to setup conditions.
     */
  public inPerResolutionMode (): WhenSyntax {

    this._dependencyMetadata.deliveryStrategy = new PerResolutionDeliveryStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be served only once.
     * @return A syntax extension to setup conditions.
     */
  public inSingletonMode (): WhenSyntax {

    this._dependencyMetadata.deliveryStrategy = new SingletonDeliveryStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be served once per container.
     * @return A syntax extension to setup conditions.
     */
  public inContainerizedMode (): WhenSyntax {

    this._dependencyMetadata.deliveryStrategy = new ContainerizedDeliveryStrategy()

    return this
  }

    /**
     * Setup the current alias bind to be delivered with the given delivery strategy.
     * @param deliveryStrategy Represents the delivery strategy to deliver the reference.
     * @return A syntax extension to setup conditions.
     */
  public inMode (deliveryStrategy: DeliveryStrategy): WhenSyntax {

    this._dependencyMetadata.deliveryStrategy = deliveryStrategy

    return this
  }

    /*********************************
     *  The validators (When Syntax)
     *********************************/

    /**
     * Setup the current alias bind to be valid when the target be an ancestor of the given types.
     * @param types Represents the types that must be the ancestor of the bind.
     * @return A syntax extention to setup conditions.
     */
  public whenAncestorsAre (...types: Function[]): WhenSyntax {

    this._dependencyMetadata.validators
                            .push((resolutionContext, dependencyMetadata) => ancestorsAreValidator(resolutionContext, dependencyMetadata, ...types))

    return this
  }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given aliases.
     * @param aliases Represents the aliases where the bind must be injected
     * @return A syntax extention to setup conditions.
     */
  public whenInjectedIntoAliases (...aliases: string[]): WhenSyntax {

    this._dependencyMetadata.validators
                            .push((resolutionContext, dependencyMetadata) => injectedIntoAliasesValidator(resolutionContext, dependencyMetadata, ...aliases))

    return this
  }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given types.
     * @param types Represents the types where the bind must be injected.
     * @return A syntax extention to setup conditions.
     */
  public whenInjectedIntoTypes (...types: Function[]): WhenSyntax {

    this._dependencyMetadata.validators
                            .push((resolutionContext, dependencyMetadata) => injectedIntoTypesValidator(resolutionContext, dependencyMetadata, ...types))

    return this
  }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given aliases.
     * @param aliases Represents the aliases where the bind must be exactly injected
     * @return A syntax extention to setup conditions.
     */
  public whenInjectedExactlyIntoAliases (...aliases: string[]): WhenSyntax {

    this._dependencyMetadata.validators
                            .push((resolutionContext, dependencyMetadata) => injectedExactlyIntoAliasesValidator(resolutionContext, dependencyMetadata, ...aliases))

    return this
  }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given types.
     * @param types Represents the types where the bind must be exactly injected.
     * @return A syntax extention to setup conditions.
     */
  public whenInjectedExactlyIntoTypes (...types: Function[]): WhenSyntax {

    this._dependencyMetadata.validators
                            .push((resolutionContext, dependencyMetadata) => injectedExactlyIntoTypesValidator(resolutionContext, dependencyMetadata, ...types))

    return this
  }

    /**
     * Setup the current alias bind to be valid when the given validator is successfully.
     * @param validator Represents a custom validator.
     * @return A syntax extention to setup conditions.
     */
  public when (validator: (resolutionContext: ResolutionContext, dependencyMetadata: DependencyMetadata) => boolean): WhenSyntax {

    this._dependencyMetadata.validators
                            .push(validator)

    return this
  }
}
