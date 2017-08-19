/**
 * Represents a fluent syntax extension to associate bound aliases to its target.
 */
export interface IToSyntax {
    /**
     * Associate the given target to the current bind.
     */
    to(reference:any);
}