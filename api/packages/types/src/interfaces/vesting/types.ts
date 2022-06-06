// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Compact, Struct, u32 } from '@polkadot/types-codec';
import type { Balance, BlockNumber } from '@setheum.js/types/interfaces/runtime';

/** @name VestingSchedule */
export interface VestingSchedule extends Struct {
  readonly start: BlockNumber;
  readonly period: BlockNumber;
  readonly periodCount: u32;
  readonly perPeriod: Compact<Balance>;
}

/** @name VestingScheduleOf */
export interface VestingScheduleOf extends VestingSchedule {}

export type PHANTOM_VESTING = 'vesting';
