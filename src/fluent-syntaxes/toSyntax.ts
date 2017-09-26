import { AsAndInAndWhenSyntax } from "./asAndInAndWhenSyntax";

/**
 * Represents a fluent syntax extension to associate bound aliases to its target.
 */
export interface ToSyntax {
    /**
     * Associate the given target to the current bind.
     * @param reference Represets the target that will be associated to the current bind.
     * @return A syntax extension to setup the servicing, delivery and conditions. 
     */
    to(reference:any):AsAndInAndWhenSyntax;
}