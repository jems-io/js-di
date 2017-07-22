import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";

/**
 * Represenst an activator that can activate objects.
 * 
 * @memberof module:jemsDI
 */
export interface IContainerActivator {
    
    /**
     * Return an activated instance of the given reference, it could be a class or function.     
     * @method activateReference
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {(new (...constructorArguments:any[]) => any) | ((...functionArguments:any[])  => any)} reference Represents the reference that want to be activated.
     * @return {any} The resolved instance.
     */
    activateReference(reference:(new (...constructorArguments:any[]) => any) | ((...functionArguments:any[])  => any)):any;

    /**
     * Return an activated instance of the given function reference.
     * 
     * @method activateAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represenst the alias that will be ativated.
     * @param {string} functionReference Represenst the function reference to activate.
     * @return {any} The resolved instance.
     */
    activateAlias(alias:string, functionReference:any):any;

    /**
     * Return the result of the invokation of the given function reference.
     * 
     * @method invokeAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represenst the alias that will be invoked.
     * @param {string} functionReference Represenst the function reference to invoke.
     * @return {any} The result of the invokation.
     */
    invokeAlias(alias:string, functionReference:any):any;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represenst an activator that can activate objects.
 * 
 * @interface IContainerActivator
 * @memberof module:jemsDI
 */

    /**
     * Return an activated instance of the given reference, it could be a class or function.     
     * @method activateReference
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {(new (...constructorArguments:any[]) => any) | ((...functionArguments:any[])  => any)} reference Represents the reference that want to be activated.
     * @return {any} The resolved instance.
     */

    /**
     * Return an activated instance of the given function reference.
     * 
     * @method activateAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represenst the alias that will be ativated.
     * @param {string} functionReference Represenst the function reference to activate.
     * @return {any} The resolved instance.
     */

    /**
     * Return the result of the invokation of the given function reference.
     * 
     * @method invokeAlias
     * @instance
     * @memberof module:jemsDI.IContainer
     * @param {string} alias Represenst the alias that will be invoked.
     * @param {string} functionReference Represenst the function reference to invoke.
     * @return {any} The result of the invokation.
     */