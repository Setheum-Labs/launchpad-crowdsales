import type { OverrideVersionedType } from '@polkadot/types/types';

const addressV0 = {
  Address: 'LookupSource',
  LookupSource: 'IndicesLookupSource'
};

const addressV1 = {
  Address: 'GenericMultiAddress',
  LookupSource: 'GenericMultiAddress'
};

const currencyV0 = {
  CurrencyId: {
    _enum: {
      Token: 'TokenSymbol',
      DEXShare: '(TokenSymbol, TokenSymbol)',
      ERC20: 'EvmAddress'
    }
  }
};

const poolIdV0 = {
  PoolId: {
    _enum: {
      Loans: 'CurrencyId'
    }
  }
};

const versioned: OverrideVersionedType[] = [
  {
    minmax: [600, 699],
    types: {
      ...poolIdV0,
      ...addressV0,
      TokenSymbol: {
        _enum: ['SETM', 'SERP', 'DNAR', 'HELP', 'SETR', 'SETUSD']
      }
    }
  },
  {
    minmax: [700, 719],
    types: {
      ...poolIdV0,
      ...addressV1,
      TokenSymbol: {
        _enum: ['SETM', 'SERP', 'DNAR', 'HELP', 'SETR', 'SETUSD']
      }
    }
  },
  {
    minmax: [720, 722],
    types: {
      ...addressV1,
      ...poolIdV0,
      ...currencyV0,
      TokenSymbol: {
        _enum: {
          SETM: 0,
          SERP: 1,
          DNAR: 2,
          HELP: 3,
          SETR: 4,
          SETUSD: 5
        }
      }
    }
  },
  {
    minmax: [723, 729],
    types: {
      ...addressV1,
      ...currencyV0,
      TokenSymbol: {
        _enum: {
          SETM: 0,
          SERP: 1,
          DNAR: 2,
          HELP: 3,
          SETR: 4,
          SETUSD: 5
        }
      }
    }
  },
  {
    minmax: [730, 1007],
    types: {
      ...addressV1,
      TokenSymbol: {
        _enum: {
          SETM: 0,
          SERP: 1,
          DNAR: 2,
          HELP: 3,
          SETR: 4,
          SETUSD: 5
        }
      }
    }
  },
  {
    minmax: [1008, 1009],
    types: {
      ...addressV1,
    }
  },
  {
    minmax: [1008, undefined],
    types: {
      ...addressV1,
    }
  },
];

export default versioned;
