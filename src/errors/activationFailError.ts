import { BaseError } from './baseError'

/**
 * Represents an error triggered when an activation process fail.
 */
export class ActivationFailError extends BaseError {
    constructor(message:string) {
        super(message)
        this.name = "ActivationFailError"
    }
}