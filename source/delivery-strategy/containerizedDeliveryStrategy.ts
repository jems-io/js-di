import { ResolutionContext } from "../ResolutionContext";
import { DependencyMetadata } from "../DependencyMetadata";
import { IDeliveryStrategy } from "./IDeliveryStrategy";
import { DeliveryError } from "../errors/DeliveryError"
import { IContainer } from "../IContainer";

/**
 * Represenst an strategy to deliver a new instance targets per container with an specific strategy.
 */
export class ContainerizedDeliveryStrategy implements IDeliveryStrategy {

    private _containerInstanceMap:{container:IContainer, instance:any}[];

    constructor() {
        this._containerInstanceMap = [];
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

        if (!resolutionContext.originContainer)
            throw new DeliveryError('The provided resolution context must have a valid origin container.');

        if (!dependencyMetadata)
            throw new DeliveryError('Must provide the depencency metadata to deliver from.');

        if (!dependencyMetadata.activationReference)
            throw new DeliveryError('The provided dependency metadata must have a valid reference.')

        if (!dependencyMetadata.servicingStrategy)
            throw new DeliveryError('The provided dependency metadata must have a valid servicing strategy.')

        let map = this._containerInstanceMap.find(map => map.container === resolutionContext.originContainer);
        let servingResult:any;
        
        if (!map) {
            servingResult = dependencyMetadata.servicingStrategy.serve(resolutionContext, dependencyMetadata.activationReference);
            this._containerInstanceMap.push({ container: resolutionContext.originContainer, instance: servingResult });
        } else
            servingResult = map.instance;


        return servingResult;        
    }
}