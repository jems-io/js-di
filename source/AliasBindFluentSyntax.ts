import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServingContextFluentSyntax } from "./IServingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 */
export class AliasBindFluentSyntax implements IAliasBindFluentSyntax {
    /**
     * Register the alias with a instance serving strategy.
     * @param Represents the type to instantiate.
     */
    public To(type:any):IServingContextFluentSyntax {
        
    }

    /**
     * Register the alias with a constant serving strategy.
     * @param Represents the object to return.
     */
    public ToConstant(onject:any):IContainerFluentSyntax;

    /**
     * Register the alias with a builder function serving strategy.
     * @param Represents the function that will be invoked to generate the object.
     */
    public ToBuilderFunction(builder:any):IContainerFluentSyntax;

    public get alias(): string {
        throw new Error('Method not implemented.');
    }
    public kernel(): IKernel {
        throw new Error('Method not implemented.');
    }
}