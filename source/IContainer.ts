import DependencyMetadata from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */

export interface IContainer {

    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * @param alias Represents the alias.
     * @param dependencyMetadata Represents the dependency metadata.
     * @returns Returns the dependency metadata generated identifier.
     */
    registerDependencyMetadata(alias:string, dependencyMetadata:DependencyMetadata):Promise<string>;

     /**
     * Returns the registered dependencies metadata with the given alias.
     * @param alias Represents the alias to look for.
     * @returns Returns an array of dependencies metadata with the given alias.
     */
    getDependenciesMetadataWithAlias(alias:string):Promise<DependencyMetadata[]>;

    /**
     * Returns the registered dependency metadata with the given alias and identifier.
     * @param alias Represents the alias to look for.
     * @param identifier Represents the identifier to look for.
     * @returns Return dependency metadata with the given identifier.    
     */
    getDependencyMetadataWithIdentifier(alias:string, identifier:string):Promise<DependencyMetadata>;

    /**
     * Unregister all registered dependencies metadata with the given alias.
     * @param alias Represents the alias to to look for.
     */
    unregisterDependenciesMetadataWithAlias(alias:string):Promise<void>;

    /**
     * Unregister the dependency metadata with the given alias and identifier.
     * @param alias Represents the alias to look for.
     * @param identifier Represents the identifier to look for.
     */
    unregisterDependencyMetadataWithIdentifier(alias:string, identifier:string):Promise<void>;

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

    /**
     * Set a list of container alias that will support the container resolutions.
     * @param aliases Represents the list of container alias that support the container.
     */
    setSupportContainersAlias(aliases:string[]):Promise<void>;

    /**
     * Clean the list of support container alias.
     */
    cleanSupportContainersAlias():Promise<void>;

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    dispose():Promise<void>;
}