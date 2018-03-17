import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'

import { BehaviorSyntax } from '../../src/fluent-syntaxes/behaviorSyntax'
import { DependencyMetadata, Errors } from '../../src'

describe('The [BehaviorSyntax]', function () {
  it('should change the dependency metadata argument names with provided ones in the with function.', function () {
    let dependencyMetadata: DependencyMetadata = {
      activationReference: (agument1: string) => 0,
      isArgumentable: true,
      argumentsNames: ['agument1']
    }
    let behaviorSyntax: BehaviorSyntax = new BehaviorSyntax(dependencyMetadata)

    behaviorSyntax.with(['argument2'])

    assert.equal(
        'argument2',
        dependencyMetadata.argumentsNames[0],
        'The agument name should be argment2 instead' + dependencyMetadata.argumentsNames[0]
    )
  })

  it('should throw when is changing the dependency metadata argument names with the with function if the dependency metadata is not argumentable.', function () {
    let dependencyMetadata: DependencyMetadata = {
      activationReference: {},
      isArgumentable: false,
      argumentsNames: []
    }
    let behaviorSyntax: BehaviorSyntax = new BehaviorSyntax(dependencyMetadata)

    assert.throws(
        () => behaviorSyntax.with(['argument2']),
        Errors.InvalidDataError,
        `Should throw the ${Errors.InvalidDataError.name} error`
    )
  })
})
