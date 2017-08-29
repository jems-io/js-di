/**
 * Serve as an instantiator repository used to instantiate the build-in components of the library and allow override them. 
 * @private
 */
export class ContextualActivator {

    /**
     * Creates a new instance of the conext activator.
     */
    constructor() {
        this._instantiators = {};
    }

    /**
     * Represents a dictionary of instantiators that are keyed by the unique name.
     */
    private _instantiators:{ [name:string]:(contextInstace:any, instanceIdentifier:string) => any }    

    /**
     * Set an instantiator for a particular name, if exists is overrided.
     * @param {string} name Represents the name that identify the instantiator.
     * @param {(contextInstace:ContextType, instanceIdentifier:string) => InstanceType} instantiator Represents the instantiator that create and return the object.
     */
    setContextInstantiator<ContextType, InstanceType>(name:string, instantiator:(contextInstace:ContextType, instanceIdentifier:string) => InstanceType):void {
        this._instantiators[name] = instantiator;
    }

    /**
     * Get the instantiator for the provided name.
     * @param {string} name Represents the name that identify the instantiator.
     * @returns {(contextInstace:ContextType, instanceIdentifier:string) => InstanceType} The instantiator that create and return the object.
     */
    getContextInstantiator<ContextType, InstanceType>(name:string):(contextInstace:ContextType, instanceIdentifier:string) => InstanceType {
        if (!this._instantiators[name])
            throw Error(`There is no instantiator with the given name [${name}]`);

        return this._instantiators[name];
    }
}

export default new ContextualActivator();