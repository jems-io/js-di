import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";
import { IContainerActivator } from "./IContainerActivator";
import { IKernel } from "./Ikernel";

/**
 * Represenst an activator that can activate objects.
 */
export class ContainerActivator implements IContainerActivator {

    private _kernel:IKernel;
    private _activationStack:string[];

    constructor(kernel:IKernel) {
        this._kernel = kernel;
        this._activationStack = [];
    }

    /**
     * Return an activated instance of the given function reference.
     * @param dependencyMetadata Represenst the metadata that contains the function reference to activate.
     */
    public async activate(dependencyMetadata:DependencyMetadata):Promise<any> {

        this.addAliasToStack(dependencyMetadata.alias);        
     
        let acivatedObject:any =new (Function.prototype.bind.apply(dependencyMetadata.activationReference, this.getFunctionArguments(dependencyMetadata.activationReference)));

        this.removeAliasFromStack(dependencyMetadata.alias);

        return acivatedObject;
    }

    /**
     * Return the result of the invokation of the given function reference.
     * @param dependencyMetadata Represenst the metadata that contains the function reference to invoke.
     */
    public async invoke(dependencyMetadata:DependencyMetadata):Promise<any> {
        
        this.addAliasToStack(dependencyMetadata.alias);

        let acivatedObject:any = dependencyMetadata.activationReference.apply(this.getFunctionArguments(dependencyMetadata.activationReference));

        this.removeAliasFromStack(dependencyMetadata.alias);

        return acivatedObject;
    }

    private addAliasToStack(alias:string):void {

        if (this._activationStack.indexOf(alias) >= 0)
            throw new Error('An cyclic dependency has been foun. Criteria -> alias: ' + alias);

        this._activationStack.push(alias);
    }

    private removeAliasFromStack(alias:string):void {

        let aliasIndex:number = this._activationStack.indexOf(alias);
        
        this._activationStack.splice(aliasIndex, 1);
    }

    private getFunctionArguments(functionReference:any):any[] {
        let functionArguments:any[] = [];

        this.getFunctionArgumentsNames(functionReference).forEach(function(argumentName:string) {
            
            let argumentInstance:any = this._kernel.resolve(argumentName, this);
            
            functionArguments.push(argumentInstance);
        });

        return functionArguments;
    }

    private getFunctionArgumentsNames(functionReference:any):string[] {

        var args:string = functionReference.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
        // Split the arguments string into an array comma delimited.
        return args.split(',').map(function(arg:string) {
            // Ensure no inline comments are parsed and trim the whitespace.
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg:string) {
            // Ensure no undefined values are added.
            return arg;
        })
    }
}