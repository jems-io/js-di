import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./IKernel";
import { ServicingStrategy } from "./ServicingStrategy";
import contextualActivator from './ContextualActivator'

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
     * @param {function} funtionReference - Represents the funtion reference to instantiate.
     * @returns {IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    public to(funtionReference:any):IServicingContextFluentSyntax {        
        let identifier:string = this.registerAliasAndRelated(funtionReference, ServicingStrategy.INSTANCE);
        return contextualActivator.getContextInstantiator<IKernel, IServicingContextFluentSyntax>('servicingContextFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with a constant servicing strategy.
     * @param {any} object - Represents the object to return.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toConstant(object:any):IContainerFluentSyntax {
        let identifier:string = this.registerAliasAndRelated(object, ServicingStrategy.CONSTANT);
        return contextualActivator.getContextInstantiator<IKernel, IContainerFluentSyntax>('containerFluentSyntax')(this._kernel, identifier);
    }

    /**
     * Register the context alias with a builder function servicing strategy.
     * @param {function} builder - Represents the function that will be invoked to generate the object.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toBuilderFunction(builder:any):IContainerFluentSyntax {
        let identifier:string = this.registerAliasAndRelated(builder, ServicingStrategy.BUILDER_FUNCTION);
        return contextualActivator.getContextInstantiator<IKernel, IContainerFluentSyntax>('containerFluentSyntax')(this._kernel, identifier);
    }

    private registerAliasAndRelated(related:any, servicingStrategy:ServicingStrategy):string {
        return this.getKernel().getCurrentContainer().registerDependencyMetadata(this.getAlias(), {
            activationReference: related,
            servicingStrategy: servicingStrategy,
            activateAsSingelton: false
        });
    }
}