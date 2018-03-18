import { BaseError } from './baseError'
import { AliasMetadataMember } from '../aliasMetadataMember'

/**
 * Represents an error triggered when a cyclic dependency has been identified.
 */
export class UnfulfilledMembersRequirementsError extends BaseError {

  public unfulfilledMembers: AliasMetadataMember[]

  constructor (message: string, unfulfilledMembers: AliasMetadataMember[]) {
    super(message)
    this.name = 'UnfulfilledMembersRequirementsError'
    this.unfulfilledMembers = unfulfilledMembers
  }
}
