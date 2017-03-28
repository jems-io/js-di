import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import { DependencyMetadata } from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./Ikernel";
import { IContainer } from "./IContainer";
import { Container } from "./Container";

/**
 * Represents a kernel that manage the type registration, instance activation and serving strategies
 */
export class Kernel implements IKernel {    

    private _containers:{[containerAlias: string]:IContainer};
    private _currentContainer:IContainer;

    constructor() {
        this._containers = {};
        this._currentContainer = new Container();
        this._containers['default'] = this._currentContainer;
    }


    /**
     * Load thegiven modules into the kernel.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    public async loadModules(modules:IModule[]):Promise<void> {
        modules.forEach(function(module:IModule) {
            module.initialize(this);
        });
    }

    /**
     * Register an type or object to the kernel for his future activation.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    public async register(dependencyMetadata:DependencyMetadata):Promise<void> {
        this._currentContainer.registerDependencyMetadata(dependencyMetadata);
    }

    /**
     * Unregister a dependency metadata with the given alias from the kernel.
     * @param alias Represents the alias to unregister from the kernel.
     */
    public async unregister(alias:string):Promise<void> {
        this._currentContainer.unregisterDependencyMetadata(alias);
    }

    /**
     * Return an alias bind fluent syntax that allow register types and object in a fluent api syntax.
     * @param alias Represents the alias to register in the kernel.
     */
    public async bind(alias:string):Promise<IAliasBindFluentSyntax> {
        return null;
    }

    /**
     * Unbind an alias from the kernel.
     * @param alias Represents the alias to unbind.
     */
    public async unbind(alias:string):Promise<void> {

    }
    
    /**
     * Dispose and release all the objects and containers in the kernel.
     */    
    public async dispose():Promise<void> {
        
    }

    /**
     * Return an resolved instance of that is registered with the given alias.
     * @param alias Represents the alias to look for.
     */
    public async resolve(alias:string):Promise<any> {
        if (this._currentContainer.canResolve(alias)) {
            return this._currentContainer.resolve(alias);
        }
        else
            return this._containers['default'].resolve(alias);
    }

    /**
     * Creates a container with the given alias.
     * @param containerAlias Represents the alias of the container.
     */
    public async createContainer(containerAlias:string):Promise<void> {        
        if (!(await this.hasContainer(containerAlias))) {
            this._currentContainer[containerAlias] = new Container();
        }
        else
            throw new Error('The given container alias is already registered. Criteria -> container alias: ' +  containerAlias);
    }

    /**
     * Remove the container with the given alias.
     * @param containerAlias Represents the alias of the container.
     */
    public async removeContainer(containerAlias:string):Promise<void> {
        if (await this.hasContainer(containerAlias)) {
            delete this._currentContainer[containerAlias];
        }
        else
            throw new Error('The given container alias is not registered. Criteria -> container alias: ' +  containerAlias);
    }

    /**
     * Return a boolean value specifying if the kernel has a container with the given alias.
     * @param containerAlias Represents the alias of the container.
     */
    public async hasContainer(containerAlias:string):Promise<boolean> {
        return !(!this._currentContainer[containerAlias]);
    }

    /**
     * Use the container with the given alias as a serving container for the kernel.
     * @param containerAlias Represents the alias of the container.
     */
    public async useContainer(containerAlias:string):Promise<void> {
        if (await this.hasContainer(containerAlias)) {
            this._currentContainer = this._currentContainer[containerAlias];
        }
        else
            throw new Error('The given container alias is not registered. Criteria -> container alias: ' +  containerAlias);
    }

    /**
     * Use the default container as a serving container for the kernel.
     */
    public async useDefaultContainer():Promise<void> {
        this._currentContainer = this._currentContainer['default'];
    }
}