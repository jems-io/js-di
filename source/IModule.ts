import { IKernel } from './Ikernel'

/**
 * Represents a module that perform dome additional registrations and configuration to the kernel that load it.
 */
export interface IModule {

    /**
     * Initialize the module and perform the needed configurations in the given kernel.
     * @param kernel Represents the kernel tha is loading the module.
     */
    initialize(kernel:IKernel):void;

    /**
     * Initialize the module and perform the needed configurations in the given kernel.
     * @param kernel Represents the kernel tha is loading the module.
     */
    initializeAsync(kernel:IKernel):Promise<void>;
}