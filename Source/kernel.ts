import { IModule } from './IModule'
import { ServicingStrategy } from './ServicingStrategy'
import { IkernerlBinding } from './IkernerlBinding'

/**
 * Represents a kernel that manage the type registration, instance activation and serving strategies
 */
export class Kernel {

    private _loadedModules:IModule[];


    /**
     * Load thegiven modules into the kernel.
     * @param modules Represents the modules that will be loaded in the kernel.
     */
    loadModules(modules:IModule[]):void {
        modules.forEach(function(module:IModule) {            
            module.initialize(this);
            this._loadedModules.push(module);
        });
    }

    /**
     * Register an type or object to the kernel for his future activation.
     * @param alias Represents the alias of the type or object to register.
     * @param activationReference Represents the type or object reference to serv.
     * @param activationStrategy Represents the strategy to serv the type or object.
     */
    register(alias:string, activationReference:any, activationStrategy:ServicingStrategy):void;

    /**
     * Unregister an alias from the kernel.
     * @param alias Represents the alias to unregister from the kernel.
     */
    unregister(alias:string):void

    /**
     * Return a kernel binding that allow register types and object in a fluent api way.
     * @param alias Represents the alias to register in the kernel.
     */
    bind(alias:string):IkernerlBinding;

    /**
     * Unbind an alias from the kernel.
     * @param alias Represents the alias to unbind.
     */
    unbind(alias:string):void

    /**
     * Get an activeted objet by the given alias.
     * @param alias Represents the alias that is referenced to the type or object.
     */
    get(alias:string):void;
    
    /**
     * Dispose and release all the objects and containers in the kernel.
     */
    dispose():void;

    /**
     * Get an resolved and activated instance of that is registered with the given type.
     * @param alias Represents the alias to look for.
     */
    get(alias:string); 
}