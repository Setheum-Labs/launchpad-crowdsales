export default {
  rpc: {},
  types: {
    CollateralAuctionItem: {
      refundRecipient: 'AccountId',
      currencyId: 'CurrencyId',
      initialAmount: 'Compact<Balance>',
      amount: 'Compact<Balance>',
      target: 'Compact<Balance>',
      startTime: 'BlockNumber'
    }
  }
};
