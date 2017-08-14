import { IModule } from './IModule'
import { DependencyMetadata } from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IContainer } from "./IContainer";
import { KernelConfiguration } from "./KernelConfiguration";

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies
 */
export interface IKernel {

    /**
     * Returns the configuration of the kernel.
     * @return {KernelConfiguration} The configuation of the kernel.
     */
    getConfiguration():KernelConfiguration;

    /**
     * Load thegiven modules into the kernel.
     * @param {IModule[]} modules Represents the modules that will be loaded in the kernel.
     */
    loadModules(modules:IModule[]):void;

    /**
     * Load the given modules into the kernel asynchronous.
     * @param {IModule[]} modules Represents the modules that will be loaded in the kernel.
     * @return {Promise<void>} A Promise that load the modules.
     */
    loadModulesAsync(modules:IModule[]):Promise<void>;  

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * @param {string} alias Represents the alias to look for.
     * @return {IAliasBindFluentSyntax} A fluent bind.
     */
    bind(alias:string):IAliasBindFluentSyntax;

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * @param {string} alias Represents the alias to look for.
     */
    unbindWithAlias(alias:string):void;

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * @param {string} identifier Represents the identifier to look for.
     */
    unbindWithIdentifier(identifier:string):void;

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * @param {string} alias Represents the alias to look for.
     * @return {boolean} True if the kernel can resolve the given alias.
     */
    canResolve(alias:string):boolean;

    /**
     * Return an resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new () } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @return {any} The resolved object.
     */
    resolve(reference:{ new () } | Function | string):any;

    /**
     * Return an resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new () } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @return {any} The resolved object.
     * 
     */
    resolve(reference:{ new () } | Function | string):any;

    /**
     * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new () } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @return {Promise<any>} A promise that resolve the objects.
     */
    resolveAsync(reference:{ new () } | Function | string):Promise<any>;

    /**
     * Creates and returns a container with the given alias.
     * @param {string} alias Represents the alias of the container.
     * @return {IContainer} The created container.
     */
    createContainer(alias:string):IContainer;

    /**
     * Removes the container with the given alias.
     * @param {string} alias Represents the alias of the container.
     */
    removeContainer(alias:string):void;

    /**
     * Returns a boolean value specifying if the kernel has a container with the given alias.
     * @param {string} alias Represents the alias of the container.
     * @return {boolean} True if the kernel has the container.
     */
    hasContainer(alias:string):boolean;

    /**
     * Use the container with the given alias as a servicing container for the kernel.
     * @param {string} alias Represents the alias of the container.
     */
    useContainer(alias:string):void;

    /**
     * Use the default container as a servicing container for the kernel.
     */
    useDefaultContainer():void;

    /**
     * Return the container with the given alias.
     * @param {string} alias Represents the alias to look for.
     * @return {IContainer} A container.
     */
    getContainer(alias:string):IContainer;

    /**
     * Return the current container.
     * @return {IContainer} A container.
     */
    getCurrentContainer():IContainer;

    /**
     * Return the deafult container.
     * @return {IContainer} A container.
     */
    getDefaultContainer():IContainer;

     /**
     * Dispose and release all the objects and containers in the kernel.
     */   
    dispose():void;

    /**
     * Dispose and release all the objects and containers in the kernel asynchronous.
     * @return {Promise<void>} A promise that dispose the kernel.
     */ 
    disposeAsync():Promise<void>;
}