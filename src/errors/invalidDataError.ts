import { BaseError } from './baseError'

/**
 * Represents an error triggered when a invalid data is pass to the functions in one or more arguments.
 */
export class InvalidDataError extends BaseError {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidDataError'
  }
}
