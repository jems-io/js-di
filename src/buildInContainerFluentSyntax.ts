import { ContainerFluentSyntax } from "./containerFluentSyntax";
import { Kernel } from "./kernel";
import { DependencyMetadata } from "./dependencyMetadata";
import { Container } from "./container";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 * @private
 */
export class BuildInContainerFluentSyntax implements ContainerFluentSyntax {
    
    private _identifier:string;
    private _kernel:Kernel;

    /**
     * Instance a new container fluent syntax connector.
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
    public inContainer(containerAlias:string):void {

        let kernel:Kernel = this.getKernel();
        let currentContainer:Container = kernel.getCurrentContainer();

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