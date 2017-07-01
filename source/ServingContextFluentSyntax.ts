import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IServingContextFluentSyntax } from "./IServingContextFluentSyntax";
import { IKernel } from "./Ikernel";
import ContainerFluentSyntax from "./ContainerFluentSyntax";
import SingeltonFluentSyntax from "./SingeltonFluentSyntax";

export default class ServingContextFluentSyntax implements IServingContextFluentSyntax {
    
    private _alias:string;
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new serving context fluent syntax connector.
     * @param alias Represets the alias to bind.
     * @param identifier Represents the identidier for the related object.
     * @param kernel Represents the kernel that is binding the alias.
     */
    constructor(alias:string, identifier:string, kernel:IKernel) {
        this._alias = alias;
        this._identifier = identifier;
        this._kernel = kernel;
    }

    /**
     * Returns the alias.
     */
    public getAlias(): string { return this._alias; }

    /**
     * Returns the identifier.
     */
    public getIdentifier(): string { return this._identifier; }

    /**
     * Returns the kernel.
     */
    public getKernel(): IKernel { return this._kernel; }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     */
    inContainer(containerAlias: string): void {
        new ContainerFluentSyntax(this.getAlias(), this.getIdentifier(), this.getKernel()).inContainer(containerAlias);
    }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     */
    asSingelton(): void {
        new SingeltonFluentSyntax(this.getAlias(), this.getIdentifier(), this.getKernel()).asSingelton();  
    }
}