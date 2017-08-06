import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 */
export interface IAliasBindFluentSyntax extends IAliasReference, IKernelReference {
    
    /**
     * Register the context alias with an instance servicing strategy.
     * @returns {IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    to(functionReference:any):IServicingContextFluentSyntax;

    /**
     * Register the context alias with a constant servicing strategy.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toConstant(onject:any):IContainerFluentSyntax;

    /**
     * Register the context alias with a builder function servicing strategy.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toBuilderFunction(builder:any):IContainerFluentSyntax;
}