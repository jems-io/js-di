import { AliasReference } from "./aliasReference";
import { KernelReference } from "./kernelReference";
import { ServicingContextFluentSyntax } from "./servicingContextFluentSyntax";
import { ContainerFluentSyntax } from "./containerFluentSyntax";
import { ServicingStrategy } from "./servicing-strategies/servicingStrategy"

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 */
export interface AliasBindFluentSyntax extends AliasReference, KernelReference {
    
    /**
     * Register the context alias with an instance servicing strategy.
     * @returns {ServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    to(reference:any):ServicingContextFluentSyntax;

    /**
     * Register the context alias with a constant servicing strategy.
     * @returns {ContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toConstant(reference:any):ContainerFluentSyntax;

    /**
     * Register the context alias with a builder function servicing strategy.
     * @returns {ContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toBuilderFunction(reference:any):ContainerFluentSyntax;

    /**
     * Register the context alias with the provided servicing strategy.
     * @param reference Reresents the reference to be served.
     * @param servicingStrategy Represents the servicing strategy that will serve the reference.
     * @returns {ServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    toCustomServicingStragy(reference:any, servicingStrategy:ServicingStrategy):ServicingContextFluentSyntax;
}