import { ResolutionConfiguration } from "./ResolutionConfiguration";

/**
 * Represents a kernel configuration, it define the kernel behavior.
 */
export class KernelConfiguration {
        
    /**
     * Instance a new kernel configuration.
     */
    constructor() {
        this.loadDefaultFlags();
    }

    /**
     * Represents the flags that will be avaluated in the alias.
     */
    public aliasSufixResolutionConfigurationMap:{[aliasSufix:string]:ResolutionConfiguration};


    private loadDefaultFlags():void {
        this.aliasSufixResolutionConfigurationMap = {};
        this.aliasSufixResolutionConfigurationMap['default'] = {
            quantity: 1,
            optional: false,
            dependencyFilter: undefined
        };

        this.aliasSufixResolutionConfigurationMap['List'] = {
            quantity: 0,
            optional: false,
            dependencyFilter: undefined
        };

        this.aliasSufixResolutionConfigurationMap['Optional'] = {
            quantity: 1,
            optional: true,
            dependencyFilter: undefined
        };

        this.aliasSufixResolutionConfigurationMap['OptionalList'] = {
            quantity: 0,
            optional: true,
            dependencyFilter: undefined
        };
    }
}