import { DependencyMetadata } from './dependencyMetadata'
import { ResolutionContext } from './resolutionContext'
import { Kernel } from './kernel'

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */
export interface Container {

    /**
     * Returns the name of the container.
     * @returns {string} The name of the kernel.
     */
  getName (): string

    /**
     * Represents the kernel that owns the container;
     */
  getKernel (): Kernel

    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * @param {string} alias Represents the alias.
     * @param {DependencyMetadata} dependencyMetadata Represents the dependency metadata.
     * @returns {string} Returns the dependency metadata generated identifier.
     */
  registerDependencyMetadata (alias: string, dependencyMetadata: DependencyMetadata): string

    /**
     * Return the alias that contain the metadta with the given identifier.
     * @param {string} identifier Represents the identifier to look for.
     */
  getIdentifierAlias (identifier: string): string

    /**
     * Returns the registered dependencies metadata with the given alias.
     * @param {string} alias Represents the alias to look for.
     * @returns {string} Returns an array of dependencies metadata with the given alias.
     */
  getDependenciesMetadataWithAlias (alias: string): DependencyMetadata[]

    /**
     * Returns the registered dependency metadata with the given alias and identifier.
     * @param {string} identifier Represents the identifier to look for.
     * @returns {string} Return dependency metadata with the given identifier.
     */
  getDependencyMetadataWithIdentifier (identifier: string): DependencyMetadata

    /**
     * Unregister all registered dependencies metadata with the given alias.
     * @param {string} alias Represents the alias to to look for.
     */
  unregisterDependenciesMetadataWithAlias (alias: string): void

    /**
     * Unregister the dependency metadata with the given alias and identifier.
     * @param {string} identifier Represents the identifier to look for.
     */
  unregisterDependencyMetadataWithIdentifier (identifier: string): void

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * @param {string} alias Represents the alias to resolve.
     */
  canResolve (alias: string): boolean

    /**
     * Return an resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
     * @returns {any} The resolved object.
     */
  resolve (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): any

    /**
     * Returns a resolved object instance asynchronous.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
     * @returns {Promise<any>} A promise that resolve the objects.
     */
  resolveAsync (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): Promise<any>

    /**
     * Set a list of container alias that will support the container resolutions.
     * @param {string[]} aliases Represents the list of container alias that support the container.
     */
  setSupportContainersAliases (aliases: string[]): void

    /**
     * Get the list of container alias that are supporting the container resolutions.
     * @return {string[]} The alises of the supports container.
     */
  getSupportContainersAliases (): string[]

    /**
     * Clean the list of support container alias.
     */
  cleanSupportContainersAlias (): void

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
  dispose (): void

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use asynchronous.
     * @returns {Promise<void>} A promise that dispose the container.
     */
  disposeAsync (): Promise<void>
}
