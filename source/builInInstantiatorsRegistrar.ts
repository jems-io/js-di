import { ContextualActivator } from "./ContextualActivator";

import { ResolutionContext } from "./ResolutionContext";

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

import { IArgumentsNamesProvider } from "./IArgumentsNamesProvider"
import { ArgumentsNamesProvider } from "./ArgumentsNamesProvider"

import { IServicingStrategy } from "./servicing-strategy/IServicingStrategy"
import { InstanceServicingStrategy } from "./servicing-strategy/InstanceServicingStrategy"
import { ConstantServicingStrategy } from "./servicing-strategy/ConstantServicingStrategy"
import { BuilderFunctionServicingStrategy } from "./servicing-strategy/BuilderFunctionServicingStrategy"

import { IDeliveryStrategy } from "./delivery-strategy/IDeliveryStrategy";
import { PerCallDeliveryStrategy } from "./delivery-strategy/PerCallDeliveryStrategy";
import { PerResolutionDeliveryStrategy } from "./delivery-strategy/PerResolutionDeliveryStrategy";
import { ContainerizedDeliveryStrategy } from "./delivery-strategy/ContainerizedDeliveryStrategy";
import { SingletonDeliveryStrategy } from "./delivery-strategy/SingletonDeliveryStrategy";

import { IContainerizedResolutionSyntax } from "./fluent-syntax/IContainerizedResolutionSyntax";
import { ContainerizedResolutionSyntax } from "./fluent-syntax/ContainerizedResolutionSyntax";

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
        contextualActivator.setContextInstantiator<ResolutionContext, IContainerActivator>('containerActivator', (contextType, instanceIdentifier) => {
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
        contextualActivator.setContextInstantiator<any, IArgumentsNamesProvider>('argumentsNamesProvider', (contextType, instanceIdentifier) => {
            return new ArgumentsNamesProvider();
        });
        contextualActivator.setContextInstantiator<IContainer, IContainerizedResolutionSyntax>('containerizedResolutionSyntax', (contextType, instanceIdentifier) => {
            return new ContainerizedResolutionSyntax(contextType);
        });

        this.registeServicingStrategies(contextualActivator);
        this.registeDeliveryStrategies(contextualActivator);
    }

    private registeServicingStrategies(contextualActivator: ContextualActivator):void {
        contextualActivator.setContextInstantiator<any, IServicingStrategy>('instanceServicingStrategy', (contextType, instanceIdentifier) => {
            return new InstanceServicingStrategy();
        });
        contextualActivator.setContextInstantiator<any, IServicingStrategy>('constantServicingStrategy', (contextType, instanceIdentifier) => {
            return new ConstantServicingStrategy();
        });
        contextualActivator.setContextInstantiator<any, IServicingStrategy>('builderFunctionServicingStrategy', (contextType, instanceIdentifier) => {
            return new BuilderFunctionServicingStrategy();
        });
    }

    private registeDeliveryStrategies(contextualActivator: ContextualActivator):void {
        contextualActivator.setContextInstantiator<any, IDeliveryStrategy>('perCallDeliveryStrategy', (contextType, instanceIdentifier) => {
            return new PerCallDeliveryStrategy();
        });
        contextualActivator.setContextInstantiator<any, IDeliveryStrategy>('perResolutionDeliveryStrategy', (contextType, instanceIdentifier) => {
            return new PerResolutionDeliveryStrategy();
        });
        contextualActivator.setContextInstantiator<any, IDeliveryStrategy>('containerizedDeliveryStrategy', (contextType, instanceIdentifier) => {
            return new ContainerizedDeliveryStrategy();
        });
        contextualActivator.setContextInstantiator<any, IDeliveryStrategy>('singletonDeliveryStrategy', (contextType, instanceIdentifier) => {
            return new SingletonDeliveryStrategy();
        });
    }
}

export default new BuilInInstantiatorsRegistrar();