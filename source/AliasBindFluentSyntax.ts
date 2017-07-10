import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./Ikernel";
import { ServicingStrategy } from "./ServicingStrategy";
import { ContainerFluentSyntax } from "./ContainerFluentSyntax";
import { ServicingContextFluentSyntax } from "./ServicingContextFluentSyntax";

class AliasBindFluentSyntax implements IAliasBindFluentSyntax {
    private _alias:string;
    private _kernel:IKernel;

    /**
     * Instance a new alias bind fluent syntax connector.
     * 
     * @class
     * @name AliasBindFluentSyntax
     * @classdesc Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
     * @implements {module:jemsDI.IAliasBindFluentSyntax}
     * @memberof module:jemsDI
     * @param {string} alias - Represets the alias to bind.
     * @param {string} kernel - Represents the kernel that is binding the alias. 
     */
    constructor(alias:string, kernel:IKernel) {
        this._alias = alias;
        this._kernel = kernel;
    }
    
    /**
     * Returns the alias.
     * 
     * @instance
     * @method getAlias
     * @memberof module:jemsDI.AliasBindFluentSyntax
     * @returns {string} The context alias.
     */
    public getAlias(): string { return this._alias; }

    /**
     * Returns the kernel.
     * 
     * @instance
     * @method getKernel
     * @memberof module:jemsDI.AliasBindFluentSyntax
     * @returns {module:jemsDI.IKernel} The context kernel.
     */
    public getKernel(): IKernel { return this._kernel; }

    /**
     * Register the context alias with an instance servicing strategy.
     * 
     * @instance
     * @method to
     * @memberof module:jemsDI.AliasBindFluentSyntax
     * @param {function} funtionReference - Represents the funtion reference to instantiate.
     * @returns {module:jemsDI.IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    public to(funtionReference:any):IServicingContextFluentSyntax {
        
        return new ServicingContextFluentSyntax(this.getAlias(),
                                              this.registerAliasAndRelated(funtionReference, ServicingStrategy.INSTANCE),
                                              this.getKernel());
    }

    /**
     * Register the context alias with a constant servicing strategy.
     * 
     * @instance
     * @method toConstant
     * @memberof module:jemsDI.AliasBindFluentSyntax
     * @param {any} object - Represents the object to return.
     * @returns {module:jemsDI.IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toConstant(object:any):IContainerFluentSyntax {
        
        return new ContainerFluentSyntax(this.getAlias(),
                                         this.registerAliasAndRelated(object, ServicingStrategy.CONSTANT),
                                         this.getKernel());
    }

    /**
     * Register the context alias with a builder function servicing strategy.
     * 
     * @instance
     * @method toBuilderFunction
     * @memberof module:jemsDI.AliasBindFluentSyntax
     * @param {function} builder - Represents the function that will be invoked to generate the object.
     * @returns {module:jemsDI.IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    public toBuilderFunction(builder:any):IContainerFluentSyntax {
        
        return new ContainerFluentSyntax(this.getAlias(),
                                         this.registerAliasAndRelated(builder, ServicingStrategy.BUILDER_FUNCTION),
                                         this.getKernel());
    }

    private registerAliasAndRelated(related:any, servicingStrategy:ServicingStrategy):string {
        return this.getKernel().getCurrentContainer().registerDependencyMetadata(this.getAlias(), {
            activationReference: related,
            servicingStrategy: servicingStrategy,
            activateAsSingelton: false
        });
    }
}

export { AliasBindFluentSyntax as AliasBindFluentSyntax };