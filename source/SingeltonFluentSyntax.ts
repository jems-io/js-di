import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IIdentifierReference } from "./IIdentifierReference";
import { IKernel } from "./IKernel";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainer } from "./IContainer";
import { DependencyMetadata } from "./DependencyMetadata";

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 * @private
 */
export class SingeltonFluentSyntax implements ISingeltonFluentSyntax {
    
    private _alias:string;
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new container fluent syntax connector.
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
     * @returns {string} The context alias.
     */
    public getAlias(): string { return this._alias; }

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
     * Specify the kernel to serv the object as singelton with the given alias.
     */
    public asSingelton():void {
        let kernel:IKernel = this.getKernel();
        let currentContainer:IContainer = kernel.getCurrentContainer();
 
        let dependencyMetadata:DependencyMetadata = currentContainer.getDependencyMetadataWithIdentifier(this.getAlias(), this.getIdentifier());

        if (!dependencyMetadata)
            throw new Error(`The container ${currentContainer.getName()} doesn\'t contain the a dependency metadata with the identifier ${this.getIdentifier()}`);
        
        dependencyMetadata.activateAsSingelton = true;
    }
}