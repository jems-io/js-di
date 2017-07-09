import { DependencyMetadata } from "./DependencyMetadata";

/**
     * Instance a new resolution configuration.
     * 
     * @class
     * @name ResolutionConfiguration
     * @classdesc Represents and alias flag that indicate some considerations in a object resolutions.
     * @memberof module:jemsDI
     * 
     * @property {number} quantity Represents the quantity of objects that must be resolved by the alias, if the value is 0 all dependencies with the alias will be resolved.
     * @property {boolean} optional Represents a boolean value specifying if the dependency is optional.
     */
class ResolutionConfiguration { 
    /**
     * Represents the quantity of objects that must be resolved by the alias, if the value is 0 all dependencies with the alias will be resolved.
     */
    public quantity:number;

    /**
     * Represents a boolean value specifying if the dependency is optional.
     */
    public optional:boolean;

    /**
     * Represents a functions that evaluate each alias dependency and specify if the dependency can be resolved.
     * 
     * @param {DependencyMetadata} dependency Represents the dependency that that will be resolved.
     * @returns {boolean} A boolean value specifiying if the dependency metadata can or not be resolved when using this configuration.
     */
    public dependencyFilter:(dependency:DependencyMetadata) => boolean;
}

export { ResolutionConfiguration as ResolutionConfiguration };

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

    /**
     * Represents a functions that evaluate each alias dependency and specify if the dependency can be resolved.
     * 
     * @method dependencyFilter
     * @instance
     * @memberof ResolutionConfiguration
     * @param {DependencyMetadata} dependency Represents the dependency that that will be resolved.
     * @returns {boolean} A boolean value specifiying if the dependency metadata can or not be resolved when using this configuration.
     */