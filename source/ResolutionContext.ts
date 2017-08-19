import { IKernel } from './IKernel'
import { IContainer } from "./IContainer";
import { ResolutionOption } from "./ResolutionOption";

/**
 * Represents a context that contain a resolution relevant information.
 */
export class ResolutionContext {
    /**
     * Represenst the kernel that is performing the resolution.
     */
    public kernel:IKernel;

    /**
     * Represents the container used by the kernel to resolve the reference.
     */
    public originContainer:IContainer;

    /**
     * Represernt the container that is currently resolving the reference as original or support.
     */
    public currentContainer:IContainer;

    /**
     * Represents the stack of containers that are supporting the original container in the resolution.
     */
    public containerSupportingStack:string[];

    /**
     * Represents the stack of alias that are scheduled to be resolve in order to perform the resolution.
     */
    public aliasResolutionStack:string[];

    /**
     * Represents the stack of argumentable targets that are scheduled to be resolve in order to perform the resolution.
     */
    public targetResolutionStack:Function[];

    /**
     * Represents the step already taken to perform the resolution.
     */
    public steps:string[];

    /**
     * Represents the options of the resolution.
     */
    public resolutionOption:ResolutionOption;
}