import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import { DependencyMetadata } from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { ContainerActivator } from "./ContainerActivator";
import { IContainer } from "./IContainer";
import { KernelConfiguration } from "./KernelConfiguration";

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies
 * 
 * @interface IKernel
 * @memberof module:jemsDI
 */
export interface IKernel {

    /**
     * Returns the configuration of the kernel.
     * 
     * @method getConfiguration
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {module:jemsDI.KernelConfiguration} The configuation of the kernel.
     */
    getConfiguration():KernelConfiguration;

    /**
     * Load thegiven modules into the kernel.
     * 
     * @method loadModules
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {module:jemsDI.IModule[]} modules Represents the modules that will be loaded in the kernel.
     */
    loadModules(modules:IModule[]):void;

    /**
     * Load the given modules into the kernel asynchronous.
     * 
     * @method loadModulesAsync
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {module:jemsDI.IModule[]} modules Represents the modules that will be loaded in the kernel.
     * @returns {Promise<void>} A Promise that load the modules.
     */
    loadModulesAsync(modules:IModule[]):Promise<void>;  

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * 
     * @method bind
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {module:jemsDI.IAliasBindFluentSyntax} A fluent bind.
     */
    bind(alias:string):IAliasBindFluentSyntax;

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * 
     * @method unbindWithAlias
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     */
    unbindWithAlias(alias:string):void;

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * 
     * @method unbindWithIdentifier
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias that contain the identifier to look for.
     * @param {string} identifier Represents the identifier to look for.
     */
    unbindWithIdentifier(aslias:string, identifier:string):void;

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * 
     * @method canResolve
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {boolean} True if the kernel can resolve the given alias.
     */
    canResolve(alias:string):boolean;

    /**
     * Return an resolved instance of that is registered with the given alias.
     * 
     * @method resolve
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     */
    resolve(alias:string):any;

    /**
     * Return an resolved instance of that is registered with the given alias asynchronous.
     * 
     * @method resolveAsync
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {Promise<any>} A promise that resolve the objects.
     */
    resolveAsync(alias:string):Promise<any>;

    /**
     * Creates and returns a container with the given alias.
     * 
     * @method createContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     * @return {module:jemsDI.IContainer} The created container.
     */
    createContainer(alias:string):IContainer;

    /**
     * Removes the container with the given alias.
     * 
     * @method removeContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     */
    removeContainer(alias:string):void;

    /**
     * Returns a boolean value specifying if the kernel has a container with the given alias.
     * 
     * @method hasContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     * @returns {boolean} True if the kernel has the container.
     */
    hasContainer(alias:string):boolean;

    /**
     * Use the container with the given alias as a servicing container for the kernel.
     * 
     * @method useContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     */
    useContainer(alias:string):void;

    /**
     * Use the default container as a servicing container for the kernel.
     * 
     * @method useDefaultContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     */
    useDefaultContainer():void;

    /**
     * Return the container with the given alias.
     * 
     * @method getContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {module:jemsDI.IContainer} A container.
     */
    getContainer(alias:string):IContainer;

    /**
     * Return the current container.
     * 
     * @method getCurrentContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {module:jemsDI.IContainer} A container.
     */
    getCurrentContainer():IContainer;

    /**
     * Return the deafult container.
     * 
     * @method getDefaultContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {module:jemsDI.IContainer} A container.
     */
    getDefaultContainer():IContainer;

     /**
     * Dispose and release all the objects and containers in the kernel.
     * 
     * @method dispose
     * @instance
     * @memberof module:jemsDI.IKernel
     */   
    dispose():void;

    /**
     * Dispose and release all the objects and containers in the kernel asynchronous.
     * 
     * @method disposeAsync
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {Promise<void>} A promise that dispose the kernel.
     */ 
    disposeAsync():Promise<void>;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies
 * 
 * @interface IKernel
 * @memberof module:jemsDI
 */

    /**
     * Returns the configuration of the kernel.
     * 
     * @method getConfiguration
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {module:jemsDI.KernelConfiguration} The configuation of the kernel.
     */

    /**
     * Load thegiven modules into the kernel.
     * 
     * @method loadModules
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {module:jemsDI.IModule[]} modules Represents the modules that will be loaded in the kernel.
     */

     /**
     * Load the given modules into the kernel asynchronous.
     * 
     * @method loadModulesAsync
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {module:jemsDI.IModule[]} modules Represents the modules that will be loaded in the kernel.
     * @returns {Promise<void>} A Promise that load the modules.
     */

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * 
     * @method bind
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {module:jemsDI.IAliasBindFluentSyntax} A fluent bind.
     */

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * 
     * @method unbindWithAlias
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     */

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * 
     * @method unbindWithIdentifier
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias that contain the identifier to look for.
     * @param {string} identifier Represents the identifier to look for.
     */

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * 
     * @method canResolve
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {boolean} True if the kernel can resolve the given alias.
     */
    
    /**
     * Return an resolved instance of that is registered with the given alias.
     * 
     * @method resolve
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     */

    /**
     * Return an resolved instance of that is registered with the given alias asynchronous.
     * 
     * @method resolveAsync
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {Promise<any>} A promise that resolve the objects.
     */

    /**
     * Creates and returns a container with the given alias.
     * 
     * @method createContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     * @return {module:jemsDI.IContainer} The created container.
     */

    /**
     * Removes the container with the given alias.
     * 
     * @method removeContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     */

    /**
     * Returns a boolean value specifying if the kernel has a container with the given alias.
     * 
     * @method hasContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     * @returns {boolean} True if the kernel has the container.
     */

    /**
     * Use the container with the given alias as a servicing container for the kernel.
     * 
     * @method useContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     */

    /**
     * Use the default container as a servicing container for the kernel.
     * 
     * @method useDefaultContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     */

    /**
     * Return the container with the given alias.
     * 
     * @method getContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias to look for.
     * @returns {module:jemsDI.IContainer} A container.
     */

    /**
     * Return the current container.
     * 
     * @method getCurrentContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {module:jemsDI.IContainer} A container.
     */

    /**
     * Return the deafult container.
     * 
     * @method getDefaultContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {module:jemsDI.IContainer} A container.
     */

    /**
     * Dispose and release all the objects and containers in the kernel.
     * 
     * @method dispose
     * @instance
     * @memberof module:jemsDI.IKernel
     */

     /**
     * Dispose and release all the objects and containers in the kernel asynchronous.
     * 
     * @method disposeAsync
     * @instance
     * @memberof module:jemsDI.IKernel
     * @returns {Promise<void>} A promise that dispose the kernel.
     */