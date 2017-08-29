import { InsideAndToSytaxt } from "./insideAndToSytaxt";
import { BindSyntax } from "./bindSyntax";

/**
 * Represents a fluent syntax extension to bind aliases to the kernel.
 */
export class BuidInBindSyntax implements BindSyntax {
    /**
     * Creates a bind for the alias and allow fluently configure it.
     * @param alias Represents the alias to bind.
     * @return A syntax extension to associate the target or setup a container.
     */
    public bind(alias:string):InsideAndToSytaxt {
        return null; //TODO: return something.
    }
}