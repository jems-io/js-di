import { Kernel } from './kernel'
import { Container } from './container'
import { ResolutionOption } from './resolutionOption'

/**
 * Represents a context that contain a resolution relevant information.
 */
export class ResolutionContext {
    /**
     * Represenst the kernel that is performing the resolution.
     */
  public kernel: Kernel

    /**
     * Represents the container used by the kernel to resolve the reference.
     */
  public originContainer: Container

    /**
     * Represernt the container that is currently resolving the reference as original or support.
     */
  public currentContainer: Container

    /**
     * Represents the stack of containers that are supporting the original container in the resolution.
     */
  public containerSupportingStack: string[]

    /**
     * Represents the stack of alias that are scheduled to be resolve in order to perform the resolution.
     */
  public aliasResolutionStack: string[]

    /**
     * Represents the stack of argumentable targets that are scheduled to be resolve in order to perform the resolution.
     */
  public targetResolutionStack: Function[]

    /**
     * Represents the step already taken to perform the resolution.
     */
  public steps: string[]

    /**
     * Represents the options of the resolution.
     */
  public resolutionOption: ResolutionOption
}
