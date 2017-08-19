import { ResolutionOption } from "../ResolutionOption";
import { IContainerizedResolutionSyntax } from "./IContainerizedResolutionSyntax";
import { IContainer } from "../IContainer";
import { ResolutionContext } from "../ResolutionContext";
import { IKernel } from "../IKernel";

/**
 * Represents a fluent extension that allows resolving dependencies with a container from the kernel fluently. 
 */
export class ContainerizedResolutionSyntax implements IContainerizedResolutionSyntax {
    /**
     * Represents the container that will perform the resolutions.
     */
    private _container:IContainer;
    
    /**
     * Created a new instace of a containerized resolution syntax
     * @param contaier 
     */
    constructor(contaier:IContainer) {
        this._container = contaier;
    }

    /**
     * Return an resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
     * @return {any} The resolved object.
     */
    public resolve(reference:{ new ():any } | Function | string, resolutionOption?:ResolutionOption):any {
        let resolutionContext:ResolutionContext = {
            kernel: this._container.getKernel(),
            originContainer: this._container,
            currentContainer: this._container,
            containerSupportingStack: [],
            aliasResolutionStack: [],
            targetResolutionStack: typeof reference !== 'string' ? [(<any> reference)] : [],
            steps: ['The kernel creates the resolution context and start to resolve the given reference.'],
            resolutionOption: resolutionOption
        };
        
        let resolutionResult:any = this._container.resolve(reference, resolutionContext);
        
        if (this.onResolutionPerformed)
            this.onResolutionPerformed(resolutionContext);

        return resolutionResult;
    }

    /**
     * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
     * @return {Promise<any>} A promise that resolve the objects.
     */
    public async resolveAsync(reference:{ new ():any } | Function | string, resolutionOption?:ResolutionOption):Promise<any> {
        return this.resolve(this.resolve(reference, resolutionOption))
    }

    /**
     * Represents an callback triggered when a resolution is performed.
     */
    public onResolutionPerformed:(resolutionContext:ResolutionContext) => any;
}