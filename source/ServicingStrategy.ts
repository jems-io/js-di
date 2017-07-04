/**
 * Represents the servicing strategy for the dependency activation.
 * @enum
 * @property {enumElement} INSTANCE Make the kernel create new instances of the type on each request.
 * @property {enumElement} CONSTANT Make the kernel return same instances of the object on each request.
 * @property {enumElement} BUILDER_FUNCTION Make the kernel return the result of builder function on each request.
 * @memberof module:jemsDI
 */
enum ServicingStrategy {
    
     INSTANCE
    
    ,CONSTANT
    
    ,BUILDER_FUNCTION
}

export { ServicingStrategy as ServicingStrategy };