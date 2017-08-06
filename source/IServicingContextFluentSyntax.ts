import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";

/**
 * Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
 */
export interface IServicingContextFluentSyntax extends IAliasReference, IKernelReference, IContainerFluentSyntax, ISingeltonFluentSyntax { }