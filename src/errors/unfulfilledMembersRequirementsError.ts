import { BaseError } from './baseError'
import { AliasMetadataMember } from '../aliasMetadataMember'

/**
 * Represents an error triggered when one or many alias metadata members requirements are unfulfilled.
 */
export class UnfulfilledMembersRequirementsError extends BaseError {

  public unfulfilledMembers: AliasMetadataMember[]

  constructor (message: string, unfulfilledMembers: AliasMetadataMember[]) {
    super(message)
    this.name = 'UnfulfilledMembersRequirementsError'
    this.unfulfilledMembers = unfulfilledMembers
  }
}
