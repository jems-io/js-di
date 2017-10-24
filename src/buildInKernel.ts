/// <reference path="../typings/index.d.ts" />

import * as Errors from './errors/index'
import { Module } from './module'
import { DependencyMetadata } from './dependencyMetadata'
import { Kernel } from './kernel'
import { Container } from './container'
import { KernelConfiguration } from './kernelConfiguration'
import { ResolutionContext } from './resolutionContext'
import { ResolutionOption } from './resolutionOption'
import { ContainerizedSyntax } from './fluent-syntaxes/containerizedSyntax'
import { EventEmitter } from 'events'
import { RelationSyntax } from './fluent-syntaxes/relationSyntax'
import { InsideAndToSytax } from './fluent-syntaxes/insideAndToSytax'
import { InstanceServicingStrategy } from './servicing-strategies/instanceServicingStrategy'
import { PerCallDeliveryStrategy } from './delivery-strategies/perCallDeliveryStrategy'
import { BuildInContainerizedSyntax } from './fluent-syntaxes/buildInContainerizedSyntax'
import { BuildInContainer } from './buildInContainer'

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies.
 * @private
 */
export class BuildInKernel implements Kernel {

  private _defaultContainerAlias: string = 'default'
  private _containers: {[containerAlias: string]: Container} = {}
  private _currentContainer: Container
  private _kernelConfiguration: KernelConfiguration

  /**
   * Instance a new kernel.
   */
  constructor () {
    let defaultContainer = this.createNewContainer(this._defaultContainerAlias, [])
    this._currentContainer = defaultContainer
    this._containers[defaultContainer.getName()] = defaultContainer
    this._kernelConfiguration = new KernelConfiguration()

    this._kernelConfiguration.defaultServicingStrategy = new InstanceServicingStrategy()
    this._kernelConfiguration.defaultDeliveryStrategy = new PerCallDeliveryStrategy()
  }

  /**
   * Returns the configuration of the kernel.
   * @returns {KernelConfiguration} The configuation of the kernel.
   */
  public getConfiguration (): KernelConfiguration {
    return this._kernelConfiguration
  }

  /**
   * Load thegiven modules into the kernel.
   * @param {Module[]} modules Represents the modules that will be loaded in the kernel.
   */
  public loadModules (modules: Module[]): void {
    modules.forEach(function (module: Module) {
      module.initialize(this)
    }.bind(this))
  }

  /**
   * Load the given modules into the kernel asynchronous.
   * @param {Module[]} modules Represents the modules that will be loaded in the kernel.
   * @returns {Promise<void>} A Promise that load the modules.
   */
  public async loadModulesAsync (modules: Module[]): Promise<void> {
    this.loadModules(modules)
  }

  /**
   * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
   * @param {string} alias Represents the alias to look for.
   * @returns {InsideAndToSytax} A fluent bind.
   */
  public bind (alias: string): InsideAndToSytax {
    return new RelationSyntax(this).bind(alias)
  }

  /**
   * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
   * @param {string} alias Represents the alias to look for.
   * @returns {boolean} True if the kernel can resolve the given alias.
   */
  public canResolve (alias: string): boolean {
    return this._currentContainer.canResolve(alias)
  }

  /**
   * Return a containerized resolution syntax that allow perform resolution with an exiting container.
   * @param alias Represents the alias of the container to look for.
   * @return {ContainerizedSyntax} The containerized resolution systax.
   */
  public usingContainer (alias: string): ContainerizedSyntax {

    if (!this.hasContainer(alias)) {
      throw new Errors.UnregisteredAliasError('There is not any container with the given alias.')
    }

    return this.getContainerizedSyntax(this._containers[alias])
  }

  /**
   * Return a containerized resolution syntax that allow perform resolution with the defautl container.
   * @return {ContainerizedSyntax} The containerized resolution systax.
   */
  public usingDefaultContainer (): ContainerizedSyntax {
    return this.getContainerizedSyntax(this._currentContainer)
  }

  /**
   * Creates and returns a container with the given alias.
   * @param {string} alias Represents the alias of the container.
   * @param {string[]} supports Represents the aliases of the supports containers.
   * @return {Container} The created container.
   */
  public createContainer (alias: string, supports?: string[]): void {
    this.createNewContainer(alias, supports)
  }

  /**
   * Return an resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
   * @return {any} The resolved object.
   */
  public resolve (reference: { new (): any } | Function | string, resolutionOption?: ResolutionOption): any {
    return this.usingDefaultContainer().resolve(reference, resolutionOption)
  }

  /**
   * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
   * @return {Promise<any>} A promise that resolve the objects.
   */
  public async resolveAsync (reference: { new (): any } | Function | string, resolutionOption?: ResolutionOption): Promise<any> {
    return await this.resolveAsync(reference, resolutionOption)
  }

  /**
   * Return an resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
   * @return {any} The resolved object.
   */
  public resolveWithContext (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): any {
    return this.usingDefaultContainer().resolveWithContext(reference, resolutionContext)
  }

