import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import DependencyMetadata from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./Ikernel";
import { IContainer } from "./IContainer";
import Container from "./Container";
import ContainerActivator from "./ContainerActivator";
import * as Errors from "./Errors/Index";
import KernelConfiguration from "./KernelConfiguration";

/**
 * Represents a kernel that manage the type registration, instance activation and serving strategies
 */
export default class Kernel implements IKernel {    

    private _defaultContainerAlias:string = 'default';
    private _containers:{[containerAlias: string]:IContainer} = {};
    private _currentContainer:IContainer;
    private _kernelConfiguration:KernelConfiguration;

    constructor() {

        let defaultContainer = new Container(this, this._defaultContainerAlias);
        this._currentContainer = defaultContainer;
        this._containers[defaultContainer.name] = defaultContainer;
        this._kernelConfiguration = new KernelConfiguration();
    }

    /**
     * Returns the configuration of the kernel.
     */
    public get configuration():KernelConfiguration {
        return this._kernelConfiguration;
    }

    /**
     * Load thegiven modules into the kernel.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    public loadModules(modules:IModule[]):void {        
        modules.forEach(function(module:IModule) {
            module.initialize(this);
        });        
    }   

     /**
     * Load the given modules into the kernel asynchronous.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    public async loadModulesAsync(modules:IModule[]):Promise<void> {        
        this.loadModules(modules);      
    }     

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * @param alias Represents the alias to look for.
     * @returns A fluent bind.
     */
    public bind(alias:string):IAliasBindFluentSyntax {
        //TODO: Implement this man.
        throw new Error('Not Implemented');
    }

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * @param alias Represents the alias to look for.
     */
    public unbindWithAlias(alias:string):void {
        //TODO: Implement this man.
        throw new Error('Not Implemented');
    }

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * @param identifier Represents the identifier to look for.
     */
    public unbindWithIdentifier(identifier:string):void {
        //TODO: Implement this man.
        throw new Error('Not Implemented');
    }

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * @param alias Represents the alias to look for.
     * @returns True if the kernel can resolve the given alias.
     */
    public canResolve(alias:string):boolean {
        return this._currentContainer.canResolve(alias);
    }
    
    /**
     * Return an resolved instance of that is registered with the given alias.
     * @param alias Represents the alias to look for.
     */
    public resolve(alias:string):any {        
        return this._currentContainer.resolve(alias, new ContainerActivator(this._currentContainer));  
    }

    /**
     * Return an resolved instance of that is registered with the given alias asynchronous.
     * @param alias Represents the alias to look for.
     */
    public async resolveAsync(alias:string):Promise<any> {
        return this.resolve(alias);
    }

    /**
     * Creates a container with the given alias.
     * @param alias Represents the alias of the container.
     */
    public createContainer(alias:string):void {        
        if (!(this.hasContainer(alias))) {
            this._containers[alias] =  new Container(this, alias);
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is already registered`);
    }

    /**
     * Removes the container with the given alias.
     * @param alias Represents the alias of the container.
     */
    public removeContainer(alias:string):void {
        if (this.hasContainer(alias)) {
            delete this._containers[alias];
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is not registered.`);
    }

    /**
     * Returns a boolean value specifying if the kernel has a container with the given alias.
     * @param alias Represents the alias of the container.
     * @returns True if the kernel has the container.
     */
    public hasContainer(alias:string):boolean {
        return !(!this._containers[alias]);
    }

    /**
     * Use the container with the given alias as a serving container for the kernel.
     * @param alias Represents the alias of the container.
     */
    public useContainer(alias:string):void {
        if (this.hasContainer(alias)) {
            this._currentContainer = this._containers[alias];
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is not registered`);
    }

    /**
     * Use the default container as a serving container for the kernel.
     */
    public useDefaultContainer():void {
        this._currentContainer = this._containers[this._defaultContainerAlias];
    }

    /**
     * Return the container with the given alias.
     * @param alias Represents the alias to look for.
     * @returns A container.
     */
    public getContainer(alias:string):IContainer {
        if (this.hasContainer(alias)) {
            return this._containers[alias];
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is not registered`);
    }

    /**
     * Return the current container.
     * @returns A container.
     */
    public getCurrentContainer():IContainer {
        if (this._currentContainer)
            return this._currentContainer;
        else
            throw Error('Something that dont should happen is happening, we dont have containers. [The default must be there]');
    }

    /**
     * Return the deafult container.
     * @returns A container.
     */
    public getDefaultContainer():IContainer {
        return this._containers[this._defaultContainerAlias];
    }

    /**
     * Dispose and release all the objects and containers in the kernel.
     */    
    public dispose():void {
        for (var containerAlias in this._containers){
            if (this._containers.hasOwnProperty(containerAlias)) {
                this._containers[containerAlias].dispose();
                delete this._containers[containerAlias];
            }
        }        
    }

     /**
     * Dispose and release all the objects and containers in the kernel asynchronous.
     */    
    public async disposeAsync():Promise<void> {
        this.dispose();      
    }
}