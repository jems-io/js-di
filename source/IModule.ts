import { IKernel } from './IKernel'

/**
 * Represents a module that perform dome additional registrations and configuration to the kernel that load it.
 */
export interface IModule {

    /**
     * Initialize the module and perform the needed configurations in the given kernel.
     * @param {IKernel} kernel Represents the kernel tha is loading the module.
     */
    initialize(kernel:IKernel):void;
}