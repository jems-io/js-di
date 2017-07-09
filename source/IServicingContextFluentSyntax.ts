import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";

/**
 * Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
 * 
 * @memberof module:jemsDI
 */
export interface IServicingContextFluentSyntax extends IAliasReference, IKernelReference, IContainerFluentSyntax, ISingeltonFluentSyntax { }

//=============================================================================//
//             The redundancy is for documentation purpose                  
//=============================================================================//

/**
 * Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
 *
 * @interface IServicingContextFluentSyntax
 * @implements {module:jemsDI.IAliasReference}
 * @implements {module:jemsDI.IIdentifierReference}
 * @implements {module:jemsDI.IKernelReference}
 * @memberof module:jemsDI
 */