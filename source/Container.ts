import DependencyMetadata from "./DependencyMetadata";
import { IContainerActivator } from "./IContainerActivator";
import { IContainer } from "./IContainer";
import { ServicingStrategy } from "./ServicingStrategy";
import * as Errors from "./Errors/Index";
import { IKernel } from "./Ikernel";
import ResolutionConfiguration from "./ResolutionConfiguration";

type IdentifierDependencyMetadataMap = {identifier:string, metadata:DependencyMetadata};
type ResolutionConfigurationLookUpResult = {outAlias:string,configuration:ResolutionConfiguration};

/**
 * Represents a container that contain aliases metadata and is capable of resolve dependencies.
 */
export default class Container implements IContainer {

    private _aliasDependenciesMetadataMap:{[dependencyAlias:string]:{[dependencyIdentifier:string]:DependencyMetadata}};
    private _containerContent:{[dependencyAlias:string]:any}
    private _supportContainerAliases:string[];
    private _kernel:IKernel;

    constructor(kernel:IKernel) {

        if (!kernel)
            throw new Errors.InvalidDataError('To initialize a container, a kernel must be provided.');

        this._kernel = kernel;
        this._aliasDependenciesMetadataMap = {};
    }

    private validateAliasArgument(alias:string):void {
        if (!alias)
            throw new Errors.InvalidDataError('An alias must be provided to perform this operation.');
    }

    private validateIdentifierArgument(identifier:string):void{
        if (!identifier)
            throw new Errors.InvalidDataError('An identifier must be provided to perform this operation.');
    }


    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * @param alias Represents the alias.
     * @param dependencyMetadata Represents the dependency metadata.
     * @returns Returns the dependency metadata generated identifier.
     */
    public async registerDependencyMetadata(alias:string, dependencyMetadata:DependencyMetadata):Promise<string> {
        
        this.validateAliasArgument(alias);        
        
        let dependencyIdentifier:string = Math.random().toString(36).substring(10);

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
        throw new Errors.UnregisteredAliasError(`The container don't have a dependency metadata with the given alias [${alias}] and the identifier [${identifier}].`);
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
            throw new Errors.UnregisteredAliasError(`The container don't have a dependency metadata with the given alias [${alias}].`);
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
            throw new Errors.UnregisteredAliasError(`The container don't have a dependency metadata with the given alias [${alias}] and the identifier [${identifier}].`);
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

        let resolutionConfiguration:ResolutionConfiguration = this._kernel.configuration.aliasSufixResolutionConfigurationMap[''];
        let identifierMetadataMapCollection:IdentifierDependencyMetadataMap[] = this.getIdentifierMetadataMapCollection(alias);
        let activatedObjects:any[] = [];

        if (!identifierMetadataMapCollection.length) {
            let resolutionConfigurationLookUpResult:ResolutionConfigurationLookUpResult = await this.getResolutionConfigurationForAlias(alias);

            if (resolutionConfigurationLookUpResult && resolutionConfigurationLookUpResult.outAlias != alias) {

                alias = resolutionConfigurationLookUpResult.outAlias;
                resolutionConfiguration = resolutionConfigurationLookUpResult.configuration;
                identifierMetadataMapCollection = this.getIdentifierMetadataMapCollection(alias);
            }
        }

        if (!identifierMetadataMapCollection.length)
            if (resolutionConfiguration.optional)
                return null;
            else
                return await this.resolveWithSupport(alias, containerActivator);      
        else {   
            if (resolutionConfiguration.quanty > 0 && resolutionConfiguration.quanty != identifierMetadataMapCollection.length)
                throw new Errors.ResolutionConfigurationError('The registered dependecy metadata quantity is not the expected in the reslution configuration.');

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
                        activatedObject = await this.getInstanceActivation(alias, identifierMetadataMap.identifier, identifierMetadataMap.metadata, containerActivator);
                        break;
                    default:
                        throw new Errors.UnsupportedServicignStrategyError('The given servicing strategy is not suported.');
                }

                if (!activatedObject)
                    throw new Errors.ActivationFailError('The activated object result in a null or undefined value, the activation fail');
                
                activatedObjects.push(activatedObject);
            }

            return  resolutionConfiguration.quanty == 1 ? activatedObjects[0] : activatedObjects; 
        }   
    }

    private async getResolutionConfigurationForAlias(alias:string):Promise<ResolutionConfigurationLookUpResult> {
       
        let posibleSufixeMatch:string = '';

        for(let aliasSufix in this._kernel.configuration.aliasSufixResolutionConfigurationMap) {
            if (this._kernel.configuration.aliasSufixResolutionConfigurationMap.hasOwnProperty(aliasSufix) &&
                alias.endsWith(aliasSufix) &&
                alias.length > posibleSufixeMatch.length) {

                posibleSufixeMatch = aliasSufix;
            }
        }
        
        return {
            outAlias: alias.substring(0, alias.length - posibleSufixeMatch.length),
            configuration: this._kernel.configuration.aliasSufixResolutionConfigurationMap[posibleSufixeMatch]
        };
    }

    private async resolveWithSupport(alias:string, containerActivator:IContainerActivator):Promise<any> {
        
        if (this._supportContainerAliases) {
            for(let supportAliasIndex = 0; supportAliasIndex < this._supportContainerAliases.length; supportAliasIndex) {
                try {
                    let supportAlias:string = this._supportContainerAliases[supportAliasIndex] == 'default' ? '' : this._supportContainerAliases[supportAliasIndex];

                    return await (await this._kernel.getContainer(supportAlias))
                                                    .resolve(alias, containerActivator);
                } catch (error) {
                    if (error instanceof Errors.UnregisteredAliasError)
                        break;
                    else
                        throw error;
                }
            }
        }

        throw new Errors.UnregisteredAliasError(`Can not resolve the given alias [${alias}].`);
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
     * Set a list of container alias that will support the container resolutions.
     * @param aliases Represents the list of container alias that support the container.
     */
    public async setSupportContainersAlias(aliases:string[]):Promise<void> {
        if (!aliases || (aliases && !aliases.length)) {
            throw new Errors.InvalidDataError('At least one coniner alias must be provided.')
        }

        for(let aliasIndex:number = 0; aliasIndex < aliases.length; aliasIndex++) {   
            let alias:string = aliases[aliasIndex] == 'default' ? '' : aliases[aliasIndex];       
            
            if (!(await this._kernel.hasContainer(alias)))
                throw new Errors.InvalidDataError('The given support container alias [' + alias + '], is not in kernel.');
        }        

        this._supportContainerAliases = aliases;
    }

    /**
     * Clean the list of support container alias.
     */
    public async cleanSupportContainersAlias():Promise<void> {
        this._supportContainerAliases = undefined;
    }

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
        return await this.getActivatedObject(alias, identifier, metadata, containerActivator, true);
    }

    private async getInstanceActivation(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator):Promise<any> {        
        return await this.getActivatedObject(alias, identifier, metadata, containerActivator, false);
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