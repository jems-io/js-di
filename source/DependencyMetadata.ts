import { ServicingStrategy } from "./ServicingStrategy";

/**
 * Represents the alias metadata that contain the activation and serving information of the alias.
 */
export default class DependencyMetadata {
    /**
     * Get or set the activation reference, it can be a function type, object instance, function buildier and so on.
     */
    activationReference:any;

    /**
     * Get or set the serving strategy.
     */
    servicingStrategy:ServicingStrategy;

    /**
     * Get or set a boolean value specifyiong if the reference mus be activated as a singelton.
     */
    activateAsSingelton:boolean;
}