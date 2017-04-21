import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import DependencyMetadata from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import ContainerActivator from "./ContainerActivator";
import { IContainer } from "./IContainer";

/**
 * Represents a kernel that manage the type registration, instance activation and serving strategies
 */
export interface IKernel {

    /**
     * Load the given modules into the kernel.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    loadModules(modules:IModule[]):Promise<void>;    

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * @param alias Represents the alias to look for.
     * @returns A fluent bind.
     */
    bind(alias:string):Promise<IAliasBindFluentSyntax>;

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * @param alias Represents the alias to look for.
     */
    unbindWithAlias(alias:string):Promise<void>;

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * @param identifier Represents the identifier to look for.
     */
    unbindWithIdentifier(identifier:string):Promise<void>;

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * @param alias Represents the alias to look for.
     * @returns True if the kernel can resolve the given alias.
     */
    canResolve(alias:string):Promise<boolean>;

    /**
     * Return an resolved instance of that is registered with the given alias in the container resolution stack.
     * @param alias Represents the alias to look for.
     * @param containerActivator Represents the activator that will be use for the container. [Optional]
     */
    resolve(alias:string, containerActivator:ContainerActivator):Promise<any>;

    /**
     * Creates a container with the given alias.
     * @param alias Represents the alias of the container.
     */
    createContainer(alias:string):Promise<void>;

    /**
     * Removes the container with the given alias.
     * @param alias Represents the alias of the container.
     */
    removeContainer(alias:string):Promise<void>;

    /**
     * Returns a boolean value specifying if the kernel has a container with the given alias.
     * @param alias Represents the alias of the container.
     * @returns True if the kernel has the container.
     */
    hasContainer(alias:string):Promise<boolean>;

    /**
     * Use the container with the given alias as a serving container for the kernel.
     * @param alias Represents the alias of the container.
     */
    useContainer(alias:string):Promise<void>;

    /**
     * Use the container with the given alias as a serving container for the kernel and keep the previews one to be used in the container resolution stack.
     * @param alias Represents the alias of the container.
     */
    useContainerKeepingPreviews(alias:string):Promise<void>;

    /**
     * Use the default container as a serving container for the kernel.
     */
    useDefaultContainer():Promise<void>;

    /**
     * Return the container with the given alias.
     * @param alias Represents the alias to look for.
     * @returns A container.
     */
    getContainer(alias:string):Promise<IContainer>;

    /**
     * Return the current container.
     * @returns A container.
     */
    getCurrentContainer():Promise<IContainer>;

    /**
     * Return the deafult container.
     * @returns A container.
     */
    getDefaultContainer():Promise<IContainer>;

    /**
     * Get an array of the current container resolution stack used to resolve the aliases.
     * @returns An array of container aliases.
     */
    getContainerResolutionStack():Promise<string[]>;

     /**
     * Dispose and release all the containers in the kernel.
     */    
    dispose():Promise<void>;
}