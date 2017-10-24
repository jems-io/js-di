import { BaseError } from './baseError'

/**
 * Represents an error triggered when the dependency metadata servicing strategy is not suported.
 */
export class UnsupportedServicignStrategyError extends BaseError {
  constructor (message: string) {
    super(message)
    this.name = 'UnsupportedServicignStrategyError'
  }
}
