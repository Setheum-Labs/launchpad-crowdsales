// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types-codec';
import type { Balance } from '@setheum.js/types/interfaces/runtime';

/** @name Position */
export interface Position extends Struct {
  readonly collateral: Balance;
  readonly debit: Balance;
}

export type PHANTOM_LOANS = 'loans';
