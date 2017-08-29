import { KernelReference } from "./kernelReference";
import { IdentifierReference } from "./identifierReference";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 */
export interface ContainerFluentSyntax extends IdentifierReference, KernelReference {

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */
    inContainer(containerAlias:string):void;
}