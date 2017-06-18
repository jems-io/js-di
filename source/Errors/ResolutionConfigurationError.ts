export default class ResolutionConfigurationError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "ResolutionConfigurationError"
    }
}