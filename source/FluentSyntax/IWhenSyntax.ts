/**
 * Represents a fluent syntax extension to setup conditions to the current alias bind.
 */
import { ResolutionContext } from "../ResolutionContext";
import { DependencyMetadata } from "../DependencyMetadata";

export interface IWhenSyntax {
    /**
     * Setup the current alias bind to be valid when the target be an ancestor of the given type.
     */
    whenAncestorIs(type:Function);

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given alias.
     */
    whenInjectedIntoAlias(alias:string);

    /**
     * Setup the current alias bind to be valid when the metadata is being injected into the given type.
     */
    whenInjectedIntoType(type:Function);

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given alias.
     */
    whenInjectedExactlyIntoAlias(alias:string);

    /**
     * Setup the current alias bind to be valid when the metadata is being injected exactly into the given type.
     */
    whenInjectedExactlyIntoType(type:Function);

    /**
     * Setup the current alias bind to be valid when the given validator is successfully.
     */
    when(validator:(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata) => boolean)
}