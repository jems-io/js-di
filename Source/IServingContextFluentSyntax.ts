import { ISingeltonFluentSyntax } from "./ISingeltonFluentSyntax";
import { IContainerFluentSyntax } from "./IContainerFluentSyntax";

export interface IServingFluentContext extends IContainerFluentSyntax, ISingeltonFluentSyntax {
    /**
     * set the context alias to the given container with the alias.
     */
    inContainer(containerAlias:string):void;

    /**
     * Bind the context alias to as s
     */
    inSingelton():void;
}