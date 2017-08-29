import { Kernel } from "./kernel";
import { SingeltonFluentSyntax } from "./singeltonFluentSyntax";
import { Container } from "./container";
import { DependencyMetadata } from "./dependencyMetadata";
import { DeliveryStrategy } from "./delivery-strategies/deliveryStrategy";

import contextualActivator from "./contextualActivator"

/**
 * Represents a singelton fluent syntax to specify the kernel that must return the object as a singelton.
 * @private
 */
export class BuildInSingeltonFluentSyntax implements SingeltonFluentSyntax {
    
    private _identifier:string;
    private _kernel:Kernel;

    /**
     * Instance a new container fluent syntax connector.
     * @param {string} alias Represets the alias to bind.
     * @param {string} identifier Represents the identidier for the related object.
     * @param {string} kernel Represents the kernel that is binding the alias.
     * @memberof module:jemsDI
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
     * Specify the kernel to deliver the object as per call with the given alias.
     */
    public asPerCall():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, DeliveryStrategy>('perCallDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as per resolution with the given alias.
     */
    public asPerResolution():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, DeliveryStrategy>('perResolutionDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as containerized with the given alias.
     */
    public asContainerized():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, DeliveryStrategy>('containerizedDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as singelton with the given alias.
     */
    public asSingelton():void {
        this.getDependencyMetadata().deliveryStrategy = contextualActivator.getContextInstantiator<any, DeliveryStrategy>('singletonDeliveryStrategy')(null, '');
    }

    /**
     * Specify the kernel to deliver the object as custom with the given alias.
     */
    public asCustom(deliveryStrategy:DeliveryStrategy):void {
        this.getDependencyMetadata().deliveryStrategy = deliveryStrategy;
    }

    private getDependencyMetadata():DependencyMetadata {
        let kernel:Kernel = this.getKernel();
        let currentContainer:Container = kernel.getCurrentContainer();
 
        let dependencyMetadata:DependencyMetadata = currentContainer.getDependencyMetadataWithIdentifier(this.getIdentifier());

        if (!dependencyMetadata)
            throw new Error(`The container ${currentContainer.getName()} doesn\'t contain the a dependency metadata with the identifier ${this.getIdentifier()}`);
        
        return dependencyMetadata;
    }
}