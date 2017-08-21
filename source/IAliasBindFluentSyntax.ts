import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IServicingStrategy } from "./servicing-strategy/IServicingStrategy"

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 */
export interface IAliasBindFluentSyntax extends IAliasReference, IKernelReference {
    
    /**
     * Register the context alias with an instance servicing strategy.
     * @returns {IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    to(reference:any):IServicingContextFluentSyntax;

    /**
     * Register the context alias with a constant servicing strategy.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toConstant(reference:any):IContainerFluentSyntax;

    /**
     * Register the context alias with a builder function servicing strategy.
     * @returns {IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toBuilderFunction(reference:any):IContainerFluentSyntax;

    /**
     * Register the context alias with the provided servicing strategy.
     * @param reference Reresents the reference to be served.
     * @param servicingStrategy Represents the servicing strategy that will serve the reference.
     * @returns {IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    toCustomServicingStragy(reference:any, servicingStrategy:IServicingStrategy):IServicingContextFluentSyntax;
}