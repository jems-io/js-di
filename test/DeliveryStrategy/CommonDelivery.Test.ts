import * as assert from 'assert'
import { IDeliveryStrategy } from "../../source/DeliveryStrategy/IDeliveryStrategy";
import { DeliveryError } from "../../source/Errors/DeliveryError";
import { ResolutionContext } from "../../source/ResolutionContext";
import { DependencyMetadata } from "../../source/DependencyMetadata";

export = function (deiverStratrategyProvider: () => IDeliveryStrategy) {

    it('should throw an error if the given resolution context is not valid.', function() {
        assert.throws(() => {
            deiverStratrategyProvider().deliver(null, null); 
        }, DeliveryError)
    });

    it('should throw an error if the given resolution context original container is not valid.', function() {
        assert.throws(() => {
            deiverStratrategyProvider().deliver(new ResolutionContext(), new DependencyMetadata()); 
        }, DeliveryError)
    });

    it('should throw an error if the given dependency metadata is not valid.', function() {
        assert.throws(() => {
            deiverStratrategyProvider().deliver(new ResolutionContext(), null); 
        }, DeliveryError)
    });

    it('should throw an error if the given dependency reference is not valid.', function() {
        assert.throws(() => {
            deiverStratrategyProvider().deliver(new ResolutionContext(), new DependencyMetadata()); 
        }, DeliveryError)
    });

    it('should throw an error if the given dependency servicing strategy is not valid.', function() {
        assert.throws(() => {
            let dependencyMetadata:DependencyMetadata = new DependencyMetadata();
            dependencyMetadata.activationReference = {};
            deiverStratrategyProvider().deliver(new ResolutionContext(), dependencyMetadata); 
        }, DeliveryError)
    });
} 