export default {
  rpc: {},
  types: {
    Price: 'FixedU128',
    ExchangeRate: 'FixedU128',
    Rate: 'FixedU128',
    Ratio: 'FixedU128',
    SwapLimit: {
      _enum: {
        ExactSupply: '(Balance, Balance)',
        ExactTarget: '(Balance, Balance)'
      }
    },
  }
};
