import * as assert from 'assert'

import injectedExactlyIntoAliasesValidator from '../../src/metadata-validators/injectedExactlyIntoAliasesValidator'
import { ResolutionContext } from '../../src/resolutionContext'

describe('The [InjectedExactlyIntoAliasesValidator]', function () {
  it('should return true if the reference is injected exactly into the given alias.', function () {
    let resolutionContext: ResolutionContext = new ResolutionContext()
    resolutionContext.aliasResolutionStack = ['Alias1', 'Alias2']

    assert.ok(injectedExactlyIntoAliasesValidator(resolutionContext, null, 'Alias2'),
                 `The reference is not been injeted exactly into the alias [Alias2]`)
  })

  it('should return false if the reference is not injected exactly into the given alias.', function () {
    let resolutionContext: ResolutionContext = new ResolutionContext()
    resolutionContext.aliasResolutionStack = ['Alias1', 'Alias2']

    assert.ok(!injectedExactlyIntoAliasesValidator(resolutionContext, null, 'Alias1'),
                 `The reference is been injeted exactly into the alias [Alias2] not into [Alias1]`)
  })
})
