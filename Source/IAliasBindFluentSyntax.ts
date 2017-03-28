import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 */
export interface IAliasBindFluentSyntax extends IAliasReference, IKernelReference {
    
    /**
     * Register the alias with a instance serving strategy.
     * @param Represents the type to instantiate.
     */
    To(type:any):void;

    /**
     * Register the alias with a constant serving strategy.
     * @param Represents the object to return.
     */
    ToConstant(onject:any):void;

    /**
     * Register the alias with a builder function serving strategy.
     * @param Represents the function that will be invoked to generate the object.
     */
    ToBuilderFunction(builder:any):void
}