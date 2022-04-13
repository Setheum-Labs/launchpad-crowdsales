export default {
  rpc: {},
  types: {
    Amount: 'i128',
    AmountOf: 'Amount',
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    AuthoritysOriginId: {
      _enum: ['Root', 'Treasury']
    },
    DexShare: {
      _enum: {
        Token: 'TokenSymbol',
        Erc20: 'EvmAddress'
      }
    },
    CurrencyId: {
      _enum: {
        Token: 'TokenSymbol',
        DEXShare: '(DexShare, DexShare)',
        ERC20: 'EvmAddress',
      }
    },
    CurrencyIdOf: 'CurrencyId',
    CampaignId: 'u32',
    CampaignIdOf: 'CampaignId',
    CampaignInfo: {
        origin: 'AccountId',
        beneficiary: 'AccountId',
        raiseCurrency: 'CurrencyId',
        saleToken: 'CurrencyId',
        crowdAllocation: 'Balance',
        goal: 'Balance',
        raised: 'Balance',
        contributorsCount: 'u32',
        contributions: 'BTreeMap<AccountId, (Balance, Balance, bool)>',
        period: 'BlockNumber',
        campaignStart: 'BlockNumber',
        campaignEnd: 'BlockNumber',
        campaignRetirementPeriod: 'BlockNumber',
        proposalRetirementPeriod: 'BlockNumber',
        isApproved: 'bool',
        isRejected: 'bool',
        isWaiting: 'bool',
        isActive: 'bool',
        isSuccessful: 'bool',
        isFailed: 'bool',
        isEnded: 'bool',
        isClaimed: 'bool'
    },
    CampaignInfoOf: 'CampaignInfo',
    TradingPair: '(CurrencyId,  CurrencyId)',
    OrmlCurrencyId: 'CurrencyId',
    TokenSymbol: {
      _enum: {
        SETM: 0,
        SERP: 1,
        DNAR: 2,
        HELP: 3,
        SETR: 4,
        SETUSD: 5,
      }
    },
    TokenInfo: {
      currency_id: 'Option<u8>',
      name: 'Option<u8>',
      symbol: 'Option<u8>',
      decimals: 'Option<u8>'
    },
    SerpStableCurrencyId: {
      _enum: ['SETR', 'SETUSD']
    },
    SetheumAssetMetadata: {
      name: 'Vec<u8>',
      symbol: 'Vec<u8>',
      decimals: 'u8',
      minimalBalance: 'Balance'
    },
    SetheumDataProviderId: {
      _enum: ['Aggregated', 'Setheum']
    },
  },
  typesAlias: {
    oracle: {
      DataProviderId: 'SetheumDataProviderId'
    },
  }
};
