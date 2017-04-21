import DependencyMetadata from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";
import { IContainer } from "./IContainer";
import { ServicingStrategy } from "./ServicingStrategy";
import * as Errors from "./Errors/Index";

type IdentifierDependencyMetadataMap = {identifier:string, metadata:DependencyMetadata};

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */
export default class Container implements IContainer {

    private _aliasDependenciesMetadataMap:{[dependencyAlias:string]:{[dependencyIdentifier:string]:DependencyMetadata}};
    private _containerContent:{[dependencyAlias:string]:any}

    constructor() {
        this._aliasDependenciesMetadataMap = {};
    }

    private validateAliasArgument(alias:string):void {
        if (!alias)
            throw new Errors.InvalidDataError('Must provide an alias.', alias);
    }

    private validateIdentifierArgument(identifier:string):void{
        if (!identifier)
            throw new Errors.InvalidDataError('Must provide an identifier.', identifier);
    }


    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * @param alias Represents the alias.
     * @param dependencyMetadata Represents the dependency metadata.
     * @returns Returns the dependency metadata generated identifier.
     */
    public async registerDependencyMetadata(alias:string, dependencyMetadata:DependencyMetadata):Promise<string> {
        
        this.validateAliasArgument(alias);        
        
        let dependencyIdentifier:string = ""; //TODO: must create a grate identifier.

        if (!this._aliasDependenciesMetadataMap[alias])
            this._aliasDependenciesMetadataMap[alias] = {};
        
        this._aliasDependenciesMetadataMap[alias][dependencyIdentifier] = dependencyMetadata;
        
        return new Promise<string>(function(resolve) {
            resolve(dependencyIdentifier);
        });
    }

     /**
     * Returns the registered dependencies metadata with the given alias.
     * @param alias Represents the alias to look for.
     * @returns Returns an array of dependencies metadata with the given alias.
     */
    public async getDependenciesMetadataWithAlias(alias:string):Promise<DependencyMetadata[]> {     

        this.validateAliasArgument(alias);

        let toReturnDependenciesMetadata:DependencyMetadata[] = [];
               
        this.getIdentifierMetadataMapCollection(alias).forEach(function(map) {
            toReturnDependenciesMetadata.push(map.metadata);
        })

        return toReturnDependenciesMetadata;
    }

    /**
     * Returns the registered dependency metadata with the given alias and identifier.
     * @param alias Represents the alias to look for.
     * @param identifier Represents the identifier to look for.
     * @returns Return dependency metadata with the given identifier.    
     */
    public async getDependencyMetadataWithIdentifier(alias:string, identifier:string):Promise<DependencyMetadata> {

        this.validateAliasArgument(alias);
        this.validateIdentifierArgument(identifier);

        let dependencyIdentifierMap = this._aliasDependenciesMetadataMap[alias];
        let toReturnDependenciesMetadata:DependencyMetadata[] = [];

        if (dependencyIdentifierMap) {
            let dependencyMetadata = dependencyIdentifierMap[identifier];

            if (dependencyMetadata)
                return dependencyMetadata;
        }
        
        //TODO: create an unregisted identifier error.
        throw new Errors.UnregisteredAliasError("The container don't have a dependency metadata with the given alias and identifier.", alias + ":" + identifier);
    }

    /**
     * Unregister all registered dependencies metadata with the given alias.
     * @param alias Represents the alias to to look for.
     */
    public async unregisterDependenciesMetadataWithAlias(alias:string):Promise<void> {

        this.validateAliasArgument(alias);

        if (this._aliasDependenciesMetadataMap[alias])
            delete this._aliasDependenciesMetadataMap[alias];
        else
            throw new Errors.UnregisteredAliasError("The container don't have a dependency metadata with the given alias.", alias);
    }

    /**
     * Unregister the dependency metadata with the given alias and identifier.
     * @param alias Represents the alias to look for.
     * @param identifier Represents the identifier to look for.
     */
    public async unregisterDependencyMetadataWithIdentifier(alias:string, identifier:string):Promise<void> {

        this.validateAliasArgument(alias);
        this.validateIdentifierArgument(identifier);

        let dependencyIdentifierMap = this._aliasDependenciesMetadataMap[alias];
        let toReturnDependenciesMetadata:DependencyMetadata[] = [];

        if (dependencyIdentifierMap) 
            delete dependencyIdentifierMap[identifier];
        else        
            //TODO: create an unregisted identifier error.
            throw new Errors.UnregisteredAliasError("The container don't have a dependency metadata with the given alias and identifier.", alias + ":" + identifier);
    }

