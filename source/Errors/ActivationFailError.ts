import { ReasonedError } from "./ReasonedError";

export default class ActivationFailError extends ReasonedError {
    constructor(message:string) {
        super(message, message)
        this.name = "ActivationFailError"
    }
}