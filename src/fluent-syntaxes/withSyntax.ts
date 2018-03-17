import { ServicingStrategy } from '../servicing-strategies/servicingStrategy'
import { InAndWhenSyntax } from './inAndWhenSyntax'
import { AsAndInAndWhenSyntax } from './asAndInAndWhenSyntax'

/**
 * Represents a fluent syntax extension to setup the aliases that will repsents the argument names.
 */
export interface WithSyntax {
    /**
     * Setup the aliases that will repsents the argument names with the given aliases.
     * @param aliases Represents the aliases that will repsents the argument names.
     * @return A syntax extension to setup the serving, delivery and conditions.
     */
  with (aliases: string[]): AsAndInAndWhenSyntax
}
