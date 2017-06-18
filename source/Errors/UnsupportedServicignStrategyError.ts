export default class UnsupportedServicignStrategyError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "UnsupportedServicignStrategyError"
    }
}