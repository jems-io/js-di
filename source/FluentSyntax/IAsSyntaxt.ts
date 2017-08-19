import { IServicingStrategy } from "../ServicingStrategy/IServicingStrategy";

/**
 * Represents a fluent syntax extension to setup the current alias bind to a servicing strategy.
 */
export interface IAsSyntax {
    /**
     * Setup the current alias bind to be served as an instace.
     */
    asInstance();

    /**
     * Setup the current alias bind to be served as the result of the referenced function.
     */
    asBuilderFunction();

    /**
     * Setup the current alias bind to be served as a constant.
     */
    asConstant();

    /**
     * Setup the current alias bind to be served with the given servicing strategy.
     */
    as(servicingStrategy:IServicingStrategy);
}