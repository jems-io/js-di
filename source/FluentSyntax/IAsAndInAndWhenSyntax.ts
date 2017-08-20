import { IAsSyntax } from "./IAsSyntax";
import { IInSyntax } from "./IInSyntax";
import { IWhenSyntax } from "./IWhenSyntax";

/**
 * Represents an as and in and when syntax to setup the servicing, delivery strategies and conditions.
 */
export interface IAsAndInAndWhenSyntax extends IAsSyntax, IInSyntax, IWhenSyntax { }