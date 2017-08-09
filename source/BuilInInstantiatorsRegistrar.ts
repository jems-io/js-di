import { ContextualActivator } from "./ContextualActivator";

import { IKernel } from "./IKernel";
import { Kernel } from "./Kernel";

import { IServicingContextFluentSyntax } from './IServicingContextFluentSyntax'
import { ServicingContextFluentSyntax } from './ServicingContextFluentSyntax'

import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { ContainerFluentSyntax } from "./ContainerFluentSyntax";

import { IContainer } from "./IContainer";
import { Container } from "./Container";

import { IContainerActivator } from "./IContainerActivator";
import { ContainerActivator } from "./ContainerActivator";

import { IAliasBindFluentSyntax } from "./IAliasBindFluentSyntax";
import { AliasBindFluentSyntax } from "./AliasBindFluentSyntax";

import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { SingeltonFluentSyntax } from "./SingeltonFluentSyntax";

/**
 * Represents a registrar to regiter all the build-in implementations.
 * @private
 */
export class BuilInInstantiatorsRegistrar {
    
    /**
     * Register all the build-in implementations to the activator.
     * @param {ContextualActivator} contextualActivator Represens the contextual activator where the implementation will be registered
     */
    registerBuildInImplementation(contextualActivator: ContextualActivator) {
        contextualActivator.setContextInstantiator<any, IKernel>('kernel', (contextType, instanceIdentifier) => new Kernel());
        contextualActivator.setContextInstantiator<IKernel, IContainer>('container', (contextType, instanceIdentifier) => {
            return new Container(contextType, instanceIdentifier);
        });        
        contextualActivator.setContextInstantiator<IContainer, IContainerActivator>('containerActivator', (contextType, instanceIdentifier) => {
            return new ContainerActivator(contextType);
        });
        contextualActivator.setContextInstantiator<IKernel, IAliasBindFluentSyntax>('aliasBindFluentSyntax', (contextType, instanceIdentifier) => {
            return new AliasBindFluentSyntax(instanceIdentifier, contextType);
        });        
        contextualActivator.setContextInstantiator<IKernel, ISingeltonFluentSyntax>('singeltonFluentSyntax', (contextType, instanceIdentifier) => {
            return new SingeltonFluentSyntax(instanceIdentifier, contextType);
        });
        contextualActivator.setContextInstantiator<IKernel, IContainerFluentSyntax>('containerFluentSyntax', (contextType, instanceIdentifier) => {
            return new ContainerFluentSyntax(instanceIdentifier, contextType);
        });
        contextualActivator.setContextInstantiator<IKernel, IServicingContextFluentSyntax>('servicingContextFluentSyntax', (contextType, instanceIdentifier) => {
            return new ServicingContextFluentSyntax(instanceIdentifier, contextType);
        });
    }
}

export default new BuilInInstantiatorsRegistrar();