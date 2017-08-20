import { IAsSyntax } from "./IAsSyntax";
import { IInSyntax } from "./IInSyntax";
import { IWhenSyntax } from "./IWhenSyntax";

/**
 * Represents an as and in and when syntax to setup the delivery strategies and conditions.
 */
export interface IInAndWhenSyntax extends IInSyntax, IWhenSyntax { }