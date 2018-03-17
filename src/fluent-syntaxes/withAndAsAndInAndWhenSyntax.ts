import { WithSyntax } from './withSyntax'
import { AsSyntax } from './asSyntax'
import { InSyntax } from './inSyntax'
import { WhenSyntax } from './whenSyntax'

/**
 * Represents an with, as, in and when syntax to setup the dependencies, servicing, delivery and conditions.
 */
export interface WithAndAsAndInAndWhenSyntax extends WithSyntax, AsSyntax, InSyntax, WhenSyntax { }
