import { AsSyntax } from './asSyntax'
import { InSyntax } from './inSyntax'
import { WhenSyntax } from './whenSyntax'

/**
 * Represents an as, in an when syntax to setup the servicing, delivery and conditions.
 */
export interface AsAndInAndWhenSyntax extends AsSyntax, InSyntax, WhenSyntax { }
