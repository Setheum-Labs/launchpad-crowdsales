import { Balance, CurrencyId } from '@setheum.js/types/interfaces';

export interface DerivedBalance {
  currency: CurrencyId | string;
  balance: Balance;
}

export type DerivedAllBalances = DerivedBalance[];
