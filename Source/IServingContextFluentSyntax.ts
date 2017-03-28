import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";
import { IKernelReference } from "./IKernelReference";

export interface IServingFluentContext extends IContainerFluentSyntax, ISingeltonFluentSyntax, IKernelReference { }