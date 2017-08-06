import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IIdentifierReference } from "./IIdentifierReference";

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 */
export interface ISingeltonFluentSyntax extends IAliasReference, IIdentifierReference, IKernelReference {
    /**
     * Specify the kernel to serv the object as singelton with the given alias.
     */
    asSingelton():void;
}