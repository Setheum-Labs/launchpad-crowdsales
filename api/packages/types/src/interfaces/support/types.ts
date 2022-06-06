// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { Balance, FixedU128 } from '@setheum.js/types/interfaces/runtime';

/** @name ExchangeRate */
export interface ExchangeRate extends FixedU128 {}

/** @name Price */
export interface Price extends FixedU128 {}

/** @name Rate */
export interface Rate extends FixedU128 {}

/** @name Ratio */
export interface Ratio extends FixedU128 {}

/** @name SwapLimit */
export interface SwapLimit extends Enum {
  readonly isExactSupply: boolean;
  readonly asExactSupply: ITuple<[Balance, Balance]>;
  readonly isExactTarget: boolean;
  readonly asExactTarget: ITuple<[Balance, Balance]>;
  readonly type: 'ExactSupply' | 'ExactTarget';
}

export type PHANTOM_SUPPORT = 'support';
