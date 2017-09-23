import { AsSyntax } from "./asSyntax";
import { InSyntax } from "./inSyntax";
import { WhenSyntax } from "./whenSyntax";
import { AsAndInAndWhenSyntax } from "./asAndInAndWhenSyntax";

/**
 * Represents an as and in and when syntax to setup the servicing, delivery strategies and conditions.
 */
export class BuildInAsAndInAndWhenSyntax implements AsAndInAndWhenSyntax { 
    asInstance(): InAndWhenSyntax {
        throw new Error("Method not implemented.");
    }
    asBuilderFunction(): InAndWhenSyntax {
        throw new Error("Method not implemented.");
    }
    asConstant(): InAndWhenSyntax {
        throw new Error("Method not implemented.");
    }
    as(servicingStrategy: ServicingStrategy): InAndWhenSyntax {
        throw new Error("Method not implemented.");
    }
    inPerCallMode(): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    inPerResolutionMode(): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    inSingletonMode(): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    inContainerizedMode(): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    InMode(deliveryStrategy: DeliveryStrategy): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    whenAncestorIs(type: Function): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    whenInjectedIntoAlias(alias: string): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    whenInjectedIntoType(type: Function): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    whenInjectedExactlyIntoAlias(alias: string): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    whenInjectedExactlyIntoType(type: Function): WhenSyntax {
        throw new Error("Method not implemented.");
    }
    when(validator: (resolutionContext: ResolutionContext, dependencyMetadata: DependencyMetadata) => boolean): WhenSyntax {
        throw new Error("Method not implemented.");
    }

}