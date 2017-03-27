/**
 * Represents a container that contain in an isolated way a set of intances of the activeted objects that only will be activated only a one time, also you can refer to it as a context.
 */
export interface IContainer {

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    dispose():void;
    
    /**
     * Return a instance of the required function type by the given alias.
     * @param alias Represents the alias of the required instance.
     */
    getDependency(alias:string):any;

    /**
     * Set an instance of an objects as a serving object for the given alias.
     * @param alias Represents the alias of the instance to set.
     * @param dependencyInstance Represents the dependency instance to serv.
     */
    setDependency(alias:string, dependencyInstance:any):void;
}