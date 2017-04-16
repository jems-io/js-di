
export abstract class ReasonedError extends Error {
    constructor(reason:string, message:string) {
        super(message);

        if (!reason)
            throw new Error("Must supply a reson for the reasoned error.");

        this.reason = reason;        
    }

    public reason:string;    
}