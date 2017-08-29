/// <reference path="../typings/index.d.ts" />

import * as Errors from "./errors/index";
import { Module } from './module'
import { DependencyMetadata } from "./dependencyMetadata";
import { AliasBindFluentSyntax } from "./aliasBindFluentSyntax";
import { Kernel } from "./kernel";
import { Container } from "./container";
import { KernelConfiguration } from "./kernelConfiguration";
import { ContainerActivator } from "./containerActivator";
import contextualActivator from './contextualActivator'
import { ResolutionContext } from "./resolutionContext";
import { ResolutionOption } from "./resolutionOption";
import { ContainerizedResolutionSyntax } from "./fluent-syntaxes/containerizedResolutionSyntax";
import { EventEmitter } from 'events'

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies.
 * @private
 */
export class BuildInKernel extends EventEmitter implements Kernel {    

    private _defaultContainerAlias:string = 'default';
    private _containers:{[containerAlias: string]:Container} = {};
    private _currentContainer:Container;
    private _kernelConfiguration:KernelConfiguration;
    
    /**
     * Instance a new kernel.
     */
    constructor() {
        super()
        let defaultContainer = this.createContainer(this._defaultContainerAlias);
        this._currentContainer = defaultContainer;
        this._containers[defaultContainer.getName()] = defaultContainer;
        this._kernelConfiguration = new KernelConfiguration();
    }

    /**
     * Returns the configuration of the kernel.
     * @returns {KernelConfiguration} The configuation of the kernel.
     */
    public getConfiguration():KernelConfiguration {
        return this._kernelConfiguration;
    }

    /**
     * Load thegiven modules into the kernel.
     * @param {Module[]} modules Represents the modules that will be loaded in the kernel.
     */
    public loadModules(modules:Module[]):void {        
        modules.forEach(function(module:Module) {
            module.initialize(this);
        }.bind(this));        
    }   

     /**
     * Load the given modules into the kernel asynchronous.
     * @param {Module[]} modules Represents the modules that will be loaded in the kernel.
     * @returns {Promise<void>} A Promise that load the modules.
     */
    public async loadModulesAsync(modules:Module[]):Promise<void> {        
        this.loadModules(modules);      
    }     

    /**
     * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
     * @param {string} alias Represents the alias to look for.
     * @returns {AliasBindFluentSyntax} A fluent bind.
     */
    public bind(alias:string):AliasBindFluentSyntax {
        return contextualActivator.getContextInstantiator<Kernel, AliasBindFluentSyntax>('aliasBindFluentSyntax')(this, alias);
    }

    /**
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * @param {string} alias Represents the alias to look for.
     */
    public unbindWithAlias(alias:string):void {
        this.getCurrentContainer().unregisterDependenciesMetadataWithAlias(alias);
    }

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * @param {string} identifier Represents the identifier to look for.
     */
    public unbindWithIdentifier(identifier:string):void {
        this.getCurrentContainer().unregisterDependencyMetadataWithIdentifier(identifier);
    }

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * @param {string} alias Represents the alias to look for.
     * @returns {boolean} True if the kernel can resolve the given alias.
     */
    public canResolve(alias:string):boolean {
        return this._currentContainer.canResolve(alias);
    }
    
    /**
     * Return an resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
     * @return {any} The resolved object.
     */
    public resolve(reference:{ new ():any } | Function | string, resolutionOption?:ResolutionOption):any {
        let containerizedResolutionSyntax:ContainerizedResolutionSyntax = contextualActivator.getContextInstantiator<Container, ContainerizedResolutionSyntax>('containerizedResolutionSyntax')(this._currentContainer, '');
        containerizedResolutionSyntax.on('resolution-performed', (resolutionContext:ResolutionContext) => {
            this.emit('resolution-performed', resolutionContext);
        });

        return containerizedResolutionSyntax.resolve(reference, resolutionOption);
    }

    /**
     * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
     * @returns {Promise<any>} A promise that resolve the objects.
     */
    public async resolveAsync(reference:{ new ():any } | Function | string, resolutionOption?:ResolutionOption):Promise<any> {
        return this.resolve(reference);
    }

    /**
     * Return a containerized resolution syntax that allow perform resolution with an exiting container.
     * @param alias Represents the alias of the container to look for.
     * @return {ContainerizedResolutionSyntax} The containerized resolution systax. 
     */
    public usingContainer(alias:string):ContainerizedResolutionSyntax {
        return contextualActivator.getContextInstantiator<Container, ContainerizedResolutionSyntax>('containerizedResolutionSyntax')(this.getContainer(alias), '');
    }

    /**
     * Return a containerized resolution syntax that allow perform resolution with an temporal container.
     * @return {ContainerizedResolutionSyntax} The containerized resolution systax. 
     */
    public usingTemporalContainer():ContainerizedResolutionSyntax {
        let temporalId:string = Math.random().toString(36).substring(10);
        let temporalContainer:Container = this.createContainer(temporalId);
        let containerizedResolutionSyntax:ContainerizedResolutionSyntax = contextualActivator.getContextInstantiator<Container, ContainerizedResolutionSyntax>('containerizedResolutionSyntax')(temporalContainer, '');
        containerizedResolutionSyntax.on('resolution-performed', () =>  this.removeContainer(temporalId))

        return containerizedResolutionSyntax;
    }    

    /**
     * Creates and returns a container with the given alias.
     * @param {string} alias Represents the alias of the container.
     * @return {Container} The created container.
     */
    public createContainer(alias:string):Container {        
        if (!(this.hasContainer(alias))) {
            this._containers[alias] =  contextualActivator.getContextInstantiator<Kernel, Container>('container')(this, alias);   
            return this._containers[alias];        
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is already registered`);

        
    }

    /**
     * Removes the container with the given alias.
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
     * @param {string} alias Represents the alias of the container.
     * @returns {boolean} True if the kernel has the container.
     */
    public hasContainer(alias:string):boolean {
        return !(!this._containers[alias]);
    }

    /**
     * Use the container with the given alias as a servicing container for the kernel.
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
     */
    public useDefaultContainer():void {
        this._currentContainer = this._containers[this._defaultContainerAlias];
    }

    /**
     * Return the container with the given alias.
     * @param {string} alias Represents the alias to look for.
     * @returns {Container} A container.
     */
    public getContainer(alias:string):Container {
        if (this.hasContainer(alias)) {
            return this._containers[alias];
        }
        else
            throw new Errors.InvalidDataError(`The given container alias [${alias}] is not registered`);
    }

    /**
     * Return the current container.
     * @returns {Container} A container.
     */
    public getCurrentContainer():Container {
        if (this._currentContainer)
            return this._currentContainer;
        else
            throw Error('Something that dont should happen is happening, we dont have containers. [The default must be there]');
    }

    /**
     * Return the deafult container.
     * @returns {Container} A container.
     */
    public getDefaultContainer():Container {
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
     * @returns {Promise<void>} A promise that dispose the kernel.
     */    
    public async disposeAsync():Promise<void> {
        this.dispose();      
    }
}