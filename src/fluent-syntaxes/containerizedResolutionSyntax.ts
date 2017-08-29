/// <reference path="../../typings/index.d.ts" />

import { ResolutionOption } from "../resolutionOption";
import { ResolutionContext } from "../resolutionContext";
import { EventEmitter } from 'events';

/**
 * Represents a fluent extension that allows resolving dependencies with a container from the kernel fluently. 
 */
export interface ContainerizedResolutionSyntax extends EventEmitter {
    /**
     * Return an resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
     * @return {any} The resolved object.
     */
    resolve(reference:{ new ():any } | Function | string, resolutionOption?:ResolutionOption):any;

    /**
     * Return a promise that provided a resolved instance using the given reference that could be a class, function or alias.
     * @param {{ new ():any } | Function | string} reference Represents the reference that must be resolved, it could be a class, function or alias.
     * @param {ResolutionOption} resolutionOption Represents the options to resolve the the reference.
     * @return {Promise<any>} A promise that resolve the objects.
     */
    resolveAsync(reference:{ new ():any } | Function | string, resolutionOption?:ResolutionOption):Promise<any>;
}