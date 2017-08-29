import { BaseError } from './baseError'

/**
 * Represents an error triggered when the alias to resolve is not registered.
 */
export class UnregisteredAliasError extends BaseError {
    constructor(message:string) {
        super(message)
        this.name = "UnregisteredAliasError"
    }
}