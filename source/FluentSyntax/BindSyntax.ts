import { IInsideAndToSytaxt } from "./IInsideAndToSytaxt";
import { IBindSyntax } from "./IBindSyntax";

/**
 * Represents a fluent syntax extension to bind aliases to the kernel.
 */
export class BindSyntax implements IBindSyntax {
    /**
     * Creates a bind for the alias and allow fluently configure it.
     * @param alias Represents the alias to bind.
     * @return A syntax extension to associate the target or setup a container.
     */
    public bind(alias:string):IInsideAndToSytaxt {
        return null; //TODO: return something.
    }
}