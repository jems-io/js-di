import * as assert from 'assert'

import * as jemsdi from '../src/index'
import { FakeTypeA } from './fake-types/fakeTypeA'
import { FakeTypeB } from './fake-types/fakeTypeB'
import { FakeTypeC } from './fake-types/fakeTypeC'

describe('with containeraized resolution', function () {

  let kernel: jemsdi.Kernel = jemsdi.createKernel()
  let containerBAlias = 'containerB'
  let containerCAlias = 'containerC'

  before(function () {

    kernel.createContainer(containerBAlias, ['default'])
    kernel.createContainer(containerCAlias, [containerBAlias])

    kernel.bind('fakeType').to(FakeTypeA)
    kernel.bind('fakeTypeA').to(FakeTypeA)

    kernel.usingContainer(containerBAlias).bind('fakeType').to(FakeTypeB)
    kernel.usingContainer(containerBAlias).bind('fakeTypeB').to(FakeTypeB)

    kernel.usingContainer(containerCAlias).bind('fakeType').to(FakeTypeC)
    kernel.usingContainer(containerCAlias).bind('fakeTypeC').to(FakeTypeC)
  })

  it('should resolve an instance of FakeTypeA with fakeType alias because is registered in the container that is currently in use.', function () {
    let resolvedObject: FakeTypeA = kernel.usingDefaultContainer().resolve('fakeType')
    assert.ok((resolvedObject instanceof FakeTypeA) === true, 'The resolved type is not: FakeTypeA')
  })

  it('should resolve an instance of FakeTypeA with fakeTypeA alias because is registered.', function () {
    let resolvedObject: FakeTypeA = kernel.usingDefaultContainer().resolve('fakeTypeA')
    assert.ok((resolvedObject instanceof FakeTypeA) === true, 'The resolved type is not: FakeTypeA')
  })

  it('should resolve an instance of FakeTypeB with fakeTypeB alias because is registered and can resolve A as a dependency of B because is supported by the default container.', function () {

    let resolvedObject: FakeTypeB = kernel.usingContainer(containerBAlias).resolve('fakeTypeB')
    assert.ok((resolvedObject instanceof FakeTypeB) === true, 'The resolved type is not: FakeTypeB')
    assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) === true, 'The resolved A dependency type is not: FakeTypeA')
  })

  it('should resolve an instance of FakeTypeB with fakeType alias because is registered in the container that is currently in use.', function () {
    let resolvedObject: FakeTypeB = kernel.usingContainer(containerBAlias).resolve('fakeType')
    assert.ok((resolvedObject instanceof FakeTypeB) === true, 'The resolved type is not: FakeTypeB')
  })

  it('should resolve an instance of FakeTypeC with fakeTypeC alias because is registered and can resolve A and B as a dependency of C because is supported by the containerB that is supported by the default container.', function () {
    let resolvedObject: FakeTypeC = kernel.usingContainer(containerCAlias).resolve('fakeTypeC')
    assert.ok((resolvedObject instanceof FakeTypeC) === true, 'The resolved type is not: FakeTypeC')
    assert.ok((resolvedObject.fackeTypeAIntance instanceof FakeTypeA) === true, 'The resolved A dependency type is not: FakeTypeA')
    assert.ok((resolvedObject.fackeTypeBIntance instanceof FakeTypeB) === true, 'The resolved B dependency type is not: FakeTypeB')
  })

  it('should resolve an instance of FakeTypeC with fakeType alias because is registered in the container that is currently in use.', function () {
    let resolvedObject: FakeTypeC = kernel.usingContainer(containerCAlias).resolve('fakeType')
    assert.ok((resolvedObject instanceof FakeTypeC) === true, 'The resolved type is not: FakeTypeC')
  })
})
