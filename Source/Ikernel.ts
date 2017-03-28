import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import { DependencyMetadata } from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";

/**
 * Represents a kernel that manage the type registration, instance activation and serving strategies
 */
export interface IKernel {

    /**
     * Load thegiven modules into the kernel.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    loadModules(modules:IModule[]):Promise<void>;

    /**
     * Register an type or object to the kernel for his future activation.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    register(dependencyMetadata:DependencyMetadata):Promise<void>;

    /**
     * Unregister a dependency metadata with the given alias from the kernel.
     * @param alias Represents the alias to unregister from the kernel.
     */
    unregister(alias:string):Promise<void>

    /**
     * Return an alias bind fluent syntax that allow register types and object in a fluent api syntax.
     * @param alias Represents the alias to register in the kernel.
     */
    bind(alias:string):Promise<IAliasBindFluentSyntax>;

    /**
     * Unbind an alias from the kernel.
     * @param alias Represents the alias to unbind.
     */
    unbind(alias:string):Promise<void>;
    
    /**
     * Dispose and release all the objects and containers in the kernel.
     */    
    dispose():Promise<void>;

    /**
     * Return an resolved instance of that is registered with the given alias.
     * @param alias Represents the alias to look for.
     */
    resolve(alias:string):Promise<any>;

    /**
     * Creates a container with the given alias.
     * @param containerAlias Represents the alias of the container.
     */
    createContainer(containerAlias:string):Promise<void>;

    /**
     * Remove the container with the given alias.
     * @param containerAlias Represents the alias of the container.
     */
    removeContainer(containerAlias:string):Promise<void>;

    /**
     * Return a boolean value specifying if the kernel has a container with the given alias.
     * @param containerAlias Represents the alias of the container.
     */
    hasContainer(containerAlias:string):Promise<boolean>;

    /**
     * Use the container with the given alias as a serving container for the kernel.
     * @param containerAlias Represents the alias of the container.
     */
    useContainer(containerAlias:string):Promise<void>;

    /**
     * Use the default container as a serving container for the kernel.
     */
    useDefaultContainer():Promise<void>;
}