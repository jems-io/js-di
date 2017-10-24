import { ContextualActivator } from './contextualActivator'

import { ResolutionContext } from './resolutionContext'

import { Kernel } from './kernel'
import { BuildInKernel } from './buildInKernel'

import { Container } from './container'
import { BuildInContainer } from './buildInContainer'

import { ContainerActivator } from './containerActivator'

import { ArgumentsNamesProvider } from './argumentsNamesProvider'
import { BuildInArgumentsNamesProvider } from './buildInArgumentsNamesProvider'

import { ServicingStrategy } from './servicing-strategies/servicingStrategy'
import { InstanceServicingStrategy } from './servicing-strategies/instanceServicingStrategy'
import { ConstantServicingStrategy } from './servicing-strategies/constantServicingStrategy'
import { BuilderFunctionServicingStrategy } from './servicing-strategies/builderFunctionServicingStrategy'

import { DeliveryStrategy } from './delivery-strategies/deliveryStrategy'
import { PerCallDeliveryStrategy } from './delivery-strategies/perCallDeliveryStrategy'
import { PerResolutionDeliveryStrategy } from './delivery-strategies/perResolutionDeliveryStrategy'
import { ContainerizedDeliveryStrategy } from './delivery-strategies/containerizedDeliveryStrategy'
import { SingletonDeliveryStrategy } from './delivery-strategies/singletonDeliveryStrategy'

import { ContainerizedResolutionSyntax } from './fluent-syntaxes/containerizedResolutionSyntax'
import { BuildInContainerizedResolutionSyntax } from './fluent-syntaxes/buildInContainerizedResolutionSyntax'

/**
 * Represents a registrar to regiter all the build-in implementations.
 * @private
 */
export class BuilInInstantiatorsRegistrar {

    /**
     * Register all the build-in implementations to the activator.
     * @param {ContextualActivator} contextualActivator Represens the contextual activator where the implementation will be registered
     */
  registerBuildInImplementation (contextualActivator: ContextualActivator) {
    contextualActivator.setContextInstantiator<any, BuildInKernel>('kernel', (contextType, instanceIdentifier) => new BuildInKernel())
    contextualActivator.setContextInstantiator<BuildInKernel, BuildInContainer>('container', (contextType, instanceIdentifier) => {
      return new BuildInContainer(contextType, instanceIdentifier)
    })
    contextualActivator.setContextInstantiator<any, BuildInArgumentsNamesProvider>('argumentsNamesProvider', (contextType, instanceIdentifier) => {
      return new BuildInArgumentsNamesProvider()
    })
    contextualActivator.setContextInstantiator<BuildInContainer, BuildInContainerizedResolutionSyntax>('containerizedResolutionSyntax', (contextType, instanceIdentifier) => {
      return new BuildInContainerizedResolutionSyntax(contextType)
    })

    this.registeServicingStrategies(contextualActivator)
    this.registeDeliveryStrategies(contextualActivator)
  }

  private registeServicingStrategies (contextualActivator: ContextualActivator): void {
    contextualActivator.setContextInstantiator<any, ServicingStrategy>('instanceServicingStrategy', (contextType, instanceIdentifier) => {
      return new InstanceServicingStrategy()
    })
    contextualActivator.setContextInstantiator<any, ServicingStrategy>('constantServicingStrategy', (contextType, instanceIdentifier) => {
      return new ConstantServicingStrategy()
    })
    contextualActivator.setContextInstantiator<any, ServicingStrategy>('builderFunctionServicingStrategy', (contextType, instanceIdentifier) => {
      return new BuilderFunctionServicingStrategy()
    })
  }

  private registeDeliveryStrategies (contextualActivator: ContextualActivator): void {
    contextualActivator.setContextInstantiator<any, DeliveryStrategy>('perCallDeliveryStrategy', (contextType, instanceIdentifier) => {
      return new PerCallDeliveryStrategy()
    })
    contextualActivator.setContextInstantiator<any, DeliveryStrategy>('perResolutionDeliveryStrategy', (contextType, instanceIdentifier) => {
      return new PerResolutionDeliveryStrategy()
    })
    contextualActivator.setContextInstantiator<any, DeliveryStrategy>('containerizedDeliveryStrategy', (contextType, instanceIdentifier) => {
      return new ContainerizedDeliveryStrategy()
    })
    contextualActivator.setContextInstantiator<any, DeliveryStrategy>('singletonDeliveryStrategy', (contextType, instanceIdentifier) => {
      return new SingletonDeliveryStrategy()
    })
  }
}

export default new BuilInInstantiatorsRegistrar()
