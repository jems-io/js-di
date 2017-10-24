import { Module } from './module'
import { DependencyMetadata } from './dependencyMetadata'
import { Container } from './container'
import { KernelConfiguration } from './kernelConfiguration'
import { ResolutionOption } from './resolutionOption'
import { ContainerizedSyntax } from './fluent-syntaxes/containerizedSyntax'
import { InsideAndToSytax } from './fluent-syntaxes/insideAndToSytax'

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies
 */
export interface Kernel extends ContainerizedSyntax {

  /**
   * Returns the configuration of the kernel.
   * @return {KernelConfiguration} The configuation of the kernel.
   */
  getConfiguration (): KernelConfiguration

  /**
   * Load thegiven modules into the kernel.
   * @param {Module[]} modules Represents the modules that will be loaded in the kernel.
   */
  loadModules (modules: Module[]): void

  /**
   * Load the given modules into the kernel asynchronous.
   * @param {Module[]} modules Represents the modules that will be loaded in the kernel.
   * @return {Promise<void>} A Promise that load the modules.
   */
  loadModulesAsync (modules: Module[]): Promise<void>

  /**
   * Return an alias bind fluent syntax that allow register dependencies metadata in a fluent api syntax.
   * @param {string} alias Represents the alias to look for.
   * @return {InsideAndToSytax} A fluent bind.
   */
  bind (alias: string): InsideAndToSytax

  /**
   * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
   * @param {string} alias Represents the alias to look for.
   * @return {boolean} True if the kernel can resolve the given alias.
   */
  canResolve (alias: string): boolean

  /**
   * Creates and returns a container with the given alias.
   * @param {string} alias Represents the alias of the container.
   * @param {string[]} supports Represents the aliases of the supports containers.
   * @return {Container} The created container.
   */
  createContainer (alias: string, supports?: string[]): void

  /**
   * Return a containerized resolution syntax that allow perform resolution with an exiting container.
   * @param alias Represents the alias of the container to look for.
   * @return {ContainerizedSyntax} The containerized resolution systax.
   */
  usingContainer (alias: string): ContainerizedSyntax

  /**
   * Return a containerized resolution syntax that allow perform resolution with the defautl container.
   * @return {ContainerizedSyntax} The containerized resolution systax.
   */
  usingDefaultContainer (): ContainerizedSyntax

  /**
   * Removes the container with the given alias.
   * @param {string} alias Represents the alias of the container.
   */
  removeContainer (alias: string): void

  /**
   * Returns a boolean value specifying if the kernel has a container with the given alias.
   * @param {string} alias Represents the alias of the container.
   * @return {boolean} True if the kernel has the container.
   */
  hasContainer (alias: string): boolean

  /**
   * Dispose and release all the objects and containers in the kernel.
   */
  dispose (): void

  /**
   * Dispose and release all the objects and containers in the kernel asynchronous.
   * @return {Promise<void>} A promise that dispose the kernel.
   */
  disposeAsync (): Promise<void>
}
