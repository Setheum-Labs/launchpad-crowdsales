import { ApiInterfaceRx } from '@polkadot/api/types';
import { Vec } from '@polkadot/types';
import { CurrencyId } from '@setheum.js/types/interfaces';

export function getAllCollateralCurrencyIds(api: ApiInterfaceRx): Vec<CurrencyId> {
  return api.consts.cdpEngine.collateralCurrencyIds as Vec<CurrencyId>;
}
