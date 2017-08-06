import { IKernel } from "./IKernel";

/**
 * Represents a reference of the kernel.
 */
export interface IKernelReference {
    /**
     * Returns the kernel.
     * @returns {IKernel}
     */
    getKernel():IKernel;
}