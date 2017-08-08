import { ContextualActivator } from "./ContextualActivator";
import { IKernel } from "./IKernel";
import { Kernel } from "./Kernel";

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
    }
}

export default new BuilInInstantiatorsRegistrar();