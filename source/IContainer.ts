import { DependencyMetadata } from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 * 
 * @memberof module:jemsDI
 */
export interface IContainer {

    /**
     * Returns the name of the container.
     * 
     * @method getName
     * @instance
     * @memberof module:jemsDI.IContainer
     * @returns {string} The name of the kernel.
     */
     getName():string;

    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * 
     * @method registerDependencyMetadata
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias.
     * @param {module:jemsDI.DependencyMetadata} dependencyMetadata Represents the dependency metadata.
     * @returns {string} Returns the dependency metadata generated identifier.
     */
    registerDependencyMetadata(alias:string, dependencyMetadata:DependencyMetadata):string;

     /**
     * Returns the registered dependencies metadata with the given alias.
     * 
     * @method getDependenciesMetadataWithAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to look for.
     * @returns {string} Returns an array of dependencies metadata with the given alias.
     */
    getDependenciesMetadataWithAlias(alias:string):DependencyMetadata[];

    /**
     * Returns the registered dependency metadata with the given alias and identifier.
     * 
     * @method getDependencyMetadataWithIdentifier
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to look for.
     * @param {string} identifier Represents the identifier to look for.
     * @returns {string} Return dependency metadata with the given identifier.    
     */
    getDependencyMetadataWithIdentifier(alias:string, identifier:string):DependencyMetadata;

    /**
     * Unregister all registered dependencies metadata with the given alias.
     * 
     * @method unregisterDependenciesMetadataWithAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to to look for.
     */
    unregisterDependenciesMetadataWithAlias(alias:string):void;

    /**
     * Unregister the dependency metadata with the given alias and identifier.
     * 
     * @method unregisterDependencyMetadataWithIdentifier
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to look for.
     * @param {string} identifier Represents the identifier to look for.
     */
    unregisterDependencyMetadataWithIdentifier(alias:string, identifier:string):void;

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * 
     * @method canResolve
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to resolve.
     */
    canResolve(alias:string):boolean;

    /**
     * Returns a resolved object instance.
     * 
     * @method resolve
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to resolve.
     * @param {module:jemsDI.IContainerActivator} containerActivator Represents the container activator.
     * @returns {any} The resolved object.
     */
    resolve(alias:string, containerActivator:IContainerActivator):any;

    /**
     * Returns a resolved object instance asynchronous.
     * 
     * @method resolveAsync
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to resolve.
     * @param {module:jemsDI.IContainerActivator} containerActivator Represents the container activator.
     * @returns {Promise<any>} A promise that resolve the objects. 
     */ 
    resolveAsync(alias:string, containerActivator:IContainerActivator):Promise<any>;

    /**
     * Set a list of container alias that will support the container resolutions.
     * 
     * @method setSupportContainersAliases
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string[]} aliases Represents the list of container alias that support the container.
     */
    setSupportContainersAliases(aliases:string[]):void;

    /**
     * Get the list of container alias that are supporting the container resolutions.
     * 
     * @method getSupportContainersAliases
     * @instance
     * @memberof module:jemsDI.IContainer
     * @return {string[]} The alises of the supports container.
     */
    getSupportContainersAliases():string[];

    /**
     * Clean the list of support container alias.
     * 
     * @method cleanSupportContainersAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     */
    cleanSupportContainersAlias():void;

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     * 
     * @method dispose
     * @instance
     * @memberof module:jemsDI.IContainer
     */
    dispose():void;

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use asynchronous.
     * 
     * @method disposeAsync
     * @instance
     * @memberof module:jemsDI.IContainer
     * @returns {Promise<void>} A promise that dispose the container.
     */
    disposeAsync():Promise<void>;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 * 
 * @interface IContainer
 * @memberof module:jemsDI
 */

    /**
     * Returns the name of the container.
     * 
     * @method getName
     * @instance
     * @memberof module:jemsDI.IContainer
     * @returns {string} The name of the kernel.
     */

    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * 
     * @method registerDependencyMetadata
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias.
     * @param {module:jemsDI.DependencyMetadata} dependencyMetadata Represents the dependency metadata.
     * @returns {string} Returns the dependency metadata generated identifier.
     */

     /**
     * Returns the registered dependencies metadata with the given alias.
     * 
     * @method getDependenciesMetadataWithAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to look for.
     * @returns {string} Returns an array of dependencies metadata with the given alias.
     */

    /**
     * Returns the registered dependency metadata with the given alias and identifier.
     * 
     * @method getDependencyMetadataWithIdentifier
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to look for.
     * @param {string} identifier Represents the identifier to look for.
     * @returns {string} Return dependency metadata with the given identifier.    
     */
 
     /**
     * Unregister all registered dependencies metadata with the given alias.
     * 
     * @method unregisterDependenciesMetadataWithAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to to look for.
     */

    /**
     * Unregister the dependency metadata with the given alias and identifier.
     * 
     * @method unregisterDependencyMetadataWithIdentifier
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to look for.
     * @param {string} identifier Represents the identifier to look for.
     */

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * 
     * @method canResolve
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to resolve.
     */

    /**
     * Returns a resolved object instance.
     * 
     * @method resolve
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to resolve.
     * @param {module:jemsDI.IContainerActivator} containerActivator Represents the container activator.
     * @returns {any} The resolved object.
     */

    /**
     * Returns a resolved object instance asynchronous.
     * 
     * @method resolveAsync
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represents the alias to resolve.
     * @param {module:jemsDI.IContainerActivator} containerActivator Represents the container activator.
     * @returns {Promise<any>} A promise that resolve the objects. 
     */    

    /**
     * Set a list of container alias that will support the container resolutions.
     * 
     * @method setSupportContainersAliases
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string[]} aliases Represents the list of container alias that support the container.
     */

    /**
     * Get the list of container alias that are supporting the container resolutions.
     * 
     * @method getSupportContainersAliases
     * @instance
     * @memberof module:jemsDI.IContainer
     * @return {string[]} The alises of the supports container.
     */

    /**
     * Clean the list of support container alias.
     * 
     * @method cleanSupportContainersAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     */

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     * 
     * @method dispose
     * @instance
     * @memberof module:jemsDI.IContainer
     */

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use asynchronous.
     * 
     * @method disposeAsync
     * @instance
     * @memberof module:jemsDI.IContainer
     * @returns {Promise<void>} A promise that dispose the container.
     */