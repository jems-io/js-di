import ResolutionConfiguration from "./ResolutionConfiguration";

/**
 * Represents a kernel configuration, it define the kernel behavior.
 */
export default class KernelConfiguration {
        
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
            quanty: 1,
            optional: false,
            dependencyFilter: undefined
        };

        this.aliasSufixResolutionConfigurationMap['List'] = {
            quanty: 0,
            optional: false,
            dependencyFilter: undefined
        };

        this.aliasSufixResolutionConfigurationMap['Optional'] = {
            quanty: 1,
            optional: true,
            dependencyFilter: undefined
        };

        this.aliasSufixResolutionConfigurationMap['OptionalList'] = {
            quanty: 0,
            optional: true,
            dependencyFilter: undefined
        };
    }
}