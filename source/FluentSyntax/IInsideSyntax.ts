/**
 * Represents a fluent syntax extension to set the current binded alias inside a container.
 */
export interface IInsideSyntax {
    /**
     * Set the current binded alias into the container with the given container alias.
     * @param containerAlias Represents the alias to look for.
     */
    inside(containerAlias:string);
}