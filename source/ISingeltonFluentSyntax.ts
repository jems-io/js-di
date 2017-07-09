import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IIdentifierReference } from "./IIdentifierReference";

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton..
 * @memberof module:jemsDI
 */
export interface ISingeltonFluentSyntax extends IAliasReference, IIdentifierReference, IKernelReference {
    /**
     * Specify the kernel to serv the object as singelton with the given alias.
     */
    asSingelton():void;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 *
 * @interface ISingeltonFluentSyntax
 * @implements {module:jemsDI.IAliasReference}
 * @implements {module:jemsDI.IIdentifierReference}
 * @implements {module:jemsDI.IKernelReference}
 * @memberof module:jemsDI
 */

    /**
     * Specify the kernel to serv the object as singelton with the given alias.
     * 
     * @method asSingelton
     * @instance
     * @memberof module:jemsDI.ISingeltonFluentSyntax
     */