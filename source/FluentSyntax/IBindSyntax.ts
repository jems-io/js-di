/**
 * Represents a fluent syntax extension to bind aliases to the kernel.
 */
export interface IBindSyntax {
    /**
     * Creates a bind for the alias and allow fluently configure it.
     */
    bind(alias:string);
}