import { IKernelReference } from "./IKernelReference";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IIdentifierReference } from "./IIdentifierReference";
import { IAliasReference } from "./IAliasReference";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernel } from "./IKernel";
import { DependencyMetadata } from "./DependencyMetadata";
import { IContainer } from "./IContainer";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 * @private
 */
export class ContainerFluentSyntax implements IContainerFluentSyntax {
    
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new container fluent syntax connector.
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
    public inContainer(containerAlias:string):void {

        let kernel:IKernel = this.getKernel();
        let currentContainer:IContainer = kernel.getCurrentContainer();

        if (containerAlias == currentContainer.getName())
            return;        

        let dependencyMetadata:DependencyMetadata = currentContainer.getDependencyMetadataWithIdentifier(this.getIdentifier());
        let alias =  currentContainer.getIdentifierAlias(this.getIdentifier());        

        if (!dependencyMetadata)
            throw new Error(`The container ${currentContainer.getName()} doesn\'t contain the a dependency metadata with the identifier ${this.getIdentifier()}`);

        currentContainer.unregisterDependencyMetadataWithIdentifier(this.getIdentifier())

        kernel.getContainer(containerAlias)
              .registerDependencyMetadata(alias, dependencyMetadata);
    }
}