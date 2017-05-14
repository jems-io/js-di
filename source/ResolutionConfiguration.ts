import DependencyMetadata from "./DependencyMetadata";

/**
 * Represents and alias flag that indicate some considerations in a object resolutions.
 */
export default class ResolutionConfiguration {   
    /**
     * Represents the quantity of objects that must be resolved by the alias, if the value is 0 all dependencies with the alias will be resolved.
     */
    public quanty:number;

    /**
     * Represents a boolean value specifying if the dependency is optional.
     */
    public optional:boolean;

    /**
     * Represents a functions that evaluate each alias dependency and specify if the dependency can be resolved.
     */
    public dependencyFilter:(dependency:DependencyMetadata) => boolean;
}