import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import { DependencyMetadata } from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./Ikernel";
import { IContainer } from "./IContainer";
import { Container } from "./Container";
import { ContainerActivator } from "./ContainerActivator";

/**
 * Represents a kernel that manage the type registration, instance activation and serving strategies
 */
export class Kernel implements IKernel {    

    private _defaultContainerKey:string = 'default';
    private _containers:{[containerAlias: string]:IContainer};
    private _currentContainer:IContainer;

    constructor() {
        this._containers = {};
        this._currentContainer = new Container();
        this._containers[this._defaultContainerKey] = this._currentContainer;
    }


    /**
     * Load thegiven modules into the kernel.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    public async loadModules(modules:IModule[]):Promise<void> {
        return new Promise<void>(
            () => {
                modules.forEach(async function(module:IModule) {
                    await module.initialize(this);
                });
            }
        );
    }

    /**
     * Register an type or object to the kernel for his future activation.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    public async register(dependencyMetadata:DependencyMetadata):Promise<void> {
        await this._currentContainer.registerDependencyMetadata(dependencyMetadata);
    }

    /**
     * Unregister a dependency metadata with the given alias from the kernel.
     * @param alias Represents the alias to unregister from the kernel.
     */
    public async unregister(alias:string):Promise<void> {
        await this._currentContainer.unregisterDependencyMetadata(alias);
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
        for (var containerAlias in this._containers){
            if (this._containers.hasOwnProperty(containerAlias)) {
                this._containers[containerAlias].dispose();
                delete this._containers[containerAlias];
            }
        }        
    }

    /**
     * Return an resolved instance of that is registered with the given alias.
     * @param alias Represents the alias to look for.
     * @param containerActivator Represents the activator that will be use for the container. [Optional]
     */
    public async resolve(alias:string, containerActivator:ContainerActivator):Promise<any> {

        if (!containerActivator)
            containerActivator = new ContainerActivator(this);

        if (await this._currentContainer.canResolve(alias)) {
            return await this._currentContainer.resolve(alias, containerActivator);
        }
        else
            return await this._containers[this._defaultContainerKey].resolve(alias, containerActivator);
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
        this._currentContainer = this._currentContainer[this._defaultContainerKey];
    }
}