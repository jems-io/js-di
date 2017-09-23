import { InsideSyntax } from './insideSyntax'
import { ToSyntax } from './toSyntax'         

/**
 * Represents a fluent syntax extension to associate bound aliases to its target or setup inside a container.
 */
export interface InsideAndToSytax extends InsideSyntax, ToSyntax {}