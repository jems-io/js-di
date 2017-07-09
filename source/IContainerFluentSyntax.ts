import { IKernelReference } from "./IKernelReference";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IIdentifierReference } from "./IIdentifierReference";
import { IAliasReference } from "./IAliasReference";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 * 
 * @memberof module:jemsDI
 */
export interface IContainerFluentSyntax extends IAliasReference, IIdentifierReference, IKernelReference {

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * 
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */
    inContainer(containerAlias:string):void;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 * 
 * @interface IContainerFluentSyntax
 * @implements {module:jemsDI.IAliasReference}
 * @implements {module:jemsDI.IIdentifierReference}
 * @implements {module:jemsDI.IKernelReference}
 * @memberof module:jemsDI
 */

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * 
     * @method inContainer
     * @instance
     * @memberof module:jemsDI.IContainerFluentSyntax
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */




