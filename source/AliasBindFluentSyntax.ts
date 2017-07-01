import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServingContextFluentSyntax } from "./IServingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./Ikernel";
import { ServicingStrategy } from "./ServicingStrategy";
import ContainerFluentSyntax from "./ContainerFluentSyntax";

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 */
export default class AliasBindFluentSyntax implements IAliasBindFluentSyntax {
    
    private _alias:string;
    private _kernel:IKernel;

    /**
     * Instance a new alias bind fluent syntax connector.
     * @param alias Represets the alias to bind.
     * @param kernel Represents the kernel that is binding the alias.
     */
    constructor(alias:string, kernel:IKernel) {
        this._alias = alias;
        this._kernel = kernel;
    }
    
    /**
     * Returns the alias name.
     */
    public getAlias(): string { return this._alias; }

    /**
     * Returns the kernel.
     */
    public getKernel(): IKernel { return this._kernel; }

    /**
     * Register the alias with a instance serving strategy.
     * @param Represents the funtion reference to instantiate.
     */
    public to(funtionReference:any):IServingContextFluentSyntax {
        
        this.registerAliasAndRelated(funtionReference, ServicingStrategy.INSTANCE);
        return null;
    }

    /**
     * Register the alias with a constant serving strategy.
     * @param Represents the object to return.
     */
    public toConstant(object:any):IContainerFluentSyntax {
        
        return new ContainerFluentSyntax(this.getAlias(),
                                         this.registerAliasAndRelated(object, ServicingStrategy.CONSTANT),
                                         this.getKernel());
    }

    /**
     * Register the alias with a builder function serving strategy.
     * @param Represents the function that will be invoked to generate the object.
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