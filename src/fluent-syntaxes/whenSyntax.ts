import { ResolutionContext } from "../resolutionContext";
import { DependencyMetadata } from "../dependencyMetadata";

/**
 * Represents a fluent syntax extension to setup conditions to the current alias bind.
 */
export interface WhenSyntax {
    /**
     * Setup the current alias bind to be valid when the target be an ancestor of the given type.
     * @param type Represents the type that must be the ancestor of the bind.
     * @return A syntax extention to setup conditions.
     */
    whenAncestorIs(type:Function):WhenSyntax;

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given alias.
     * @param alias Represents the alias where the bind must be injected
     * @return A syntax extention to setup conditions.
     */
    whenInjectedIntoAlias(alias:string):WhenSyntax;

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given type.
     * @param type Represents the type where the bind must be injected.
     * @return A syntax extention to setup conditions.
     */
    whenInjectedIntoType(type:Function):WhenSyntax;

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given alias.
     * @param alias Represents the alias where the bind must be exactly injected
     * @return A syntax extention to setup conditions.
     */
    whenInjectedExactlyIntoAlias(alias:string):WhenSyntax;

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given type.
     * @param type Represents the type where the bind must be exactly injected.
     * @return A syntax extention to setup conditions.
     */
    whenInjectedExactlyIntoType(type:Function):WhenSyntax;

    /**
     * Setup the current alias bind to be valid when the given validator is successfully.
     * @param validator Represents a custom validator.
     * @return A syntax extention to setup conditions.
     */
    when(validator:(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata) => boolean):WhenSyntax
}