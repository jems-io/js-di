import { Module } from './module'
import { DependencyMetadata } from './dependencyMetadata'
import { Container } from './container'
import { KernelConfiguration } from './kernelConfiguration'
import { ResolutionOption } from './resolutionOption'
import { ContainerizedResolutionSyntax } from './fluent-syntaxes/containerizedResolutionSyntax'
import { InsideAndToSytax } from './fluent-syntaxes/insideAndToSytax'

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies
 */
export interface Kernel extends ContainerizedResolutionSyntax {

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
     * Unbind all dependencies metadata with the given alias from the container resolution stack.
     * @param {string} alias Represents the alias to look for.
     */
  unbindWithAlias (alias: string): void

    /**
     * Unbind the dependency metadata with the given identifier from the container resolution stack.
     * @param {string} identifier Represents the identifier to look for.
     */
  unbindWithIdentifier (identifier: string): void

    /**
     * Returns a boolean value specifying if the kernel can resolve given alias with the container resolution stack.
     * @param {string} alias Represents the alias to look for.
     * @return {boolean} True if the kernel can resolve the given alias.
     */
  canResolve (alias: string): boolean

    /**
     * Return a containerized resolution syntax that allow perform resolution with an exiting container.
     * @param alias Represents the alias of the container to look for.
     * @return {ContainerizedResolutionSyntax} The containerized resolution systax.
     */
  usingContainer (alias: string): ContainerizedResolutionSyntax

    /**
     * Return a containerized resolution syntax that allow perform resolution with an temporal container.
     * @return {ContainerizedResolutionSyntax} The containerized resolution systax.
     */
  usingTemporalContainer (): ContainerizedResolutionSyntax

    /**
     * Creates and returns a container with the given alias.
     * @param {string} alias Represents the alias of the container.
     * @return {Container} The created container.
     */
  createContainer (alias: string): Container

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
     * Use the container with the given alias as a servicing container for the kernel.
     * @param {string} alias Represents the alias of the container.
     */
  useContainer (alias: string): void

    /**
     * Use the default container as a servicing container for the kernel.
     */
  useDefaultContainer (): void

    /**
     * Return the container with the given alias.
     * @param {string} alias Represents the alias to look for.
     * @return {Container} A container.
     */
  getContainer (alias: string): Container

    /**
     * Return the current container.
     * @return {Container} A container.
     */
  getCurrentContainer (): Container

    /**
     * Return the deafult container.
     * @return {Container} A container.
     */
  getDefaultContainer (): Container

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
