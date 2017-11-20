import { ResolutionOption } from '../resolutionOption'
import { ContainerizedSyntax } from './containerizedSyntax'
import { Container } from '../container'
import { ResolutionContext } from '../resolutionContext'
import { Kernel } from '../kernel'
import { EventEmitter } from 'events'
import { DependencyMetadata } from '../dependencyMetadata'

/**
 * Represents a fluent extension that allows resolving dependencies with a container from the kernel fluently.
 */
export class BuildInContainerizedSyntax implements ContainerizedSyntax {
  /**
   * Represents the container that will perform the resolutions.
   */
  private _container: Container

  /**
   * Created a new instace of a containerized resolution syntax
   * @param contaier
   */
  constructor (contaier: Container) {
    this._container = contaier
  }

  /**
   * Return an resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
   * @return {any} The resolved object.
   */
  public resolve (reference: { new (): any } | Function | string, resolutionOption?: ResolutionOption): any {
    let resolutionContext: ResolutionContext = {
      kernel: this._container.getKernel(),
      originContainerAlias: this._container.getName(),
      currentContainerAlias: this._container.getName(),
      containerSupportingStack: [],
      aliasResolutionStack: [],
      targetResolutionStack: typeof reference !== 'string' ? [(reference as any)] : [],
      steps: ['The kernel creates the resolution context and start to resolve the given reference.'],
      resolutionOption: resolutionOption
    }

    let resolutionResult: any = this._container.resolve(reference, resolutionContext)

    return resolutionResult
  }

  /**
   * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
   * @return {Promise<any>} A promise that resolve the objects.
   */
  public async resolveAsync (reference: { new (): any } | Function | string, resolutionOption?: ResolutionOption): Promise<any> {
    return this.resolve(reference, resolutionOption)
  }

  /**
   * Return an resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
   * @return {any} The resolved object.
   */
  public resolveWithContext (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): any {
    return this._container.resolve(reference, resolutionContext)
  }

  /**
   * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
   * @return {Promise<any>} A promise that resolve the objects.
   */
  public async resolveWithContextAsync (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): Promise<any> {
    return this.resolveWithContext(reference, resolutionContext)
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
    return this._container.getDependencyMetadataWithIdentifier(identifier)
  }

  /**
   * Returns the generated identifier and register the given metadata with the given alias for his future activation.
   * @param {string} alias Represents the alias.
   * @param {DependencyMetadata} dependencyMetadata Represents the dependency metadata.
   * @returns {string} Returns the dependency metadata generated identifier.
   */
  public registerDependencyMetadata (alias: string, dependencyMetadata: DependencyMetadata): string {
    return this._container.registerDependencyMetadata(alias, dependencyMetadata)
  }

  /**
   * Unregister all registered dependencies metadata with the given alias.
   * @param {string} alias Represents the alias to to look for.
   */
  public unregisterDependenciesMetadataWithAlias (alias: string): void {
    this._container.unregisterDependenciesMetadataWithAlias(alias)
  }

  /**
   * Unregister the dependency metadata with the given alias and identifier.
   * @param {string} identifier Represents the identifier to look for.
   */
  public unregisterDependencyMetadataWithIdentifier (identifier: string): void {
    this._container.unregisterDependencyMetadataWithIdentifier(identifier)
  }
}
