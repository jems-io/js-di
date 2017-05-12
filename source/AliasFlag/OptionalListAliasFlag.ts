import DependencyMetadata from "../DependencyMetadata";
import { IAliasFlag } from "./IAliasFlag";

/**
 * Represents and alias flag that indicate some considerations in a object resolutions.
 */
export class OptionalListAliasFlag implements IAliasFlag {

    constructor() {
        this.quanty = 0;
        this.optional = true;
    }
    
    /**
     * Represents the quantity of objects that must be resolved by the alias, if the value is 0 all dependencies with the alias will be resolved.
     */
    quanty:number;

    /**
     * Represents a boolean value specifying if the dependency is optional.
     */
    optional:boolean;

    /**
     * Represents a functions that evaluate each alias dependency and specify if the dependency can be resolved.
     */
    dependencyFilter:(dependnecy:DependencyMetadata) => boolean;
}