/**
 * Represents an error triggered when an activation process fail.
 */
export class ActivationFailError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "ActivationFailError"
    }
}