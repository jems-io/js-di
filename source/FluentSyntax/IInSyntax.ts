import { IDeliveryStrategy } from "../DeliveryStrategy/IDeliveryStrategy";
import { IWhenSyntax } from "./IWhenSyntax";

/**
 * Represents a fluent syntax extension to setup the current alias bind to a delivery strategy.
 */
export interface IInSyntax {
    /**
     * Setup the current alias bind to be served in each call.
     * @return A syntax extension to setup conditions.
     */
    inPerCallMode():IWhenSyntax;

    /**
     * Setup the current alias bind to be served once per each resolution process.
     * @return A syntax extension to setup conditions.
     */
    inPerResolutionMode():IWhenSyntax;

    /**
     * Setup the current alias bind to be served only once.
     * @return A syntax extension to setup conditions.
     */
    inSingletonMode():IWhenSyntax;

    /**
     * Setup the current alias bind to be served once per container.
     * @return A syntax extension to setup conditions.
     */
    inContainerizedMode():IWhenSyntax;

    /**
     * Setup the current alias bind to be delivered with the given delivery strategy.
     * @param deliveryStrategy Represents the delivery strategy to deliver the reference.
     * @return A syntax extension to setup conditions.
     */
    InMode(deliveryStrategy:IDeliveryStrategy):IWhenSyntax;
}