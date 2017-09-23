import { InsideAndToSytax } from "./insideAndToSytax";
import { BindSyntax } from "./bindSyntax";
import { BuidInInsideAndToSytax } from "./buildInInsideAndToSyntax";

/**
 * Represents a fluent syntax extension to bind aliases to the kernel.
 */
export class BuidInBindSyntax implements BindSyntax {

    /**
     * Represents the bind alias.
     */
    private _alias:string;
    
    /**
     * Creates a bind for the alias and allow fluently configure it.
     * @param alias Represents the alias to bind.
     * @return A syntax extension to associate the target or setup a container.
     */
    public bind(alias:string):InsideAndToSytax {

        this._alias = alias;

        return new BuidInInsideAndToSytax(this._alias);
    }
}