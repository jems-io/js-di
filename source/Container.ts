import DependencyMetadata from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";
import { IContainer } from "./IContainer";
import { ServicingStrategy } from "./ServicingStrategy";
import * as Errors from "./Errors/Index";

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */

export default class Container implements IContainer { 

    private _dependenciesMetadata:{[dependencyAlias:string]:DependencyMetadata};
    private _containerContent:{[dependencyAlias:string]:any}

    constructor() {
        this._dependenciesMetadata = {};
    }

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    public async dispose() {
        for (var dependencyAlias in this._dependenciesMetadata){
            if (this._dependenciesMetadata.hasOwnProperty(dependencyAlias)) {
                delete this._dependenciesMetadata[dependencyAlias];
            }
        }        
    }
    
    /**
     * Register the dependency metadata that allow container resolve aliases.
     * @param dependencyMetadata Represents the dependency metadata.
     */
    public async registerDependencyMetadata(dependencyMetadata:DependencyMetadata) {

        if (!dependencyMetadata.alias)
            throw new Errors.InvalidDataError('The dependency metadata must contain an alias.', dependencyMetadata.alias);

        this._dependenciesMetadata[dependencyMetadata.alias] = dependencyMetadata;        
    }

    /**
     * Unregister the dependency metadata that allow container resolve aliases.
     * @param alias Represents the alias to unregister.
     */
    public async unregisterDependencyMetadata(alias:string) {

        if (!alias)
            throw new Errors.InvalidDataError('Must provide an alias', alias);

        if (!this._dependenciesMetadata[alias])
            throw new Errors.UnregisteredAliasError('The given alias to remove dont exist in the container', alias);

        delete this._dependenciesMetadata[alias];        
    }

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * @param alias Represents the alias to resolve.
     */
    public async canResolve(alias:string):Promise<boolean> {
        return !(!this._dependenciesMetadata[alias]);
    }

    /**
     * Returns a resolved object instance.
     * @param alias Represents the alias to resolve.
     * @param containerActivator Represents the container activator.
     */
    public async resolve(alias:string, containerActivator:IContainerActivator):Promise<any> {

        let metadata:DependencyMetadata = this._dependenciesMetadata[alias];
        let activatedObject:any;

        if (!metadata)
            throw new Errors.UnregisteredAliasError('The kernel can not resolve the given alias.', alias);
        
        switch(metadata.servingStrategy) {
            case ServicingStrategy.CONSTANT:
                activatedObject = this.getConstantActivation(metadata);
                break;
            case ServicingStrategy.BUILDER_FUNCTION:
                activatedObject = await this.getBuilderFunctionActivation(metadata, containerActivator);
                break;
            case ServicingStrategy.INSTANCE:
                activatedObject = await this.getBuilderFunctionActivation(metadata, containerActivator);
                break;
            default:
                throw new Errors.UnsupportedServicignStrategyError('The given servicing strategy is not suported', metadata.servingStrategy);
        }

        if (!activatedObject)
            throw new Errors.ActivationFailError('The activated object result in a null value, the activation fail');

        return activatedObject;        
    }


    private getConstantActivation(metadata:DependencyMetadata):any {        
        return metadata.activationReference;
    }

    private async getBuilderFunctionActivation(metadata:DependencyMetadata, containerActivator:IContainerActivator):Promise<any> {
        return await this.getActivatedObject(metadata, containerActivator, false);
    }

    private async getInstanceActivation(metadata:DependencyMetadata, containerActivator:IContainerActivator):Promise<any> {        
        return await this.getActivatedObject(metadata, containerActivator, true);
    }

    private async getActivatedObject(metadata:DependencyMetadata, containerActivator:IContainerActivator, useInvokation:boolean):Promise<any> {

        if (metadata.activateAsSingelton && this.existsInContent(metadata.alias))
            return this._containerContent[metadata.alias];
        
        let activatedObject:any = useInvokation ? await containerActivator.invoke(metadata) : 
                                                  await containerActivator.activate(metadata); 
        
        if (metadata.activateAsSingelton && activatedObject)
            this._containerContent[metadata.alias] = activatedObject;
        
        return activatedObject;
    }

    private existsInContent(alias:string):boolean {
        return !(!this._containerContent[alias]);
    }
}