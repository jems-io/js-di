import { IKernel } from "./Ikernel";

/**
 * Represents a reference of the kernel.
 * 
 * @interface IKernelReference
 * @memberof module:jemsDI
 */
export interface IKernelReference {
    /**
     * Returns the kernel.
     * 
     * @method
     * @instance
     * @memberof module:jemsDI.IKernelReference
     * @returns {module:jemsDI.IKernel}
     */
    getKernel():IKernel;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a reference of the kernel.
 * 
 * @interface IKernelReference
 * @memberof module:jemsDI
 */

    /**
     * Returns the kernel.
     * 
     * @method getKernel
     * @instance
     * @memberof module:jemsDI.IKernelReference
     * @returns {module:jemsDI.IKernel} The context kernel.
     */