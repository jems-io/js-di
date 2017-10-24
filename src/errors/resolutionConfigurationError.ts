import { BaseError } from './baseError'

/**
 * Represents an error triggered when the dependency metadata to resolve do not meet the suffixing resolution configuration.
 */
export class ResolutionConfigurationError extends BaseError {
  constructor (message: string) {
    super(message)
    this.name = 'ResolutionConfigurationError'
  }
}
