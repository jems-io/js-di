import * as assert from 'assert'

import { BuildInArgumentsNamesProvider } from '../src/buildInArgumentsNamesProvider'

describe('The [ArgumentsNamesProvider]', function () {
  it('should return an empty array if the given argumentable object does not contain arguments', function () {
    let buildInArgumentsNamesProvider: BuildInArgumentsNamesProvider = new BuildInArgumentsNamesProvider()

    let argumentNames: string[] = buildInArgumentsNamesProvider.getArgumentsNames(function () { this.props = 0 })

    assert.ok(argumentNames instanceof Array,
                 `The returned object of type [${typeof argumentNames}] is not an array`)
    assert.equal(argumentNames.length, 0,
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`)
  })

  it('should return an array with 1 arguments names.', function () {
    let buildInArgumentsNamesProvider: BuildInArgumentsNamesProvider = new BuildInArgumentsNamesProvider()

    let argumentNames: string[] = buildInArgumentsNamesProvider.getArgumentsNames(function (arg1: any) { this.props = 1 })

    assert.equal(argumentNames.length, 1,
                 `The returned arguments name should be equal to 1, not ${argumentNames.length}`)
  })

  it('should return an array with 3 arguments names.', function () {
    let buildInArgumentsNamesProvider: BuildInArgumentsNamesProvider = new BuildInArgumentsNamesProvider()

    let argumentNames: string[] = buildInArgumentsNamesProvider.getArgumentsNames(function (arg1: any, arg2: any, arg3: any) { this.props = 3 })

    assert.equal(argumentNames.length, 3,
                 `The returned arguments name should be equal to 3, not ${argumentNames.length}`)
  })

  it('should be able to resolve functions with the corret arguments quantity', function () {
    let buildInArgumentsNamesProvider: BuildInArgumentsNamesProvider = new BuildInArgumentsNamesProvider()

    let argumentNames: string[] = buildInArgumentsNamesProvider.getArgumentsNames(function (arg1: any) { this.props = 1 })

    assert.equal(argumentNames.length, 1,
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`)
  })

  it('should be able to resolve classes with the corret arguments quantity', function () {
    class AClass { props: number; constructor (arg1: any) { this.props = 1 } }

    let buildInArgumentsNamesProvider: BuildInArgumentsNamesProvider = new BuildInArgumentsNamesProvider()

    let argumentNames: string[] = buildInArgumentsNamesProvider.getArgumentsNames(AClass)

    assert.equal(argumentNames.length, 1,
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`)
  })

  it('should be able to resolve lambdas with the corret arguments quantity', function () {
    let buildInArgumentsNamesProvider: BuildInArgumentsNamesProvider = new BuildInArgumentsNamesProvider()

    let argumentNames: string[] = buildInArgumentsNamesProvider.getArgumentsNames((arg1: any) => { this.props = 1 })

    assert.equal(argumentNames.length, 1,
                 `The returned arguments name should be equal to 0, not ${argumentNames.length}`)
  })
})
