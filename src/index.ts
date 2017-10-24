import { Kernel } from './kernel'
import contextualActivator from './contextualActivator'
import buildInInstantiatorsRegistrar from './buildInInstantiatorsRegistrar'

/**
 * Set an instantiator for a particular name, if exists is overrided.
 * @param {string} name Represents the name that identify the instantiator.
 * @param {(contextInstace:ContextType, instanceIdentifier:string) => InstanceType} instantiator Represents the instantiator that create and return the object.
 */
export function setContextInstantiator<ContextType, InstanceType> (name: string, instantiator: (contextInstace: ContextType, instanceIdentifier: string) => InstanceType): void {
  contextualActivator.setContextInstantiator<ContextType, InstanceType>(name, instantiator)
}

/**
 * Creates and returns a new kernel instance.
 */
export function createKernel (): Kernel {
  return contextualActivator.getContextInstantiator<any, Kernel>('kernel')(null, '')
}

// Exporting accessible build-in clasess.
export * from './dependencyMetadata'
export * from './resolutionConfiguration'

// Exporting interfaces, that define the behavior.
export * from './container'
export * from './containerActivator'
export * from './identifierReference'
export * from './kernel'
export * from './kernelReference'
export * from './module'
export * from './servicing-strategies/servicingStrategy'

// Exporting Errors
export * from './errors/index'

// Registering all build-in implementations.
buildInInstantiatorsRegistrar.registerBuildInImplementation(contextualActivator)
