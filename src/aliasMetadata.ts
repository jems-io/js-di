import { AliasMetadataMember } from './aliasMetadataMember'

/**
 * Represents metadata for the aliases, that state how registered references should behalve.
 */
export interface AliasMetadata {
    /**
     * Get or set the memebers that should provide the alias.
     */
  members: AliasMetadataMember[]
}
