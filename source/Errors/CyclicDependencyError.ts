import { ReasonedError } from "./ReasonedError";

export default class CyclicDependencyError extends ReasonedError {
    constructor(message:string, resolutionStak:string[]) {
        super('The resolution stack has a cyclic dependency.:' + resolutionStak, message)
        this.name = "CyclicDependencyError"
    }
}