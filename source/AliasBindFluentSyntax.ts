import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./IKernel";
import { IServicingStrategy } from "./ServicingStrategy/IServicingStrategy";
import contextualActivator from './ContextualActivator'
import { IDeliveryStrategy } from "./DeliveryStrategy/IDeliveryStrategy";

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 * @private
 */
export class AliasBindFluentSyntax implements IAliasBindFluentSyntax {
    private _alias:string;
    private _kernel:IKernel;

    /**
     * Instance a new alias bind fluent syntax connector.
     * @param {string} alias - Represets the alias to bind.
     * @param {string} kernel - Represents the kernel that is binding the alias. 
     */
    constructor(alias:string, kernel:IKernel) {
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
     * @returns {IKernel} The context kernel.
     */
    public getKernel(): IKernel { return this._kernel; }

    /**
     * Register the context alias with an instance servicing strategy.
     * @param {function} reference - Represents the funtion reference to instantiate.
     * @returns {IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    public to(reference:any):IServicingContextFluentSyntax {        
        let servicingStrategy:IServicingStrategy = contextualActivator.getContextInstantiator<any, IServicingStrategy>('instaceServicingStrategy')(null, '');
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<IKernel, IServicingContextFluentSyntax>('servicingContextFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with a constant servicing strategy.
     * @param {any} reference - Represents the reference to return.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toConstant(reference:any):IContainerFluentSyntax {
        let servicingStrategy:IServicingStrategy = contextualActivator.getContextInstantiator<any, IServicingStrategy>('constantServicingStrategy')(null, '');
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<IKernel, IContainerFluentSyntax>('containerFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with a builder function servicing strategy.
     * @param {function} reference - Represents the function that will be invoked to generate the object.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toBuilderFunction(reference:any):IContainerFluentSyntax {
        let servicingStrategy:IServicingStrategy = contextualActivator.getContextInstantiator<any, IServicingStrategy>('builderFunctionServicingStrategy')(null, '');
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<IKernel, IContainerFluentSyntax>('containerFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with the provided servicing strategy.
     * @param reference Reresents the reference to be served.
     * @param servicingStrategy Represents the servicing strategy that will serve the reference.
     * @returns {IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    toCustomServicingStragy(reference:any, servicingStrategy:IServicingStrategy):IServicingContextFluentSyntax {
        let identifier:string = this.registerAliasAndRelated(reference, servicingStrategy);
        return contextualActivator.getContextInstantiator<IKernel, IServicingContextFluentSyntax>('servicingContextFluentSyntax')(this._kernel, identifier);
    }

    private registerAliasAndRelated(related:any, servicingStrategy:IServicingStrategy):string {
        return this.getKernel().getCurrentContainer().registerDependencyMetadata(this.getAlias(), {
            activationReference: related,
            servicingStrategy: servicingStrategy,
            deliveryStrategy: contextualActivator.getContextInstantiator<any, IDeliveryStrategy>('perCallDeliveryStrategy')(null, '')
        });
    }
}