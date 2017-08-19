import { IDeliveryStrategy } from "../DeliveryStrategy/IDeliveryStrategy";

/**
 * Represents a fluent syntax extension to setup the current alias bind to a delivery strategy.
 */
export interface IInSyntax {
    /**
     * Setup the current alias bind to be served in each call.
     */
    inPerCallMode();

    /**
     * Setup the current alias bind to be served once per each resolution process.
     */
    inPerResolutionMode();

    /**
     * Setup the current alias bind to be served only once.
     */
    inSingletonMode();

    /**
     * Setup the current alias bind to be served once per container.
     */
    inContainerizedMode();

    /**
     * Setup the current alias bind to be delivered with the given delivery strategy.
     */
    InMode(deliveryStrategy:IDeliveryStrategy);
}