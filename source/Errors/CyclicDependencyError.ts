export default class CyclicDependencyError extends Error {
    constructor(message:string, resolutionStak:string[]) {
        super(message);
        this.name = "CyclicDependencyError"
        this.resolutionStack = resolutionStak;
    }

    public resolutionStack:string[];
}