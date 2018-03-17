import * as assert from 'assert'

import { ServicingStrategy } from '../../src/servicing-strategies/servicingStrategy'
import { ResolutionContext } from '../../src/resolutionContext'
import { ResolutionOption } from '../../src/resolutionOption'

export = function (servicingStrategyProvider: () => ServicingStrategy) {
  it('shold override de arguments with the resolution option dependencies when it contains matching arguments', function () {
    let resolutionContext: ResolutionContext = new ResolutionContext()
    resolutionContext.resolutionOption = new ResolutionOption()
    resolutionContext.resolutionOption.dependencies = {
      toResolveArgument: 'Hello Moto'
    }

    let argumentableServicingStrategy: ServicingStrategy = servicingStrategyProvider()

    let servicingResult: any = argumentableServicingStrategy.serve(resolutionContext, {
      activationReference: function (toResolveArgument: string) {
        if (this) {
          this.resolvedArgument = toResolveArgument
        }

        return {
          resolvedArgument: toResolveArgument
        }
      },
      isArgumentable: true,
      argumentsNames: ['toResolveArgument']
    })

    assert.equal(servicingResult.resolvedArgument, 'Hello Moto')
  })
}
