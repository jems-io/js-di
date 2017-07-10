import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IKernel } from "./Ikernel";
import { ContainerFluentSyntax } from "./ContainerFluentSyntax";
import { SingeltonFluentSyntax } from "./SingeltonFluentSyntax";

class ServicingContextFluentSyntax implements IServicingContextFluentSyntax {
    
    private _alias:string;
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new servicing context fluent syntax connector.
     * 
     * @class
     * @name ServicingContextFluentSyntax
     * @classdesc Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
     * @implements {module:jemsDI.IServicingContextFluentSyntax}
     * @param {string} alias Represets the alias to bind.
     * @param {string} identifier Represents the identidier for the related object.
     * @param {string} kernel Represents the kernel that is binding the alias.
     * @memberof module:jemsDI
     */
    constructor(alias:string, identifier:string, kernel:IKernel) {
        this._alias = alias;
        this._identifier = identifier;
        this._kernel = kernel;
    }

    /**
     * Returns the alias.
     * 
     * @instance
     * @method getAlias
     * @memberof module:jemsDI.ServicingContextFluentSyntax
     * @returns {string} The context alias.
     */
    public getAlias(): string { return this._alias; }

    /**
     * Returns the identifier.
     * 
     * @instance
     * @method getIdentifier
     * @memberof module:jemsDI.ServicingContextFluentSyntax
     * @returns {string} The context ientifier.
     */
    public getIdentifier(): string { return this._identifier; }

    /**
     * Returns the kernel.
     * 
     * @instance
     * @method getKernel
     * @memberof module:jemsDI.ServicingContextFluentSyntax
     * @returns {string} The context kernel.
     */
    public getKernel(): IKernel { return this._kernel; }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * 
     * @instance
     * @method inContainer
     * @memberof module:jemsDI.ServicingContextFluentSyntax
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */
    inContainer(containerAlias: string): void {
        new ContainerFluentSyntax(this.getAlias(), this.getIdentifier(), this.getKernel()).inContainer(containerAlias);
    }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * 
     * @instance
     * @method asSingelton
     * @memberof module:jemsDI.ServicingContextFluentSyntax
     */
    asSingelton(): void {
        new SingeltonFluentSyntax(this.getAlias(), this.getIdentifier(), this.getKernel()).asSingelton();  
    }
}

export { ServicingContextFluentSyntax as ServicingContextFluentSyntax };