import DependencyMetadata from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";
import { IContainerActivator } from "./IContainerActivator";
import * as Errors from "./Errors/Index";
import { IContainer } from "./IContainer";

/**
 * Represenst an activator that can activate objects.
 */
export default class ContainerActivator implements IContainerActivator {

    private _container:IContainer;
    private _activationStack:string[];

    constructor(container:IContainer) {
        this._container = container;
        this._activationStack = [];        
    }

    /**
     * Return an activated instance of the given function reference.
     * @param dependencyMetadata Represenst the metadata that contains the function reference to activate.
     */
    public async activate(alias:string, dependencyMetadata:DependencyMetadata):Promise<any> {

        this.addAliasToStack(alias);     

        var argumets = await this.getFunctionArguments(dependencyMetadata.activationReference);

        let acivatedObject:any =new (Function.prototype.bind.apply(dependencyMetadata.activationReference, argumets));

        this.removeAliasFromStack(alias);

        return acivatedObject;
        
    }

    /**
     * Return the result of the invokation of the given function reference.
     * @param dependencyMetadata Represenst the metadata that contains the function reference to invoke.
     */
    public async invoke(alias:string, dependencyMetadata:DependencyMetadata):Promise<any> {
        
        this.addAliasToStack(alias);
        
        let acivatedObject:any = dependencyMetadata.activationReference.apply(await this.getFunctionArguments(dependencyMetadata.activationReference));

        this.removeAliasFromStack(alias);

        return acivatedObject;
    }

    private addAliasToStack(alias:string):void {  

        if (this._activationStack.indexOf(alias) >= 0) {
            this._activationStack.push(alias);
            throw new Errors.CyclicDependencyError('An cyclic dependency has been found for arguments in the resolution of an object.', this._activationStack);
        }

        this._activationStack.push(alias);
    }

    private removeAliasFromStack(alias:string):void {

        let aliasIndex:number = this._activationStack.indexOf(alias);
        
        this._activationStack.splice(aliasIndex, 1);
    }

    private async getFunctionArguments(functionReference:any):Promise<any[]> {

        let functionArguments:any[] = [null];
        let functionArgumentsNames:string[] = this.getFunctionArgumentsNames(functionReference);
        
        for(let argumentIndex = 0; argumentIndex < functionArgumentsNames.length; argumentIndex++) {

            let argumentInstance:any = await this._container.resolve(functionArgumentsNames[argumentIndex], this);  
            functionArguments.push(argumentInstance);
        }

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