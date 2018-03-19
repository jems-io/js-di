import * as assert from 'assert'

import * as jemsdi from '../src/index'
import { FakeTypeDependant1 } from './fake-types/fakeTypeDependant1'
import { FakeTypeDependant2 } from './fake-types/fakeTypeDependant2'
import { FakeTypeC } from './fake-types/fakeTypeC'

describe('must throw an the error', function () {

  let kernel: jemsdi.Kernel = jemsdi.createKernel()

  before(function () {
    kernel.bind('fakeTypeDependant1').to(FakeTypeDependant1)
    kernel.bind('fakeTypeDependant2').to(FakeTypeDependant2)
    kernel.bind('fakeType').to(function () { this.fake = true })
    kernel.bind('fakeType').to(function () { this.fake = true })
  })

  it('jemsdi.Errors.UnregisteredAliasError because there is nothing registered with fakeTypeUnexisting alias', function () {
    try {
      let resolvedObject: any = kernel.resolve('fakeTypeUnexisting')
      assert.ok(false, 'Must throw the exception because the alias is not registered.')
    } catch (error) {
      assert.equal(error.name, 'UnregisteredAliasError', 'The error is not an instance of jemsdi.Errors.UnregisteredAliasError')
    }
  })

  it('jemsdi.Errors.ActivationFailError because the reuslt of the resolution is null.', function () {
    try {
      kernel.bind('fakeTypeNULL').to(null).asConstant()
      assert.ok(false, 'Must throw the exception because the activation result is null.')
    } catch (error) {
      assert.equal(error.name, 'InvalidDataError', 'The error is not an instance of InvalidDataError')
    }
  })

    // it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy between dependant1 and dependant2 with alias fakeTypeDependant1', function() {
    //     try {
    //         let resolvedObject:any = kernel.resolve('fakeTypeDependant1');
    //         assert.ok(false, 'Must throw the exception because there is a ciclyc dependency.');
    //     } catch (error) {
    //         assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');
    //     }
    // });

    // it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy between dependant1 and dependant2 with alias fakeTypeDependant2', function() {
    //     try {
    //         let resolvedObject:any = kernel.resolve('fakeTypeDependant2');
    //         assert.ok(false, 'Must throw the exception because there is a ciclyc dependency.');
    //     } catch (error) {
    //         assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError');
    //     }
    // });

  it('jemsdi.Errors.ResolutionConfigurationError because there is an ambiguety with the faketype alias.', function () {
    try {
      let resolvedObject: any = kernel.resolve('fakeType')
      assert.ok(false, 'Must throw the exception because there is a resolution configuration error with the quantities.')
    } catch (error) {
      assert.equal(error.name, 'ResolutionConfigurationError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError')
    }
  })

  it('jemsdi.Errors.CyclicDependencyError because there is a cyclic dependecy with the containers support hierarchy.', function () {
    try {
      kernel.createContainer('ContainerB')
      kernel.createContainer('ContainerA', ['ContainerB'])

      kernel.removeContainer('ContainerB')

      kernel.createContainer('ContainerB', ['ContainerA'])

      assert.ok(false, 'Must throw the exception because there is a Cyclic Dependency Error.')
    } catch (error) {
      assert.equal(error.name, 'CyclicDependencyError', 'The error is not an instance of jemsdi.Errors.CyclicDependencyError:\n\n' + error.message)
    }
  })
})
