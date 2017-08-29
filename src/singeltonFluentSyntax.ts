import { KernelReference } from "./kernelReference";
import { IdentifierReference } from "./identifierReference";

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 */
export interface SingeltonFluentSyntax extends IdentifierReference, KernelReference {
    /**
     * Specify the kernel to serv the object as singelton with the given alias.
     */
    asSingelton():void;
}