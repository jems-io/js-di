import { ReasonedError } from "./ReasonedError";

export default class InvalidDataError extends ReasonedError {
    constructor(message:string, data:any) {
        super('Ivalid data: ' + data, message)
        this.name = "InvalidDataError"
    }
}