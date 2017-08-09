import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IKernel } from "./IKernel";
import { ContainerFluentSyntax } from "./ContainerFluentSyntax";
import { SingeltonFluentSyntax } from "./SingeltonFluentSyntax";

/**
 * Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
 * @private
 */
export class ServicingContextFluentSyntax implements IServicingContextFluentSyntax {
    
    private _alias:string;
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new servicing context fluent syntax connector.
     * @param {string} identifier Represents the identidier for the related object.
     * @param {string} kernel Represents the kernel that is binding the alias.
     */
    constructor(identifier:string, kernel:IKernel) {
        this._identifier = identifier;
        this._kernel = kernel;
    }

    /**
     * Returns the identifier.
     * @returns {string} The context ientifier.
     */
    public getIdentifier(): string { return this._identifier; }

    /**
     * Returns the kernel.
     * @returns {string} The context kernel.
     */
    public getKernel(): IKernel { return this._kernel; }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */
    inContainer(containerAlias: string): void {
        new ContainerFluentSyntax(this.getIdentifier(), this.getKernel()).inContainer(containerAlias);
    }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     */
    asSingelton(): void {
        new SingeltonFluentSyntax(this.getIdentifier(), this.getKernel()).asSingelton();  
    }
}