export default class ActivationFailError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "ActivationFailError"
    }
}