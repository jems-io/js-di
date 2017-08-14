import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";
import { IContainerActivator } from "./IContainerActivator";
import * as Errors from "./Errors/Index";
import { IContainer } from "./IContainer";
import { ResolutionContext } from "./ResolutionContext";

/**
 * Represenst an activator that can activate objects.
 * @private
 */
export class ContainerActivator implements IContainerActivator {

    private _resolutionContext:ResolutionContext;
    private _container:IContainer;

    /**
     * Instance a new container activator.
     * @param {module:jemsDI.IContainer} container Represents the container that will use the activator.
     * @memberof module:jemsDI
     */
    constructor(resolutionContext:ResolutionContext) {
        this._resolutionContext = resolutionContext;
        this._container = resolutionContext.originContainer;
    }

    /**
     * Return an activated instance of the given reference, it could be a class or function.     
     * @param {(new (...constructorArguments:any[]) => any) | ((...functionArguments:any[])  => any)} reference Represents the reference that want to be activated.
     * @return {any} The resolved instance.
     */
    public activateReference(reference:(new (...constructorArguments:any[]) => any) | ((...functionArguments:any[])  => any)):any {
        var argumets = this.getFunctionArguments(reference);

        let acivatedObject:any =new (Function.prototype.bind.apply(reference, argumets));

        return acivatedObject;
    }

    /**
     * Return an activated instance of the given function reference.
     * @param {string} alias Represenst the alias that will be ativated.
     * @param {string} functionReference Represenst the function reference to activate.
     * @return {any} The resolved instance.
     */
    public activateAlias(alias:string, functionReference:any):any {

        this.addAliasToStack(alias);     

        let acivatedObject = this.activateReference(<(new (...constructorArguments:any[]) => any) | ((...functionArguments:any[])  => any)>functionReference); 

        this.removeAliasFromStack(alias);

        return acivatedObject;                
    }

    /**
     * Return the result of the invokation of the given function reference.
     * @param {string} alias Represenst the alias that will be invoked.
     * @param {string} functionReference Represenst the function reference to invoke.
     * @return {any} The result of the invokation.
     */
    public invokeAlias(alias:string, functionReference:any):any {
        
        this.addAliasToStack(alias);
        
        let acivatedObject:any = functionReference.apply(this.getFunctionArguments(functionReference));

        this.removeAliasFromStack(alias);

        return acivatedObject;
    }

    private addAliasToStack(alias:string):void {
        if (this._resolutionContext.aliasResolutionStack.indexOf(alias) >= 0) {
            this._resolutionContext.aliasResolutionStack.push(alias);
            throw new Errors.CyclicDependencyError('An cyclic dependency has been found for arguments in the resolution of an object.', this._resolutionContext.aliasResolutionStack);
        }

        this._resolutionContext.aliasResolutionStack.push(alias);
    }

    private removeAliasFromStack(alias:string):void {

        let aliasIndex:number = this._resolutionContext.aliasResolutionStack.indexOf(alias);
        
        this._resolutionContext.aliasResolutionStack.splice(aliasIndex, 1);
    }

    private getFunctionArguments(functionReference:any):any[] {

        let functionArguments:any[] = [null];
        let functionArgumentsNames:string[] = this.getFunctionArgumentsNames(functionReference);

        if (functionArgumentsNames.length)
            this._resolutionContext.steps.push('Identifying dependencies: ' + functionArgumentsNames.join(', '));
        
        this._resolutionContext.targetResolutionStack.push(functionReference);

        for(let argumentIndex = 0; argumentIndex < functionArgumentsNames.length; argumentIndex++) {

            let argumentInstance:any = this._container.resolve(functionArgumentsNames[argumentIndex], this._resolutionContext);  
            functionArguments.push(argumentInstance);
        }

        this._resolutionContext.targetResolutionStack.splice(this._resolutionContext.targetResolutionStack.length - 1, 1);

        return functionArguments;
    }

    private getFunctionArgumentsNames(functionReference:any):string[] {

        let stringObject:string = functionReference.toString();
        let stringObjectLower = stringObject.toLowerCase();
        var args:string = '';

        if (stringObjectLower.startsWith('function')) {
            args = stringObject.match(/function\s.*?\(([^)]*)\)/)[1];
        }
        else if (stringObjectLower.startsWith('class')) {

            let constructorIndex = stringObjectLower.indexOf('constructor');

            if (constructorIndex >= 0) {
                stringObject = stringObject.substr(constructorIndex);
                args = stringObject.match('constructor\\s*\\((.*?)\\)')[1];
            }
        }
 
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