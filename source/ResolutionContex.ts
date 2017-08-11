import { IKernel } from './IKernel'
import { IContainer } from "./IContainer";

/**
 * Represents a context that contain a resolution relevant information.
 */
export class ResolutionContext {
    public kernel:IKernel;
    public originContainer:IContainer;
    public currentContainer:IContainer;
    public containerSupportingStack:string[];
    public aliasResolutionStack:string[];
    public targetResolutionStack:string[];
    public steps:string[];
}