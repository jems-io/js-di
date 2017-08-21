import { IServicingStrategy } from "../servicing-strategy/IServicingStrategy";
import { IInAndWhenSyntax } from "./IInAndWhenSyntax";

/**
 * Represents a fluent syntax extension to setup the current alias bind to a servicing strategy.
 */
export interface IAsSyntax {
    /**
     * Setup the current alias bind to be served as an instace.
     * @return A syntax extension to setup the delivery and conditions.
     */
    asInstance():IInAndWhenSyntax;

    /**
     * Setup the current alias bind to be served as the result of the referenced function..
     * @return A syntax extension to setup the delivery and conditions.
     */
    asBuilderFunction():IInAndWhenSyntax;

    /**
     * Setup the current alias bind to be served as a constant.
     * @return A syntax extension to setup the delivery and conditions.
     */
    asConstant():IInAndWhenSyntax;

    /**
     * Setup the current alias bind to be served with the given servicing strategy.
     * @param servicingStrategy Represents the servicing strategy to serve the reference.
     * @return A syntax extension to setup the delivery and conditions.
     */
    as(servicingStrategy:IServicingStrategy):IInAndWhenSyntax;
}