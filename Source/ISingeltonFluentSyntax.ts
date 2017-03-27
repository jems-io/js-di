/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 */
export interface ISingeltonFluentSyntax {
    /**
     * Specify the kernel to activate this particular type in the container with the given alias.
     */
    inSingelton():void;
}