/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 */
import { IKernelReference } from "./IKernelReference";

export interface ISingeltonFluentSyntax extends IKernelReference {
    /**
     * Specify the kernel to serv the object as singelton with the given alias.
     */
    inSingelton():void;
}