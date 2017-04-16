import { ReasonedError } from "./ReasonedError";

export default class UnregisteredAliasError extends ReasonedError {
    constructor(message:string, alias:string) {
        super('The alias [' + alias + '] is not registered.', message)
        this.name = "UnregisteredAliasError"
    }
}