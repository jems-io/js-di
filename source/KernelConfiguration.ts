import { ResolutionConfiguration } from "./ResolutionConfiguration";


class KernelConfiguration {
        
    /**
     * Instance a new kernel configuration.
     * 
     * @class
     * @name KernelConfiguration
     * @classdesc Represents a kernel configuration, it define the kernel behavior.
     * @memberof module:jemsDI
     * 
     * @property {Map<string,module:jemsDI.ResolutionConfiguration>} aliasSufixResolutionConfigurationMap Represents the flags that will be avaluated in the alias.
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

export { KernelConfiguration as KernelConfiguration };