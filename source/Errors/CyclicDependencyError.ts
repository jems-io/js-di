export class CyclicDependencyError extends Error {
    constructor(message:string, cyclicStack:string[]) {
        super(message);
        this.name = "CyclicDependencyError"
        this.cyclicStack = cyclicStack;
    }

    public cyclicStack:string[];
}