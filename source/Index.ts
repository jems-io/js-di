import { IKernel } from './IKernel';
import contextualActivator from './ContextualActivator'

export function setContextInstantiator<ContextType, InstanceType>(name:string, instantiator:(contextInstace:ContextType, name:string) => InstanceType):void {
    contextualActivator.setContextInstantiator<ContextType, InstanceType>(name, instantiator);
}

export function createKernel():IKernel {
    return contextualActivator.getContextInstatiator<any, IKernel>('kernel')(this, '');
}


// Exporting accessible build-in Clasess
export * from './DependencyMetadata'
export * from './ResolutionConfiguration'
export * from './ServicingStrategy'

//Exporting Innerfaces
export { IKernel as  IKernel}
export * from './IAliasBindFluentSyntax';
export * from './IAliasReference';
export * from './IContainer';
export * from './IContainerActivator';
export * from './IContainerFluentSyntax';
export * from './IIdentifierReference';
export * from './IKernelReference';
export * from './IModule';
export * from './IServicingContextFluentSyntax';
export * from './ISingeltonFluentSyntax';

//Exporting Errors
import * as Errors from './Errors/Index';
export { Errors as Errors };