  /**
   * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
   * @return {Promise<any>} A promise that resolve the objects.
   */
  public async resolveWithContextAsync (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): Promise<any> {
    return await this.usingDefaultContainer().resolveWithContextAsync(reference, resolutionContext)
  }

  /**
   * Unbind all dependencies metadata with the given alias from the container.
   * @param {string} alias Represents the alias to look for.
   */
  public unbindWithAlias (alias: string): void {
    this.unregisterDependenciesMetadataWithAlias(alias)
  }

  /**
   * Unbind the dependency metadata with the given identifier from the container.
   * @param {string} identifier Represents the identifier to look for.
   */
  public unbindWithIdentifier (identifier: string): void {
    this.unregisterDependencyMetadataWithIdentifier(identifier)
  }

  /**
   * Returns the registered dependency metadata with the given alias and identifier.
   * @param {string} identifier Represents the identifier to look for.
   * @returns {string} Return dependency metadata with the given identifier.
   */
  public getDependencyMetadataWithIdentifier (identifier: string): DependencyMetadata {
    return this.usingDefaultContainer().getDependencyMetadataWithIdentifier(identifier)
  }

  /**
   * Returns the generated identifier and register the given metadata with the given alias for his future activation.
   * @param {string} alias Represents the alias.
   * @param {DependencyMetadata} dependencyMetadata Represents the dependency metadata.
   * @returns {string} Returns the dependency metadata generated identifier.
   */
  public registerDependencyMetadata (alias: string, dependencyMetadata: DependencyMetadata): string {
    return this.usingDefaultContainer().registerDependencyMetadata(alias, dependencyMetadata)
  }

  /**
   * Unregister all registered dependencies metadata with the given alias.
   * @param {string} alias Represents the alias to to look for.
   */
  public unregisterDependenciesMetadataWithAlias (alias: string): void {
    this.usingDefaultContainer().unregisterDependenciesMetadataWithAlias(alias)
  }

  /**
   * Unregister the dependency metadata with the given alias and identifier.
   * @param {string} identifier Represents the identifier to look for.
   */
  public unregisterDependencyMetadataWithIdentifier (identifier: string): void {
    this.usingDefaultContainer().unregisterDependencyMetadataWithIdentifier(identifier)
  }

  /**
   * Removes the container with the given alias.
   * @param {string} alias Represents the alias of the container.
   */
  public removeContainer (alias: string): void {
    if (this.hasContainer(alias)) {
      delete this._containers[alias]
    } else {
      throw new Errors.InvalidDataError(`The given container alias [${alias}] is not registered.`)
    }
  }

  /**
   * Returns a boolean value specifying if the kernel has a container with the given alias.
   * @param {string} alias Represents the alias of the container.
   * @returns {boolean} True if the kernel has the container.
   */
  public hasContainer (alias: string): boolean {
    return !(!this._containers[alias])
  }

  /**
   * Dispose and release all the objects and containers in the kernel.
   */
  public dispose (): void {
    for (let containerAlias in this._containers) {
      if (this._containers.hasOwnProperty(containerAlias)) {
        this._containers[containerAlias].dispose()
        delete this._containers[containerAlias]
      }
    }
  }

  /**
   * Dispose and release all the objects and containers in the kernel asynchronous.
   * @returns {Promise<void>} A promise that dispose the kernel.
   */
  public async disposeAsync (): Promise<void> {
    this.dispose()
  }

  private createNewContainer (alias: string, supports: string[]): Container {
    if (!(this.hasContainer(alias))) {
      if (supports && supports.length > 0) {
        this.validateCiclycDependency([alias], supports)
      }

      this._containers[alias] = new BuildInContainer(this, alias)

      if (supports && supports.length > 0) {
        this._containers[alias].setSupportContainersAliases(supports)
      }

      return this._containers[alias]

    } else {
      throw new Errors.InvalidDataError(`The given container alias [${alias}] is already registered`)
    }
  }

  private getContainerizedSyntax (container: Container): ContainerizedSyntax {
    return new BuildInContainerizedSyntax(container)
  }

  private validateCiclycDependency (stack: string[], supports: string[]): void {

    if (!supports) {
      return
    }

    for (let supportAliasIndex = 0; supportAliasIndex < supports.length; supportAliasIndex++) {
      for (let stackAliasIndex = 0; stackAliasIndex < stack.length; stackAliasIndex++) {

        let supportAlias: string = supports[supportAliasIndex]

        if (supportAlias === stack[stackAliasIndex]) {
          throw new Errors.CyclicDependencyError('An cyclic dependency has been found for containers in the addition of support.', stack)
        }

        if (!this.hasContainer(supportAlias)) {
          throw new Errors.InvalidDataError(`The given support container alias [${supportAlias}] is not registered`)
        }

        stack.push(supportAlias)

        this.validateCiclycDependency(stack, this._containers[supportAlias].getSupportContainersAliases())

        stack.splice(stack.length - 1, 1)
      }
    }
  }
}
