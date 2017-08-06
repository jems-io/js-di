/**
 * An implementation of IoC pattern based on dependency injection that allows you to granulate and decouple your libraries or applications.
 */

//Exporting accessible build-in Clasess

export * from './DependencyMetadata'
export * from './Kernel'
export * from './ResolutionConfiguration'
export * from './ServicingStrategy'

//Exporting Innerfaces

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

//Exporting Errors

import * as Errors from './Errors/Index';
export { Errors as Errors };