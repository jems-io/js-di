import { ResolutionContext } from "../ResolutionContext";
import { DependencyMetadata } from "../DependencyMetadata";
import { IDeliveryStrategy } from "./IDeliveryStrategy";
import { DeliveryError } from "../errors/DeliveryError"

/**
 * Represenst an strategy to deliver a new instance targets per resolution with an specific strategy.
 */
export class PerResolutionDeliveryStrategy implements IDeliveryStrategy {

    private _resolutionContextInstanceMap:{context:ResolutionContext, instance:any}[];

    constructor() {
        this._resolutionContextInstanceMap = [];
    }

    /**
     * Deliver the transformed reference in the provided dependency metadata.
     * @param resolutionContext Represents the context in which the request was made.
     * @param dependencyMetadata Represents the dependency metadata that will be delivered.
     * @return The transformed reference.
     */
    public deliver(resolutionContext:ResolutionContext, dependencyMetadata:DependencyMetadata):any {
        if (!resolutionContext)
            throw new DeliveryError('Must provide a valid resolution context.');

        if (!dependencyMetadata)
            throw new DeliveryError('Must provide the depencency metadata to deliver from.');

        if (!dependencyMetadata.activationReference)
            throw new DeliveryError('The provided dependency metadata must have a valid reference.')

        if (!dependencyMetadata.servicingStrategy)
            throw new DeliveryError('The provided dependency metadata must have a valid servicing strategy.')

        let map = this._resolutionContextInstanceMap.find(map => map.context === resolutionContext);
        let servingResult:any;
        
        if (!map) {
            servingResult = dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference);
            this._resolutionContextInstanceMap.push({ context: resolutionContext, instance: servingResult });
        } else
            servingResult = map.instance;


        return servingResult;        
    }
}