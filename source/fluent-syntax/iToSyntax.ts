import { IAsAndInAndWhenSyntax } from "./IAsAndInAndWhenSyntax";

/**
 * Represents a fluent syntax extension to associate bound aliases to its target.
 */
export interface IToSyntax {
    /**
     * Associate the given target to the current bind.
     * @param reference Represets the target that will be associated to the current bind.
     * @return A syntaxt extension to setup the servicing, delivery and conditions. 
     */
    to(reference:any):IAsAndInAndWhenSyntax;
}