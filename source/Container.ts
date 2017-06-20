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
    private _name:string;

    constructor(kernel:IKernel, name:string) {

        if (!kernel)
            throw new Errors.InvalidDataError('To initialize a container, a kernel must be provided.');

        this._kernel = kernel;
        this._name = name;
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
     * Get the name of the container;
     */
    public get name():string { return this._name; };

    /**
     * Returns the generated identifier and register the given metadata with the given alias for his future activation.
     * @param alias Represents the alias.
     * @param dependencyMetadata Represents the dependency metadata.
     * @returns Returns the dependency metadata generated identifier.
     */
    public registerDependencyMetadata(alias:string, dependencyMetadata:DependencyMetadata):string {
        
        this.validateAliasArgument(alias);        
        
        let dependencyIdentifier:string = Math.random().toString(36).substring(10);

        if (!this._aliasDependenciesMetadataMap[alias])
            this._aliasDependenciesMetadataMap[alias] = {};
        
        this._aliasDependenciesMetadataMap[alias][dependencyIdentifier] = dependencyMetadata;
        
        return dependencyIdentifier;
    }

     /**
     * Returns the registered dependencies metadata with the given alias.
     * @param alias Represents the alias to look for.
     * @returns Returns an array of dependencies metadata with the given alias.
     */
    public getDependenciesMetadataWithAlias(alias:string):DependencyMetadata[] {     

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
    public getDependencyMetadataWithIdentifier(alias:string, identifier:string):DependencyMetadata {

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
    public unregisterDependenciesMetadataWithAlias(alias:string):void {

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
    public unregisterDependencyMetadataWithIdentifier(alias:string, identifier:string):void {

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
    public canResolve(alias:string):boolean {

        this.validateAliasArgument(alias);       

        return !(!(this.getDependenciesMetadataWithAlias(alias)).length);
    }

    /**
     * Returns a resolved object instance.
     * @param alias Represents the alias to resolve.
     * @param containerActivator Represents the container activator.
     */
    public resolve(alias:string, containerActivator:IContainerActivator):any {

        this.validateAliasArgument(alias);

        let resolutionConfiguration:ResolutionConfiguration = this._kernel.configuration.aliasSufixResolutionConfigurationMap['default'];
        let identifierMetadataMapCollection:IdentifierDependencyMetadataMap[] = this.getIdentifierMetadataMapCollection(alias);
        let activatedObjects:any[] = [];

        if (!identifierMetadataMapCollection.length) {
            let resolutionConfigurationLookUpResult:ResolutionConfigurationLookUpResult = this.getResolutionConfigurationForAlias(alias);

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
                return this.resolveWithSupport(alias, containerActivator);      
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
                        activatedObject = this.getBuilderFunctionActivation(alias, identifierMetadataMap.identifier, identifierMetadataMap.metadata, containerActivator);
                        break;
                    case ServicingStrategy.INSTANCE:
                        activatedObject = this.getInstanceActivation(alias, identifierMetadataMap.identifier, identifierMetadataMap.metadata, containerActivator);
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

    /**
     * Returns a resolved object instance asynchronous.
     * @param alias Represents the alias to resolve.
     * @param containerActivator Represents the container activator.
     */
    public resolveAsync(alias:string, containerActivator:IContainerActivator):Promise<any> {
        return this.resolve(alias, containerActivator);
    }

    private getResolutionConfigurationForAlias(alias:string):ResolutionConfigurationLookUpResult {
       
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

    private resolveWithSupport(alias:string, containerActivator:IContainerActivator):any {
        
        if (this._supportContainerAliases) {
            for(let supportAliasIndex = 0; supportAliasIndex < this._supportContainerAliases.length; supportAliasIndex) {
                try {
                    let supportAlias:string = this._supportContainerAliases[supportAliasIndex];

                    return (this._kernel.getContainer(supportAlias))
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
    public setSupportContainersAliases(aliases:string[]):void {
        if (!aliases || (aliases && !aliases.length)) {
            throw new Errors.InvalidDataError('At least one coniner alias must be provided.')
        }

        for(let aliasIndex:number = 0; aliasIndex < aliases.length; aliasIndex++) {   
            let alias:string = aliases[aliasIndex];       
            
            if (!(this._kernel.hasContainer(alias)))
                throw new Errors.InvalidDataError(`The given support container alias [${alias}], is not in kernel.`);
        }        

        this.validateCiclycDependency([this.name], aliases);

        this._supportContainerAliases = aliases;
    }

    private validateCiclycDependency(stack:string[], supports:string[]):void {

        if (!supports)
            return;

        for(let supportAliasIndex = 0; supportAliasIndex < supports.length; supportAliasIndex++) {
            for(let stackAliasIndex = 0; stackAliasIndex < supports.length; stackAliasIndex++) {
                
                stack.push(supports[supportAliasIndex]);          

                if (supports[supportAliasIndex] == stack[stackAliasIndex])
                    throw new Errors.CyclicDependencyError('An cyclic dependency has been found for containers in the addition of support.', stack);  

                this.validateCiclycDependency(stack, (this._kernel.getContainer(supports[supportAliasIndex])).getSupportContainersAliases());

                stack.splice(stack.length - 1, 1);
            }
        }
    }

    /**
     * Get the list of container alias that are supporting the container resolutions.
     */
    public getSupportContainersAliases():string[] {
        return this._supportContainerAliases;
    }

    /**
     * Clean the list of support container alias.
     */
    public cleanSupportContainersAlias():void {
        this._supportContainerAliases = undefined;
    }

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use.
     */
    public dispose():void {
        for (var dependencyAlias in this._aliasDependenciesMetadataMap){
            if (this._aliasDependenciesMetadataMap.hasOwnProperty(dependencyAlias)) {
                delete this._aliasDependenciesMetadataMap[dependencyAlias];
            }
        }   
    }

    /**
     * Dispose and release all instances in the container allowin the GC destroy it if no references are in use asynchronous.
     */
    public async disposeAsync():Promise<void> {
        this.dispose();
    }

    private getConstantActivation(metadata:DependencyMetadata):any {        
        return metadata.activationReference;
    }

    private getBuilderFunctionActivation(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator):any {
        return this.getActivatedObject(alias, identifier, metadata, containerActivator, true);
    }

    private getInstanceActivation(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator):any {        
        return this.getActivatedObject(alias, identifier, metadata, containerActivator, false);
    }

    private getActivatedObject(alias:string, identifier:string, metadata:DependencyMetadata, containerActivator:IContainerActivator, useInvokation:boolean):any {

        if (metadata.activateAsSingelton && this.existsInContent(identifier))
            return this._containerContent[identifier];
        
        let activatedObject:any = useInvokation ? containerActivator.invoke(alias, metadata) : 
                                                  containerActivator.activate(alias, metadata); 
        
        if (metadata.activateAsSingelton && activatedObject)
            this._containerContent[identifier] = activatedObject;
        
        return activatedObject;
    }

    private existsInContent(alias:string):boolean {
        return !(!this._containerContent[alias]);
    }
}