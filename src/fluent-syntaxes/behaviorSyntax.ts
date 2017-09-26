import { AsAndInAndWhenSyntax } from "./asAndInAndWhenSyntax";
import { DependencyMetadata } from "../dependencyMetadata";
import { InAndWhenSyntax } from "./inAndWhenSyntax";
import { ServicingStrategy } from "../servicing-strategies/servicingStrategy";
import { WhenSyntax } from "./whenSyntax";
import { DeliveryStrategy } from "../delivery-strategies/deliveryStrategy";
import { ResolutionContext } from "../resolutionContext";
import { InstanceServicingStrategy } from "../servicing-strategies/instanceServicingStrategy";
import { BuilderFunctionServicingStrategy } from "../servicing-strategies/builderFunctionServicingStrategy";
import { ConstantServicingStrategy } from "../servicing-strategies/constantServicingStrategy";
import { PerCallDeliveryStrategy } from "../delivery-strategies/perCallDeliveryStrategy";
import { SingletonDeliveryStrategy } from "../delivery-strategies/singletonDeliveryStrategy";
import { PerResolutionDeliveryStrategy } from "../delivery-strategies/perResolutionDeliveryStrategy";
import { ContainerizedDeliveryStrategy } from "../delivery-strategies/containerizedDeliveryStrategy";
import ancestoIsValidator from '../metadata-validators/ancestoIsValidator';
import injectedExactlyIntoTypeValidator from '../metadata-validators/injectedExactlyIntoTypeValidator';
import injectedExactlyIntoAliasValidator from '../metadata-validators/injectedExactlyIntoAliasValidator';
import injectedIntoTypeValidator from '../metadata-validators/injectedIntoTypeValidator';
import injectedIntoAliasValidator from '../metadata-validators/injectedIntoAliasValidator';

/**
 * Represents a syntax that allow setup the dependecy resolution behavior.
 */
export class BehaviorSyntax implements AsAndInAndWhenSyntax {

    /**
     * Represents the dependency metadata to affect in a fluently way.
     */
    private _dependencyMetadata:DependencyMetadata;

    /**
     * Creates a new behavior syntax that allow setup the dependecy resolution behavior.
     * @param dependencyMetadata Represents the dependency metadata to affect in a fluently way.
     */
    constructor(dependencyMetadata:DependencyMetadata) {
        this._dependencyMetadata = dependencyMetadata;
    }

     /*********************************
     *  The servicing (As Syntax)
     *********************************/

    /**
     * Setup the current alias bind to be served as an instace.
     * @return A syntax extension to setup the delivery and conditions.
     */
    public asInstance():InAndWhenSyntax {

        this._dependencyMetadata.servicingStrategy = new InstanceServicingStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be served as the result of the referenced function..
     * @return A syntax extension to setup the delivery and conditions.
     */
    public asBuilderFunction():InAndWhenSyntax {

        this._dependencyMetadata.servicingStrategy = new BuilderFunctionServicingStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be served as a constant.
     * @return A syntax extension to setup the delivery and conditions.
     */
    public asConstant():InAndWhenSyntax {

        this._dependencyMetadata.servicingStrategy = new ConstantServicingStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be served with the given servicing strategy.
     * @param servicingStrategy Represents the servicing strategy to serve the reference.
     * @return A syntax extension to setup the delivery and conditions.
     */
    public as(servicingStrategy:ServicingStrategy):InAndWhenSyntax {

        this._dependencyMetadata.servicingStrategy = servicingStrategy;

        return this;
    }

    /*********************************
     *  The delivery modes (In Syntax)
     *********************************/

    /**
     * Setup the current alias bind to be served in each call.
     * @return A syntax extension to setup conditions.
     */
    public inPerCallMode():WhenSyntax {

        this._dependencyMetadata.deliveryStrategy = new PerCallDeliveryStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be served once per each resolution process.
     * @return A syntax extension to setup conditions.
     */
    public inPerResolutionMode():WhenSyntax {

        this._dependencyMetadata.deliveryStrategy = new PerResolutionDeliveryStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be served only once.
     * @return A syntax extension to setup conditions.
     */
    public inSingletonMode():WhenSyntax {

        this._dependencyMetadata.deliveryStrategy = new SingletonDeliveryStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be served once per container.
     * @return A syntax extension to setup conditions.
     */
    public inContainerizedMode():WhenSyntax {

        this._dependencyMetadata.deliveryStrategy = new ContainerizedDeliveryStrategy();

        return this;
    }

    /**
     * Setup the current alias bind to be delivered with the given delivery strategy.
     * @param deliveryStrategy Represents the delivery strategy to deliver the reference.
     * @return A syntax extension to setup conditions.
     */
    public inMode(deliveryStrategy:DeliveryStrategy):WhenSyntax {

        this._dependencyMetadata.deliveryStrategy = deliveryStrategy;

        return this;
    }

    /*********************************
     *  The validators (When Syntax)
     *********************************/

    /**
     * Setup the current alias bind to be valid when the target be an ancestor of the given type.
     * @param type Represents the type that must be the ancestor of the bind.
     * @return A syntax extention to setup conditions.
     */
    public whenAncestorIs(type:Function):WhenSyntax {

        this._dependencyMetadata.validators
                                .push((resolutionContext, dependencyMetadata) => ancestoIsValidator(resolutionContext, dependencyMetadata, type));

        return this;
    }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given alias.
     * @param alias Represents the alias where the bind must be injected
     * @return A syntax extention to setup conditions.
     */
    public whenInjectedIntoAlias(alias:string):WhenSyntax {

        this._dependencyMetadata.validators
                                .push((resolutionContext, dependencyMetadata) => injectedIntoAliasValidator(resolutionContext, dependencyMetadata, alias));

        return this;
    }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given type.
     * @param type Represents the type where the bind must be injected.
     * @return A syntax extention to setup conditions.
     */
    public whenInjectedIntoType(type:Function):WhenSyntax {

        this._dependencyMetadata.validators
                                .push((resolutionContext, dependencyMetadata) => injectedIntoTypeValidator(resolutionContext, dependencyMetadata, type));

        return this;
    }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given alias.
     * @param alias Represents the alias where the bind must be exactly injected
     * @return A syntax extention to setup conditions.
     */
    public whenInjectedExactlyIntoAlias(alias:string):WhenSyntax {

        this._dependencyMetadata.validators
                                .push((resolutionContext, dependencyMetadata) => injectedExactlyIntoAliasValidator(resolutionContext, dependencyMetadata, alias));

        return this;
    }

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given type.
     * @param type Represents the type where the bind must be exactly injected.
     * @return A syntax extention to setup conditions.
     */
    public whenInjectedExactlyIntoType(type:Function):WhenSyntax {

        this._dependencyMetadata.validators
                                .push((resolutionContext, dependencyMetadata) => injectedExactlyIntoTypeValidator(resolutionContext, dependencyMetadata, type));

        return this;
    }

    /**
     * Setup the current alias bind to be valid when the given validator is successfully.
     * @param validator Represents a custom validator.
     * @return A syntax extention to setup conditions.
     */
    public when(validator:(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata) => boolean):WhenSyntax {

        this._dependencyMetadata.validators
                                .push(validator);

        return this;
    }
}