import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";

/**
 * Represenst an activator that can activate objects.
 */
export interface IContainerActivator extends IKernelReference {

    /**
     * Return and activated instance of a
     */
    activate(dependencyMetadata:DependencyMetadata)
}