import { IKernel } from './Ikernel'

/**
 * Represents a module that perform dome additional registrations and configuration to the kernel that load it.
 * 
 * @interface IModule
 * @memberof module:jemsDI
 */
export interface IModule {

    /**
     * Initialize the module and perform the needed configurations in the given kernel.
     * 
     * @method initialize
     * @instance
     * @memberof module:jemsDI.IModule
     * @param {module:jemsDI.IKernel} kernel Represents the kernel tha is loading the module.
     */
    initialize(kernel:IKernel):void;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a module that perform dome additional registrations and configuration to the kernel that load it.
 * 
 * @interface IModule
 * @memberof module:jemsDI
 */

    /**
     * Initialize the module and perform the needed configurations in the given kernel.
     * 
     * @method initialize
     * @instance
     * @memberof module:jemsDI.IModule
     * @param {module:jemsDI.IKernel} kernel Represents the kernel tha is loading the module.
     */