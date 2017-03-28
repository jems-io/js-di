import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";

/**
 * Represenst an activator that can activate objects.
 */
export interface IContainerActivator {

    /**
     * Return an activated instance of the given function reference.
     * @param Represenst the function reference to activate.
     */
    activate(functionReference):Promise<any>;

    /**
     * Return the result of the invokation of the given function reference.
     * @param Represenst the function reference to invoke.
     */
    invoke(functionReference):Promise<any>;
}