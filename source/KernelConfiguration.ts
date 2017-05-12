

/**
 * Represents a kernel configuration, it define the kernel behavior.
 */
import { IAliasFlag } from "./AliasFlag/IAliasFlag";

export default class KernelConfiguration {
    
    private _aliasFlags:IAliasFlag[];

    constructor() {
        this._aliasFlags = [];
    }

    /**
     * Represents the flags that will be avaluated in the alias.
     */
    get Flags():IAliasFlag[] { return this._aliasFlags; }
}