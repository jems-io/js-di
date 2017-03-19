/**
 * Represents a container that contain in an isolated way a set of intances of the activeted objects, aso can refer to it as a context.
 */
export interface IContainer {

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    dispose():void;    
}