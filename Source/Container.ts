import { DependencyMetadata } from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";
import { IContainer } from "./IContainer";

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */

export class Container implements IContainer {

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    dispose():void;
    
    /**
     * Register the dependency metadata that allow container resolve aliases.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    registerDependencyMetadata(dependencyMetadata:DependencyMetadata):void;

    /**
     * Unregister the dependency metadata that allow container resolve aliases.
     * @param alias Represents the alias to unregister.
     */
    unregisterDependencyMetadata(alias:string):void;

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * @param alias Represents the alias to resolve.
     */
    canResolve(alias:string):boolean

    /**
     * Returns a resolved object instance.
     * @param alias Represents the alias to resolve.
     */
    resolve(alias:string):boolean

    /**
     * Return tha container activator that allow the container activate objects.
     */
    activator():IContainerActivator;
}