import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import { DependencyMetadata } from "./DependencyMetadata";
import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { IKernel } from "./Ikernel";
import { IContainer } from "./IContainer";
import { Container } from "./Container";
import { ContainerActivator } from "./ContainerActivator";
import * as Errors from "./Errors/Index";
import { KernelConfiguration } from "./KernelConfiguration";
import { AliasBindFluentSyntax } from "./AliasBindFluentSyntax";

class Kernel implements IKernel {    

    private _defaultContainerAlias:string = 'default';
    private _containers:{[containerAlias: string]:IContainer} = {};
    private _currentContainer:IContainer;
    private _kernelConfiguration:KernelConfiguration;

    /**
     * Instance a new kernel.
     * 
     * @class
     * @name Kernel
     * @classdesc Represents a kernel that manage the type registration, instance activation and servicing strategies.
     * @implements {module:jemsDI.IKernel}
     * @memberof module:jemsDI
     */
    constructor() {

        let defaultContainer = new Container(this, this._defaultContainerAlias);
        this._currentContainer = defaultContainer;
        this._containers[defaultContainer.getName()] = defaultContainer;
        this._kernelConfiguration = new KernelConfiguration();
    }

    /**
     * Returns the configuration of the kernel.
     * 
     * @instance
     * @method getConfiguration
     * @memberof module:jemsDI.Kernel
     * @returns {module:jemsDI.KernelConfiguration} The configuation of the kernel.
     */
    public getConfiguration():KernelConfiguration {
        return this._kernelConfiguration;
    }

    /**
     * Load thegiven modules into the kernel.
     * 
     * @instance
     * @method loadModules
     * @memberof module:jemsDI.Kernel
     * @param {module:jemsDI.IModule[]} modules Represents the modules that will be loaded in the kernel.
     */
    public loadModules(modules:IModule[]):void {        
        modules.forEach(function(module:IModule) {
            module.initialize(this);
        }.bind(this));        
    }   

     /**
     * Load the given modules into the kernel asynchronous.
     * 
     * @instance
     * @method loadModulesAsync
     * @memberof module:jemsDI.Kernel
     * @param {module:jemsDI.IModule[]} modules Represents the modules that will be loaded in the kernel.
     * @returns {Promise<void>} A Promise that load the modules.
     */
    public async loadModulesAsync(modules:IModule[]):Promise<void> {        
        this.loadModules(modules);      
    }     

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * 
     * @instance
     * @method bind
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias to look for.
     * @returns {module:jemsDI.IAliasBindFluentSyntax} A fluent bind.
     */
    public bind(alias:string):IAliasBindFluentSyntax {
        return new AliasBindFluentSyntax(alias, this);
    }

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * 
     * @instance
     * @method unbindWithAlias
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias to look for.
     */
    public unbindWithAlias(alias:string):void {
        this.getCurrentContainer().unregisterDependenciesMetadataWithAlias(alias);
    }

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * 
     * @instance
     * @method unbindWithIdentifier
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias that contain the identifier to look for.
     * @param {string} identifier Represents the identifier to look for.
     */
    public unbindWithIdentifier(aslias:string, identifier:string):void {
        this.getCurrentContainer().unregisterDependencyMetadataWithIdentifier(aslias, identifier);
    }

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * 
     * @instance
     * @method canResolve
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias to look for.
     * @returns {boolean} True if the kernel can resolve the given alias.
     */
    public canResolve(alias:string):boolean {
        return this._currentContainer.canResolve(alias);
    }
    
    /**
     * Return an resolved instance of that is registered with the given alias.
     * 
     * @instance
     * @method resolve
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias to look for.
     */
    public resolve(alias:string):any {        
        return this._currentContainer.resolve(alias, new ContainerActivator(this._currentContainer));  
    }

    /**
     * Return an resolved instance of that is registered with the given alias asynchronous.
     * 
     * @instance
     * @method resolveAsync
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias to look for.
     * @returns {Promise<any>} A promise that resolve the objects.
     */
    public async resolveAsync(alias:string):Promise<any> {
        return this.resolve(alias);
    }

    /**
     * Creates and returns a container with the given alias.
     * 
     * @method createContainer
     * @instance
     * @memberof module:jemsDI.IKernel
     * @param {string} alias Represents the alias of the container.
     * @return {module:jemsDI.IContainer} The created container.
     */
    public createContainer(alias:string):IContainer {        
        if (!(this.hasContainer(alias))) {
            this._containers[alias] =  new Container(this, alias);   
            return this._containers[alias];        
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is already registered`);

        
    }

    /**
     * Removes the container with the given alias.
     * 
     * @instance
     * @method removeContainer
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias of the container.
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
     * 
     * @instance
     * @method hasContainer
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias of the container.
     * @returns {boolean} True if the kernel has the container.
     */
    public hasContainer(alias:string):boolean {
        return !(!this._containers[alias]);
    }

    /**
     * Use the container with the given alias as a servicing container for the kernel.
     * 
     * @instance
     * @method useContainer
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias of the container.
     */
    public useContainer(alias:string):void {
        if (this.hasContainer(alias)) {
            this._currentContainer = this._containers[alias];
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is not registered`);
    }

    /**
     * Use the default container as a servicing container for the kernel.
     * 
     * @instance
     * @method useDefaultContainer
     * @memberof module:jemsDI.Kernel
     */
    public useDefaultContainer():void {
        this._currentContainer = this._containers[this._defaultContainerAlias];
    }

    /**
     * Return the container with the given alias.
     * 
     * @instance
     * @method getContainer
     * @memberof module:jemsDI.Kernel
     * @param {string} alias Represents the alias to look for.
     * @returns {module:jemsDI.IContainer} A container.
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
     * 
     * @instance
     * @method getCurrentContainer
     * @memberof module:jemsDI.Kernel
     * @returns {module:jemsDI.IContainer} A container.
     */
    public getCurrentContainer():IContainer {
        if (this._currentContainer)
            return this._currentContainer;
        else
            throw Error('Something that dont should happen is happening, we dont have containers. [The default must be there]');
    }

    /**
     * Return the deafult container.
     * 
     * @instance
     * @method getDefaultContainer
     * @memberof module:jemsDI.Kernel
     * @returns {module:jemsDI.IContainer} A container.
     */
    public getDefaultContainer():IContainer {
        return this._containers[this._defaultContainerAlias];
    }

    /**
     * Dispose and release all the objects and containers in the kernel.
     * 
     * @instance
     * @method dispose
     * @memberof module:jemsDI.Kernel
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
     * 
     * @instance
     * @method disposeAsync
     * @memberof module:jemsDI.Kernel
     * @returns {Promise<void>} A promise that dispose the kernel.
     */    
    public async disposeAsync():Promise<void> {
        this.dispose();      
    }
}

export { Kernel as Kernel };