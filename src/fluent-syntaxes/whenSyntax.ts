import { ResolutionContext } from '../resolutionContext'
import { DependencyMetadata } from '../dependencyMetadata'

/**
 * Represents a fluent syntax extension to setup conditions to the current alias bind.
 */
export interface WhenSyntax {
    /**
     * Setup the current alias bind to be valid when the target be an ancestor of the given types.
     * @param types Represents the types that must be the ancestor of the bind.
     * @return A syntax extention to setup conditions.
     */
  whenAncestorsAre (...types: Function[]): WhenSyntax

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given aliases.
     * @param aliases Represents the aliases where the bind must be injected
     * @return A syntax extention to setup conditions.
     */
  whenInjectedIntoAliases (...aliases: string[]): WhenSyntax

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given types.
     * @param types Represents the types where the bind must be injected.
     * @return A syntax extention to setup conditions.
     */
  whenInjectedIntoTypes (...types: Function[]): WhenSyntax

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given aliases.
     * @param aliases Represents the aliases where the bind must be exactly injected
     * @return A syntax extention to setup conditions.
     */
  whenInjectedExactlyIntoAliases (...aliases: string[]): WhenSyntax

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given types.
     * @param types Represents the types where the bind must be exactly injected.
     * @return A syntax extention to setup conditions.
     */
  whenInjectedExactlyIntoTypes (...types: Function[]): WhenSyntax

    /**
     * Setup the current alias bind to be valid when the given validator is successfully.
     * @param validator Represents a custom validator.
     * @return A syntax extention to setup conditions.
     */
  when (validator: (resolutionContext: ResolutionContext, dependencyMetadata: DependencyMetadata) => boolean): WhenSyntax
}
