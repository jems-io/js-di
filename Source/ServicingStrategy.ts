export enum ServicingStrategy {

    /**
     * Make the kernel create new instances of the type on each request.
     */
     INSTANCE

    /**
     * Make the kernel return same instances of the object on each request.
     */
    ,CONSTANT

    /**
     * Make the kernel return the result of builder function on each request.
     */
    ,BUILDER_FUNCTION
}