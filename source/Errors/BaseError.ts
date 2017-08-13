/// <reference path="../../typings/index.d.ts" />

import { inherits } from "util";

/**
 * Represents the base error.
 */
export class BaseError {
    /**
     * Represents the name of the error.
     */
    name:string;

    /**
     * Represents the message of the error.
     */
    message:string;

    /**
     * Instantiate the error with the given message.
     * @param message Represents the message of the error.
     */
    constructor (message:string) {
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
    }
};

inherits(BaseError, Error);