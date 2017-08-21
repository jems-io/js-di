import { IKernel } from './IKernel';
import contextualActivator from './ContextualActivator'
import builInInstantiatorsRegistrar from './BuilInInstantiatorsRegistrar'

/**
 * Set an instantiator for a particular name, if exists is overrided.
 * @param {string} name Represents the name that identify the instantiator.
 * @param {(contextInstace:ContextType, instanceIdentifier:string) => InstanceType} instantiator Represents the instantiator that create and return the object.
 */
export function setContextInstantiator<ContextType, InstanceType>(name:string, instantiator:(contextInstace:ContextType, instanceIdentifier:string) => InstanceType):void {
    contextualActivator.setContextInstantiator<ContextType, InstanceType>(name, instantiator);
}

/**
 * Creates and returns a new kernel instance.
 */
export function createKernel():IKernel {
    return contextualActivator.getContextInstantiator<any, IKernel>('kernel')(null, '');
}

// Exporting accessible build-in clasess.
export * from './DependencyMetadata'
export * from './ResolutionConfiguration'

// Exporting interfaces, that define the behavior.
export * from './IAliasBindFluentSyntax';
export * from './IAliasReference';
export * from './IContainer';
export * from './IContainerActivator';
export * from './IContainerFluentSyntax';
export * from './IIdentifierReference';
export * from './IKernel';
export * from './IKernelReference';
export * from './IModule';
export * from './IServicingContextFluentSyntax';
export * from './ISingeltonFluentSyntax';
export * from "./servicing-strategy/IServicingStrategy"

// Exporting Errors
export * from './errors/Index';

// Registering all build-in implementations.
builInInstantiatorsRegistrar.registerBuildInImplementation(contextualActivator);