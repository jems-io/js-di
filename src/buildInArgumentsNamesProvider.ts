import { ArgumentsNamesProvider } from './argumentsNamesProvider'

/**
 * Represents a provider, that provide the arguments for the given argumentable reference.
 */
export class BuildInArgumentsNamesProvider implements ArgumentsNamesProvider {
    /**
     * Returns the arguments names for the given argumentable reference.
     * @param reference Represents the reference where the arguments will be identified.
     * @returns The list of arguments of the given reference.
     */
  public getArgumentsNames (reference: any): string[] {
    let stringObject: string = reference.toString()
    let stringObjectLower = stringObject.toLowerCase()
    let args: string = ''

    if (stringObjectLower.startsWith('function')) {
      args = stringObject.match(/function\s.*?\(([^)]*)\)/)[1]
    } else if (stringObjectLower.startsWith('class')) {

      let constructorIndex = stringObjectLower.indexOf('constructor')

      if (constructorIndex >= 0) {
        stringObject = stringObject.substr(constructorIndex)
        args = stringObject.match('constructor\\s*\\((.*?)\\)')[1]
      }
    }

        // Split the arguments string into an array comma delimited.
    return args.split(',').map(function (arg: string) {
            // Ensure no inline comments are parsed and trim the whitespace.
      return arg.replace(/\/\*.*\*\//, '').trim()
    }).filter(function (arg: string) {
            // Ensure no undefined values are added.
      return arg
    })
  }

    /**
     * Returns a boolean values, specifying if the given reference is argumentable.
     * @param reference Represents the reference that will be evaluated.
     * @returns If the reference is argumentable.
     */
  public isArgumetable (reference: any): boolean {
    return typeof reference === 'function'
  }
}
