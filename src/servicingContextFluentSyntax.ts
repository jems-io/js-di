import { SingeltonFluentSyntax } from "./singeltonFluentSyntax";
import { ContainerFluentSyntax } from "./containerFluentSyntax";
import { KernelReference } from "./kernelReference";

/**
 * Represents a servicing context fluent syntax that allows the kernel spcify servicing specifications for register types and objects.
 */
export interface ServicingContextFluentSyntax extends KernelReference, ContainerFluentSyntax, SingeltonFluentSyntax { }