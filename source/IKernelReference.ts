import { IKernel } from "./Ikernel";

/**
 * Represents a reference of the kernel.
 */
export interface IKernelReference {
    /**
     * Returns the kernel.
     */
    getKernel():IKernel;
}