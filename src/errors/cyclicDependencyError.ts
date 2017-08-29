import { BaseError } from './baseError'

/**
 * Represents an error triggered when a cyclic dependency has been identified. 
 */
export class CyclicDependencyError extends BaseError {
    constructor(message:string, cyclicStack:string[]) {
        super(message);
        this.name = "CyclicDependencyError"
        this.cyclicStack = cyclicStack;
    }

    public cyclicStack:string[];
}