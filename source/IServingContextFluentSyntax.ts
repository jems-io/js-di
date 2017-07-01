import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";
import { IAliasReference } from "./IAliasReference";

export interface IServingContextFluentSyntax extends IAliasReference, IKernelReference, IContainerFluentSyntax, ISingeltonFluentSyntax { }