import { IInsideSyntax } from './IInsideSyntax'
import { IToSyntax } from './IToSyntax'         

/**
 * Represents a fluent syntax extension to associate bound aliases to its target or setup inside a container.
 */
export interface IInsideAndToSytaxt extends IInsideSyntax, IToSyntax {}