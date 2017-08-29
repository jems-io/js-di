/**
 * Represents a provider, that provide the arguments for the given argumentable reference.
 */
export interface ArgumentsNamesProvider {
    /**
     * Returns the arguments names for the given argumentable reference.
     * @param reference Represents the reference where the arguments will be identified.
     * @returns The list of arguments of the given reference.
     */
    getArgumentsNames(reference:any):string[];

    /**
     * Returns a boolean values, specifying if the given reference is argumentable.
     * @param reference Represents the reference that will be evaluated.
     * @returns If the reference is argumentable.
     */
    isArgumetable(reference:any):boolean;
}