import { IKernelReference } from "./IKernelReference";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 */
export interface IContainerFluentSyntax extends IKernelReference {

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     */
    inContainer(containerAlias:string):void;
}