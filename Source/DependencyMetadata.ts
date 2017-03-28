import { ServicingStrategy } from "./ServicingStrategy";

/**
 * Represents the alias metadata that contain the activation and serving information of the alias.
 */
export class DependencyMetadata {

    /**
     * Get or set the alias.
     */
    alias:string;

    /**
     * Get or set the activation reference, it can be a function type, object instance, function buildier and so on.
     */
    activationReference:any;

    /**
     * Get or set the serving strategy.
     */
    servingStrategy:ServicingStrategy;
}