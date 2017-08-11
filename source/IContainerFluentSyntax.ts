import { IKernelReference } from "./IKernelReference";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IIdentifierReference } from "./IIdentifierReference";
import { IAliasReference } from "./IAliasReference";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 */
export interface IContainerFluentSyntax extends IIdentifierReference, IKernelReference {

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */
    inContainer(containerAlias:string):void;
}