import { IAliasReference } from "./IAliasReference";
import { IKernelReference } from "./IKernelReference";
import { IServicingContextFluentSyntax } from "./IServicingContextFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 * @interface IAliasBindFluentSyntax
 * @extends IAliasReference
 * @extends IKernelReference
 * @memberof module:jemsDI
 */
export interface IAliasBindFluentSyntax extends IAliasReference, IKernelReference {
    
    /**
     * Register the context alias with an instance servicing strategy.
     * @memberof module:jemsDI.IAliasBindFluentSyntax
     * @param {function} funtionReference - Represents the funtion reference to instantiate.
     * @returns {module:jemsDI.IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */
    to(functionReference:any):IServicingContextFluentSyntax;

    /**
     * Register the context alias with a constant servicing strategy.
     * @memberof module:jemsDI.IAliasBindFluentSyntax
     * @param {any} object - Represents the object to return.
     * @returns {module:jemsDI.IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toConstant(onject:any):IContainerFluentSyntax;

    /**
     * Register the context alias with a builder function servicing strategy.
     * @memberof module:jemsDI.IAliasBindFluentSyntax
     * @param {function} builder - Represents the function that will be invoked to generate the object.
     * @returns {module:jemsDI.IContainerFluentSyntax} The fluent syntax connector for containerization.
     */
    toBuilderFunction(builder:any):IContainerFluentSyntax;
}

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents an alias fluent context that allows the kernel register types and objects in a fluent api syntax.
 * @interface IAliasBindFluentSyntax
 * @implements {module:jemsDI.IAliasReference}
 * @implements {module:jemsDI.IKernelReference}
 * @memberof module:jemsDI
 */

    /**
     * Register the context alias with an instance servicing strategy.
     * @method to
     * @instance
     * @memberof module:jemsDI.IAliasBindFluentSyntax
     * @param {function} funtionReference - Represents the funtion reference to instantiate.
     * @returns {module:jemsDI.IServicingContextFluentSyntax} The fluent syntax connector for servicing specifications.
     */

    /**
     * Register the context alias with a constant servicing strategy.
     * @method toConstant
     * @instance
     * @memberof module:jemsDI.IAliasBindFluentSyntax
     * @param {any} object - Represents the object to return.
     * @returns {module:jemsDI.IContainerFluentSyntax} The fluent syntax connector for containerization.
     */

    /**
     * Register the context alias with a builder function servicing strategy.
     * @method toBuilderFunction
     * @instance
     * @memberof module:jemsDI.IAliasBindFluentSyntax
     * @param {function} builder - Represents the function that will be invoked to generate the object.
     * @returns {module:jemsDI.IContainerFluentSyntax} The fluent syntax connector for containerization.
     */