    /**
     * Returns a boolean value specifying if the container can or not resolve an alias.
     * @param alias Represents the alias to resolve.
     */
    public async canResolve(alias:string):Promise<boolean> {

        this.validateAliasArgument(alias);       

        return !(!(await this.getDependenciesMetadataWithAlias(alias)).length);
    }

    /**
     * Returns a resolved object instance.
     * @param alias Represents the alias to resolve.
     * @param containerActivator Represents the container activator.
     */
    public async resolve(alias:string, containerActivator:IContainerActivator):Promise<any> {

        this.validateAliasArgument(alias);

        let identifierMetadataMapCollection:IdentifierDependencyMetadataMap[] = this.getIdentifierMetadataMapCollection(alias);
        let activatedObjects:any[] = [];

        if (!identifierMetadataMapCollection.length)
            throw new Errors.UnregisteredAliasError('The kernel can not resolve the given alias.', alias);

        for(let metadataIndex:number = 0; metadataIndex < identifierMetadataMapCollection.length; metadataIndex++)
        {   
            let identifierMetadataMap:IdentifierDependencyMetadataMap = identifierMetadataMapCollection[metadataIndex];
            let activatedObject:any;

            switch(identifierMetadataMap.metadata.servingStrategy) {
                case ServicingStrategy.CONSTANT:
                    activatedObject = this.getConstantActivation(identifierMetadataMap.metadata);
                    break;
                case ServicingStrategy.BUILDER_FUNCTION:
                    activatedObject = await this.getBuilderFunctionActivation(alias, identifierMetadataMap.identifier, identifierMetadataMap.metadata, containerActivator);
                    break;
                case ServicingStrategy.INSTANCE:
                    activatedObject = await this.getBuilderFunctionActivation(alias, identifierMetadataMap.identifier, identifierMetadataMap.metadata, containerActivator);
                    break;
                default:
                    throw new Errors.UnsupportedServicignStrategyError('The given servicing strategy is not suported', identifierMetadataMap.metadata.servingStrategy);
            }

            if (!activatedObject)
                throw new Errors.ActivationFailError('The activated object result in a null value, the activation fail');

            activatedObjects.push(activatedObject);
        }

        return activatedObjects[0];
    }

    private getIdentifierMetadataMapCollection(alias:string):IdentifierDependencyMetadataMap[] {
        
        let dependencyIdentifierMap = this._aliasDependenciesMetadataMap[alias];
        let toReturnDependenciesMetadataMapCollection:IdentifierDependencyMetadataMap[] = [];

        if (dependencyIdentifierMap) {
            for (var dependencyIdentifier in dependencyIdentifierMap){
                if (dependencyIdentifierMap.hasOwnProperty(dependencyIdentifier)) {
                    toReturnDependenciesMetadataMapCollection.push({ 
                        identifier: dependencyIdentifier, 
                        metadata: dependencyIdentifierMap[dependencyIdentifier]
                    });
                }
            }  
        }

        return toReturnDependenciesMetadataMapCollection;
    };

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    public async dispose():Promise<void> {
        for (var dependencyAlias in this._aliasDependenciesMetadataMap){
            if (this._aliasDependenciesMetadataMap.hasOwnProperty(dependencyAlias)) {
                delete this._aliasDependenciesMetadataMap[dependencyAlias];
            }
        }   
    }

    private getConstantActivation(metadata:DependencyMetadata):any {        
        return metadata.activationReference;
    }

    private async getBuilderFunctionActivation(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator):Promise<any> {
        return await this.getActivatedObject(alias, identifier, metadata, containerActivator, false);
    }

    private async getInstanceActivation(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator):Promise<any> {        
        return await this.getActivatedObject(alias, identifier, metadata, containerActivator, true);
    }

    private async getActivatedObject(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator, useInvokation:boolean):Promise<any> {

        if (metadata.activateAsSingelton && this.existsInContent(identifier))
            return this._containerContent[identifier];
        
        let activatedObject:any = useInvokation ? await containerActivator.invoke(alias, metadata) : 
                                                  await containerActivator.activate(alias, metadata); 
        
        if (metadata.activateAsSingelton && activatedObject)
            this._containerContent[identifier] = activatedObject;
        
        return activatedObject;
    }

    private existsInContent(alias:string):boolean {
        return !(!this._containerContent[alias]);
    }
}