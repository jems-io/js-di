import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";
import { IContainerActivator } from "./IContainerActivator";
import { IKernel } from "./Ikernel";

/**
 * Represenst an activator that can activate objects.
 */
export class ContainerActivator implements IContainerActivator {

    private _kernel:IKernel;

    constructor(kernel:IKernel) {
        this._kernel = kernel;
    }

    /**
     * Return an activated instance of the given function reference.
     * @param Represenst the function reference to activate.
     */
    public async activate(functionReference):Promise<any> {
        return new functionReference.apply(this.getFunctionArguments(functionReference));
    }

    /**
     * Return the result of the invokation of the given function reference.
     * @param Represenst the function reference to invoke.
     */
    public async invoke(functionReference):Promise<any> {
        return functionReference.apply(this.getFunctionArguments(functionReference));
    }

    private getFunctionArguments(functionReference:any):any[] {
        let functionArguments:any[] = [];

        this.getFunctionArgumentsNames(functionReference).forEach(function(argumentName:string) {
            
            let argumentInstance = this.resolve(argumentName, this);
            
            functionArguments.push(argumentInstance);
        });

        return functionArguments;
    }

    private getFunctionArgumentsNames(functionReference:any):string[] {

        var args = functionReference.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
        // Split the arguments string into an array comma delimited.
        return args.split(',').map(function(arg) {
            // Ensure no inline comments are parsed and trim the whitespace.
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg) {
            // Ensure no undefined values are added.
            return arg;
        })
    }
}