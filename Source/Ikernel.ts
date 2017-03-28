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
    loadModules(modules:IModule[]):void;

    /**
     * Register an type or object to the kernel for his future activation.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    register(dependencyMetadata:DependencyMetadata):void;

    /**
     * Unregister a dependency metadata with the given alias from the kernel.
     * @param alias Represents the alias to unregister from the kernel.
     */
    unregister(alias:string):void

    /**
     * Return an alias bind fluent syntax that allow register types and object in a fluent api syntax.
     * @param alias Represents the alias to register in the kernel.
     */
    bind(alias:string):IAliasBindFluentSyntax;

    /**
     * Unbind an alias from the kernel.
     * @param alias Represents the alias to unbind.
     */
    unbind(alias:string):void;
    
    /**
     * Dispose and release all the objects and containers in the kernel.
     */    
    dispose():void;

    /**
     * Return an resolved instance of that is registered with the given alias.
     * @param alias Represents the alias to look for.
     */
    resolve(alias:string);

    /**
     * 
     */
    createContainer(containerAlias:string);

    /**
     * 
     */
    removeContainer(containerAlias:string);

    /**
     * 
     */
    useContainer(containerAlias:string);

    /**
     * 
     */
    useDefaultContainer(containerAlias:string);
}