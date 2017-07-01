import { IKernelReference } from "./IKernelReference";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IIdentifierReference } from "./IIdentifierReference";
import { IAliasReference } from "./IAliasReference";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernel } from "./Ikernel";
import DependencyMetadata from "./DependencyMetadata";
import { IContainer } from "./IContainer";

/**
 * Represents a container fluent syntax to specify a containers for the registered alias.
 */
export default class ContainerFluentSyntax implements IContainerFluentSyntax {
    
    private _alias:string;
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new container fluent syntax connector.
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
    public inContainer(containerAlias:string):void {

        let kernel:IKernel = this.getKernel();
        let currentContainer:IContainer = kernel.getCurrentContainer();

        if (containerAlias == currentContainer.getName())
            return;

        let dependencyMetadata:DependencyMetadata = currentContainer.getDependencyMetadataWithIdentifier(this.getAlias(), this.getIdentifier());

        if (!dependencyMetadata)
            throw new Error(`The container ${currentContainer.getName()} doesn\'t contain the a dependency metadata with the identifier ${this.getIdentifier()}`);

        currentContainer.unregisterDependencyMetadataWithIdentifier(this.getAlias(), this.getIdentifier())

        kernel.getContainer(containerAlias)
              .registerDependencyMetadata(this.getAlias(), dependencyMetadata);
    }
}