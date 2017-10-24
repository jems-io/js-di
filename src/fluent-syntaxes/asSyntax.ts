import { ServicingStrategy } from '../servicing-strategies/servicingStrategy'
import { InAndWhenSyntax } from './inAndWhenSyntax'

/**
 * Represents a fluent syntax extension to setup the current alias bind to a servicing strategy.
 */
export interface AsSyntax {
    /**
     * Setup the current alias bind to be served as an instace.
     * @return A syntax extension to setup the delivery and conditions.
     */
  asInstance (): InAndWhenSyntax

    /**
     * Setup the current alias bind to be served as the result of the referenced function..
     * @return A syntax extension to setup the delivery and conditions.
     */
  asBuilderFunction (): InAndWhenSyntax

    /**
     * Setup the current alias bind to be served as a constant.
     * @return A syntax extension to setup the delivery and conditions.
     */
  asConstant (): InAndWhenSyntax

    /**
     * Setup the current alias bind to be served with the given servicing strategy.
     * @param servicingStrategy Represents the servicing strategy to serve the reference.
     * @return A syntax extension to setup the delivery and conditions.
     */
  as (servicingStrategy: ServicingStrategy): InAndWhenSyntax
}
