import { IKernel } from "./Ikernel";

/**
 * Represents a reference of the kernel.
 */
export interface IKernelReference {
    /**
     * Get the kernel.
     */
    kernel():IKernel
    ;
}