import { InsideSyntax } from './insideSyntax'
import { ToSyntax } from './toSyntax'         
import { InsideAndToSytax } from "./insideAndToSytax";
import { BuildInToSyntax } from "./buildInToSyntax";
import { AsAndInAndWhenSyntax } from "./asAndInAndWhenSyntax";

/**
 * Represents a fluent syntax extension to associate bound aliases to its target or setup inside a container.
 */
export class BuidInInsideAndToSytax implements InsideAndToSytax {

    /**
     * Represents the alias.
     */
    private _alias:string;

    /**
     * Creates a build in inside an to syntax with the given alias.
     * @param alias 
     */
    constructor(alias:string) {
        this._alias = alias;
    }

    /**
     * Set the current binded alias into the container with the given container alias.
     * @param containerAlias Represents the alias to look for.
     * @return A syntax extension to associate a targer to the current bind.
     */
    inside(containerAlias: string): ToSyntax {
        return new BuildInToSyntax(this._alias, containerAlias);
    }

    /**
     * Associate the given target to the current bind.
     * @param reference Represets the target that will be associated to the current bind.
     * @return A syntaxt extension to setup the servicing, delivery and conditions. 
     */
    to(reference: any): AsAndInAndWhenSyntax {
        return new BuildInToSyntax(this._alias).to(reference);
    }
}