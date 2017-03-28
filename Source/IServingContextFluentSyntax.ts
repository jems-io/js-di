import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";

export interface IServingContextFluentSyntax extends IContainerFluentSyntax, ISingeltonFluentSyntax, IKernelReference { }