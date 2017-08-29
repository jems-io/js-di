import { Kernel } from './kernel'

/**
 * Represents a module that perform dome additional registrations and configuration to the kernel that load it.
 */
export interface Module {

    /**
     * Initialize the module and perform the needed configurations in the given kernel.
     * @param {Kernel} kernel Represents the kernel tha is loading the module.
     */
    initialize(kernel:Kernel):void;
}