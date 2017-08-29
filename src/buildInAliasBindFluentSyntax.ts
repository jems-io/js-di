import { ServicingContextFluentSyntax } from "./servicingContextFluentSyntax";
import { ContainerFluentSyntax } from "./containerFluentSyntax";
import { AliasBindFluentSyntax } from "./aliasBindFluentSyntax";
import { Kernel } from "./kernel";
import { ServicingStrategy } from "./servicing-strategies/servicingStrategy";
import contextualActivator from './contextualActivator'
import { DeliveryStrategy } from "./delivery-strategies/deliveryStrategy";

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 * @private
 */
export class BuildInAliasBindFluentSyntax implements AliasBindFluentSyntax {
    private _alias:string;
    private _kernel:Kernel;

    /**
     * Instance a new alias bind fluent syntax connector.
     * @param {string} alias - Represets the alias to bind.
     * @param {string} kernel - Represents the kernel that is binding the alias. 
     */
    constructor(alias:string, kernel:Kernel) {
        this._alias = alias;
        this._kernel = kernel;
    }
    
    /**
     * Returns the alias.
     * @returns {string} The context alias.
     */
    public getAlias(): string { return this._alias; }

    /**
     * Returns the kernel.
     * @returns {Kernel} The context kernel.
     */
    public getKernel(): Kernel { return this._kernel; }

    /**
     * Register the context alias with an instance servicing strategy.
     * @param {function} reference - Represents the funtion reference to instantiate.
     * @returns {ServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    public to(reference:any):ServicingContextFluentSyntax {        
        let servicingStrategy:ServicingStrategy = contextualActivator.getContextInstantiator<any, ServicingStrategy>('instanceServicingStrategy')(null, '');
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<Kernel, ServicingContextFluentSyntax>('servicingContextFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with a constant servicing strategy.
     * @param {any} reference - Represents the reference to return.
     * @returns {ContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toConstant(reference:any):ContainerFluentSyntax {
        let servicingStrategy:ServicingStrategy = contextualActivator.getContextInstantiator<any, ServicingStrategy>('constantServicingStrategy')(null, '');
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<Kernel, ContainerFluentSyntax>('containerFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with a builder function servicing strategy.
     * @param {function} reference - Represents the function that will be invoked to generate the object.
     * @returns {ContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toBuilderFunction(reference:any):ContainerFluentSyntax {
        let servicingStrategy:ServicingStrategy = contextualActivator.getContextInstantiator<any, ServicingStrategy>('builderFunctionServicingStrategy')(null, '');
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<Kernel, ContainerFluentSyntax>('containerFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with the provided servicing strategy.
     * @param reference Reresents the reference to be served.
     * @param servicingStrategy Represents the servicing strategy that will serve the reference.
     * @returns {ServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    toCustomServicingStragy(reference:any, servicingStrategy:ServicingStrategy):ServicingContextFluentSyntax {
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<Kernel, ServicingContextFluentSyntax>('servicingContextFluentSyntax')(this._kernel, identifier);
    }

    private registerAliasAndRelated(related:any, servicingStrategy:ServicingStrategy):string {
        return this.getKernel().getCurrentContainer().registerDependencyMetadata(this.getAlias(), {
            activationReference: related,
            servicingStrategy: servicingStrategy,
            deliveryStrategy: contextualActivator.getContextInstantiator<any, DeliveryStrategy>('perCallDeliveryStrategy')(null, ''),
            validators: []
        });
    }
}