import { Kernel } from "./kernel";

/**
 * Represents a reference of the kernel.
 */
export interface KernelReference {
    /**
     * Returns the kernel.
     * @returns {Kernel}
     */
    getKernel():Kernel;
}