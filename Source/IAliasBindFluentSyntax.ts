/**
 * Represents a alias fluent context that allows the kernel register types and objects in a fluent api way.
 */
export interface IAliasFluentContext {
    
    /**
     * Register the alias with a instance serving strategy.
     * @param Represents the type to instantiate.
     */
    To(type:any):void;

    /**
     * Register the alias with a constant serving strategy.
     * @param Represents the object to return.
     */
    ToConstant(onject:any):void;

    /**
     * Register the alias with a builder function serving strategy.
     * @param Represents the object to return.
     */
    ToBuilderFunction(builder:any):void
}