import { Module } from './module'
import { DependencyMetadata } from './dependencyMetadata'
import { Container } from './container'
import { KernelConfiguration } from './kernelConfiguration'
import { ResolutionOption } from './resolutionOption'
import { ContainerizedKernel } from './containerizedKernel'

/**
 * Represents a kernel that manage the type registration, instance activation and servicing strategies
 */
export interface Kernel extends ContainerizedKernel {

  /**
   * Get or set the configuration of the kernel.
   * @return {KernelConfiguration} The configuation of the kernel.
   */
  configuration: KernelConfiguration

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
   * Creates and returns a container with the given alias.
   * @param {string} alias Represents the alias of the container.
   * @param {string[]} supports Represents the aliases of the supports containers.
   * @return {Container} The created container.
   */
  createContainer (alias: string, supports?: string[]): void

  /**
   * Return a containerized resolution syntax that allow perform resolution with an exiting container.
   * @param alias Represents the alias of the container to look for.
   * @return {ContainerizedKernel} The containerized resolution systax.
   */
  usingContainer (alias: string): ContainerizedKernel

  /**
   * Return a containerized resolution syntax that allow perform resolution with the defautl container.
   * @return {ContainerizedKernel} The containerized resolution systax.
   */
  usingDefaultContainer (): ContainerizedKernel

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
