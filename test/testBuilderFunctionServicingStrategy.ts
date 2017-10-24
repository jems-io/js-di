import * as assert from 'assert'

import * as jemsdi from '../src/index'

describe('with builder function servicing strategy resolution', function () {

  let kernel: jemsdi.Kernel = jemsdi.createKernel()
  let constantInstance = {}

  before(function () {
    kernel.bind('fakeFunctionBuilder').to(function () { return constantInstance }).asBuilderFunction()
  })

  it('should resolve the function value', function () {
    let resolvedObject: any = kernel.resolve('fakeFunctionBuilder')
    assert.ok(resolvedObject === constantInstance, 'The resolved object is not the function value.')
  })
})
