import { DependencyMetadata } from "./DependencyMetadata";
import { IKernelReference } from "./IKernelReference";

/**
 * Represenst an activator that can activate objects.
 * 
 * @memberof module:jemsDI
 */
export interface IContainerActivator {

    /**
     * Return an activated instance of the given function reference.
     * 
     * @param {string} alias Represenst the alias that will be ativated.
     * @param {string} functionReference Represenst the function reference to activate.
     */
    activate(alias:string, functionReference:any):any;

    /**
     * Return the result of the invokation of the given function reference.
     * 
     * @param {string} alias Represenst the alias that will be invoked.
     * @param {string} functionReference Represenst the function reference to invoke.
     */
    invoke(alias:string, functionReference:any):any;
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
     * Return an activated instance of the given function reference.
     * 
     * @method activate
     * @instance
     * @memberof module:jemsDI.IContainerActivator
     * @param {string} alias Represenst the alias that will be ativated.
     * @param {string} functionReference Represenst the function reference to activate.
     */

    /**
     * Return the result of the invokation of the given function reference.
     * 
     * @method invoke
     * @instance
     * @memberof module:jemsDI.IContainerActivator
     * @param {string} alias Represenst the alias that will be invoked.
     * @param {string} functionReference Represenst the function reference to invoke.
     */