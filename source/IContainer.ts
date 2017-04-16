import DependencyMetadata from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */

export interface IContainer {

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    dispose():Promise<void>;
    
    /**
     * Register the dependency metadata that allow container resolve aliases.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    registerDependencyMetadata(dependencyMetadata:DependencyMetadata):Promise<void>;

    /**
     * Unregister the dependency metadata that allow container resolve aliases.
     * @param alias Represents the alias to unregister.
     */
    unregisterDependencyMetadata(alias:string):Promise<void>;

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * @param alias Represents the alias to resolve.
     */
    canResolve(alias:string):Promise<boolean>;

    /**
     * Returns a resolved object instance.
     * @param alias Represents the alias to resolve.
     * @param containerActivator Represents the container activator.
     */
    resolve(alias:string, containerActivator:IContainerActivator):Promise<any>;
}