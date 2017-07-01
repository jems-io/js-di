import { IKernelReference } from "./IKernelReference";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IIdentifierReference } from "./IIdentifierReference";
import { IAliasReference } from "./IAliasReference";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 */
export interface IContainerFluentSyntax extends IAliasReference, IIdentifierReference, IKernelReference {

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     */
    inContainer(containerAlias:string):void;
}