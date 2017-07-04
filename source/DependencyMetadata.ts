import { ServicingStrategy } from "./ServicingStrategy";

/**
 * Instance a new
 * 
 * @class
 * @classdesc Represents the alias metadata that contain the activation and servicing information of the alias. 
 * @property {any} activationReference Get or set the activation reference, it can be a function type, object instance, function buildier and so on.
 * @property {module:jemsDI.ServicingStrategy} servicingStrategy Get or set the servicing strategy.
 * @property {boolean} activateAsSingelton Get or set a boolean value specifyiong if the reference mus be activated as a singelton.
 * @memberof module:jemsDI
 */
class DependencyMetadata {
    /**
     * Get or set the activation reference, it can be a function type, object instance, function buildier and so on.
     */
    activationReference:any;

    /**
     * Get or set the servicing strategy.
     */
    servicingStrategy:ServicingStrategy;

    /**
     * Get or set a boolean value specifyiong if the reference mus be activated as a singelton.
     */
    activateAsSingelton:boolean;
}

export { DependencyMetadata as DependencyMetadata };