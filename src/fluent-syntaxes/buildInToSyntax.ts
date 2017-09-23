import { AsAndInAndWhenSyntax } from "./asAndInAndWhenSyntax";
import { ToSyntax } from "./toSyntax";
import { DependencyMetadata } from "../dependencyMetadata";
import { Kernel } from "../kernel";
import { Container } from "../container";

/**
 * Represents a fluent syntax extension to associate bound aliases to its target.
 */
export class BuildInToSyntax implements ToSyntax {

    /**
     * Represents the kernel that is performing the bind.
     */
    private _kernel:Kernel;

    /**
     * Repesents the alias.
     */
    private _alias:string;

    /**
     * Represents the container alias.
     */
    private _containerAlias:string;

    /**
     * Creates an build in to syntax with the given alias and container.
     * @param alias Represens the alias.
     * @param containerAlias Represents the container alias.
     */
    constructor(kernel:Kernel, alias:string, containerAlias?:string) {
        this._kernel = kernel;
        this._alias = alias;
        this._containerAlias = containerAlias;
    }

    /**
     * Associate the given target to the current bind.
     * @param reference Represets the target that will be associated to the current bind.
     * @return A syntaxt extension to setup the servicing, delivery and conditions. 
     */
    public to(reference:any):AsAndInAndWhenSyntax {

        if (!this._kernel.hasContainer(this._containerAlias))
            this._kernel.createContainer(this._containerAlias);

        let container:Container = this._kernel.createContainer(this._containerAlias);

        let identifier:string = container.registerDependencyMetadata(this._alias, {
            activationReference: reference,
            deliveryStrategy: this._kernel.getConfiguration().defaultDeliveryStrategy,
            servicingStrategy: this._kernel.getConfiguration().defaultServicingStrategy,
            validators: []        
        });
        
        return null;
    }
}