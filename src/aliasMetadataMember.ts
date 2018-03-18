import { AliasMetadata } from './aliasMetadata'

/**
 * Represens a member defintion for an alias metadata.
 */
export interface AliasMetadataMember {
    /**
     * Get or set the name of the member.
     */
  name: string

    /**
     * Get or set an alias metadata that will be validated when the root alias metadata get delivered.
     */
  aliasMetadata?: AliasMetadata
}
