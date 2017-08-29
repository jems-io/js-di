import { AsSyntax } from "./asSyntax";
import { InSyntax } from "./inSyntax";
import { WhenSyntax } from "./whenSyntax";

/**
 * Represents an as and in and when syntax to setup the servicing, delivery strategies and conditions.
 */
export interface AsAndInAndWhenSyntax extends AsSyntax, InSyntax, WhenSyntax { }