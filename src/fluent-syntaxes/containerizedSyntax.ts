/// <reference path="../../typings/index.d.ts" />

import { ResolutionOption } from '../resolutionOption'
import { ResolutionContext } from '../resolutionContext'
import { EventEmitter } from 'events'
import { DependencyMetadata } from '../dependencyMetadata'

/**
 * Represents a fluent extension that allows resolving dependencies with a container from the kernel fluently.
 */
export interface ContainerizedSyntax {
  /**
   * Return an resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
   * @return {any} The resolved object.
   */
  resolve (reference: { new (): any } | Function | string, resolutionOption?: ResolutionOption): any

  /**
   * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
   * @return {Promise<any>} A promise that resolve the objects.
   */
  resolveAsync (reference: { new (): any } | Function | string, resolutionOption?: ResolutionOption): Promise<any>

  /**
   * Return an resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
   * @return {any} The resolved object.
   */
  resolveWithContext (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): any

  /**
   * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
   * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
   * @param {ResolutionContext} resolutionContext Represents the context of the resolution.
   * @return {Promise<any>} A promise that resolve the objects.
   */
  resolveWithContextAsync (reference: { new (): any } | Function | string, resolutionContext: ResolutionContext): Promise<any>

  /**
   * Unbind all dependencies metadata with the given alias from the container.
   * @param {string} alias Represents the alias to look for.
   */
  unbindWithAlias (alias: string): void

  /**
   * Unbind the dependency metadata with the given identifier from the container.
   * @param {string} identifier Represents the identifier to look for.
   */
  unbindWithIdentifier (identifier: string): void

  /**
   * Returns the registered dependency metadata with the given alias and identifier.
   * @param {string} identifier Represents the identifier to look for.
   * @returns {string} Return dependency metadata with the given identifier.
   */
  getDependencyMetadataWithIdentifier (identifier: string): DependencyMetadata

  /**
   * Returns the generated identifier and register the given metadata with the given alias for his future activation.
   * @param {string} alias Represents the alias.
   * @param {DependencyMetadata} dependencyMetadata Represents the dependency metadata.
   * @returns {string} Returns the dependency metadata generated identifier.
   */
  registerDependencyMetadata (alias: string, dependencyMetadata: DependencyMetadata): string

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
}
