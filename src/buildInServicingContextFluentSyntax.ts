import { SingeltonFluentSyntax } from "./singeltonFluentSyntax";
import { ContainerFluentSyntax } from "./containerFluentSyntax";
import { ServicingContextFluentSyntax } from "./servicingContextFluentSyntax";
import { Kernel } from "./kernel";
import contextualActivator from './contextualActivator'

/**
 * Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
 * @private
 */
export class BuildInServicingContextFluentSyntax implements ServicingContextFluentSyntax {
    
    private _alias:string;
    private _identifier:string;
    private _kernel:Kernel;

    /**
     * Instance a new servicing context fluent syntax connector.
     * @param {string} identifier Represents the identidier for the related object.
     * @param {string} kernel Represents the kernel that is binding the alias.
     */
    constructor(identifier:string, kernel:Kernel) {
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
    public getKernel(): Kernel { return this._kernel; }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     * @param {string} containerAlias Represents the container alias that will contain the metadata.
     */
    inContainer(containerAlias: string): void {
        contextualActivator.getContextInstantiator<Kernel, ContainerFluentSyntax>('containerFluentSyntax')(this.getKernel(), this.getIdentifier()).inContainer(containerAlias);
    }

    /**
     * Specify the kernel to activate the object in the container with the given container alias.
     */
    asSingelton(): void {
        contextualActivator.getContextInstantiator<Kernel, SingeltonFluentSyntax>('singeltonFluentSyntax')(this.getKernel(), this.getIdentifier()).asSingelton();
    }
}