export class UnregisteredAliasError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "UnregisteredAliasError"
    }
}