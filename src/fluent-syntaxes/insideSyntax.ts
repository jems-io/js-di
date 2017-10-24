import { ToSyntax } from './toSyntax'

/**
 * Represents a fluent syntax extension to set the current binded alias inside a container.
 */
export interface InsideSyntax {
    /**
     * Set the current binded alias into the container with the given container alias.
     * @param containerAlias Represents the alias to look for.
     * @return A syntax extension to associate a targer to the current bind.
     */
  inside (containerAlias: string): ToSyntax
}
