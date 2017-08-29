import { ResolutionContext } from './resolutionContext'
import { DependencyMetadata } from './dependencyMetadata' 

/**
 * Represents options that define some aspects of the resolutions and perform some operations before and after.
 */
export class ResolutionOption {
    /**
     * Represents the dependencies that will be replaced in the resolution
     */
    public dependencies:{[dependencyAlias:string]:any};
    
    /**
     * Represents a callback that is triggered before deliver each dependency metadata. 
     */
    public beforeResolveEach:(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata) => void;

    /**
     *  Represents a callback that is triggered after deliver each dependency metadata. 
     */
    public afterResolveEach:(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata) => void;

    /**
     *  Represents a callback that is triggered after deliver all dependency metadata. 
     */
    public afterResolve:(resolutionContext:ResolutionContext, result:any) => void;
}