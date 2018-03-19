import { BaseError } from './baseError'

/**
 * Represents an error triggered when one or many alias metadata members requirements are unfulfilled.
 */
export class UnfulfilledMembersRequirementsError extends BaseError {

  public unfulfilledMembersPaths: string[]

  constructor (message: string, unfulfilledMembersPaths: string[]) {
    super(message)
    this.name = 'UnfulfilledMembersRequirementsError'
    this.unfulfilledMembersPaths = unfulfilledMembersPaths
  }
}
