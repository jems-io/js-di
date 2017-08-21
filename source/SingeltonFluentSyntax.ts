import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";
import { IIdentifierReference } from "./IIdentifierReference";
import { IKernel } from "./IKernel";
import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainer } from "./IContainer";
import { DependencyMetadata } from "./DependencyMetadata";
import { IDeliveryStrategy } from "./delivery-strategy/IDeliveryStrategy";

import contextualActivator from "./ContextualActivator"

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 * @private
 */
export class SingeltonFluentSyntax implements ISingeltonFluentSyntax {
    
    private _identifier:string;
    private _kernel:IKernel;

    /**
     * Instance a new container fluent syntax connector.
     * @param {string} alias Represets the alias to bind.
     * @param {string} identifier Represents the identidier for the related object.
     * @param {string} kernel Represents the kernel that is binding the alias.
     * @memberof module:jemsDI
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
     * Specify the kernel to deliver the object as per call with the given alias.
     */
    public asPerCall():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, IDeliveryStrategy>('perCallDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as per resolution with the given alias.
     */
    public asPerResolution():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, IDeliveryStrategy>('perResolutionDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as containerized with the given alias.
     */
    public asContainerized():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, IDeliveryStrategy>('containerizedDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as singelton with the given alias.
     */
    public asSingelton():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, IDeliveryStrategy>('singletonDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as custom with the given alias.
     */
    public asCustom(deliveryStrategy:IDeliveryStrategy):void {
        this.getDependencyMetadata().deliveryStrategy = deliveryStrategy;
    }

    private getDependencyMetadata():DependencyMetadata {
        let kernel:IKernel = this.getKernel();
        let currentContainer:IContainer = kernel.getCurrentContainer();
 
        let dependencyMetadata:DependencyMetadata = currentContainer.getDependencyMetadataWithIdentifier(this.getIdentifier());

        if (!dependencyMetadata)
            throw new Error(`The container ${currentContainer.getName()} doesn\'t contain the a dependency metadata with the identifier ${this.getIdentifier()}`);
        
        return dependencyMetadata;
    }
}