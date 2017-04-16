import { ReasonedError } from "./ReasonedError";
import { ServicingStrategy } from "../ServicingStrategy";

export default class UnsupportedServicignStrategyError extends ReasonedError {
    constructor(message:string, strategy:ServicingStrategy) {
        super('The strategy [' + strategy + '] provided for the resolution is unsupported. ', message)
        this.name = "UnsupportedServicignStrategyError"
    }
}