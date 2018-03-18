import * as assert from 'assert'
import { IMock, Mock, It, Times } from 'typemoq'
import { Kernel, createKernel, Errors } from '../src'

describe('The [BuildInKernel]', function () {

  let kernel: Kernel = createKernel()

  describe('The regarding to alias metadata definition', function () {
    before(() => {
      kernel.aliasMetadataMap['definedAlias'] = {
        members: [
          {
            name: 'do'
          }
        ]
      },
      kernel.aliasMetadataMap['definedAliasWithSubAliasMetadata'] = {
        members: [
          {
            name: 'object',
            aliasMetadata: {
              members: [
                {
                  name: 'do'
                }
              ]
            }
          }
        ]
      }
    })

    it('should not valiate the prototype of a registering or resolved function if no metadata has been configured.', function () {
      let toResolve: any = class UndefinedAlias {}
      kernel.bind('undefinedAliasFunction').to(toResolve).asConstant()

      assert.equal(
        kernel.resolve('undefinedAliasFunction'),
        toResolve,
        'The resolutin must occur without problems.'
      )
    })

    it('should not valiate the members of a registering or resolved object if no metadata has been configured.', function () {
      let toResolve: any = {}
      kernel.bind('undefinedAliasObject').to(toResolve).asConstant()

      assert.equal(
        kernel.resolve('undefinedAliasObject'),
        toResolve,
        'The resolutin must occur without problems.'
      )
    })

    it('should throw if the prototype of a registering function does not match with the configured metadata.', function () {
      assert.throws(
        () => kernel.bind('definedAlias').to(class DefinedAlias {}),
        Errors.UnfulfilledMembersRequirementsError,
        'Should throw Errors.UnfulfilledMembersRequirementsError becase the provide reference doesn\'t fullfill the alias behavior'
      )
    })

    it('should throw if the members of a registering object does not match with the configured metadata.', function () {
      assert.throws(
        () => kernel.bind('definedAlias').to({}).asConstant(),
        Errors.UnfulfilledMembersRequirementsError,
        'Should throw Errors.UnfulfilledMembersRequirementsError becase the provide reference doesn\'t fullfill the alias behavior'
      )
    })

    it('should throw if the members of a referece has an alias metadata and does not fullfill it.', function () {
      assert.throws(
        () => kernel.bind('definedAliasWithSubAliasMetadata').to({
          object: {

          }
        }).asConstant(),
        Errors.UnfulfilledMembersRequirementsError,
        'Should throw Errors.UnfulfilledMembersRequirementsError becase the provide reference doesn\'t fullfill the alias behavior'
      )
    })
  })
})
