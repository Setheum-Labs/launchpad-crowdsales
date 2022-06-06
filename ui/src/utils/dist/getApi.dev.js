"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getApiProvider = void 0;

var _api = require("@polkadot/api");

// const fs = require('fs');
var getApiProvider = function getApiProvider() {
  var provider, api;
  return regeneratorRuntime.async(function getApiProvider$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          provider = new _api.WsProvider('ws://localhost:9944'); // const types = JSON.parse(fs.readFileSync('./types.json', 'utf8'));

          _context.next = 3;
          return regeneratorRuntime.awrap(_api.ApiPromise.create({
            provider: provider,
            types: {
              "EvmAddress": "H160",
              "TradingPair": "(CurrencyId,  CurrencyId)",
              "TokenSymbol": {
                "_enum": {
                  "SETM": 0,
                  "SERP": 1,
                  "DNAR": 2,
                  "HELP": 3,
                  "SETR": 4,
                  "SETUSD": 5
                }
              },
              "TokenInfo": {
                "currency_id": "Option<u8>",
                "name": "Option<u8>",
                "symbol": "Option<u8>",
                "decimals": "Option<u8>"
              },
              "DexShare": {
                "_enum": {
                  "Token": "TokenSymbol",
                  "Erc20": "EvmAddress"
                }
              },
              "CurrencyId": {
                "_enum": {
                  "Token": "TokenSymbol",
                  "DEXShare": "(DexShare, DexShare)",
                  "ERC20": "EvmAddress"
                }
              },
              "CurrencyIdOf": "CurrencyId",
              "CampaignId": "u32",
              "CampaignIdOf": "CampaignId",
              "CampaignInfo": {
                "id": "CampaignId",
                "origin": "AccountId",
                "beneficiary": "AccountId",
                "pool": "AccountId",
                "raiseCurrency": "CurrencyIdOf",
                "saleToken": "CurrencyIdOf",
                "tokenPrice": "Balance",
                "crowdAllocation": "Balance",
                "goal": "Balance",
                "raised": "Balance",
                "contributorsCount": "u32",
                "contributions": "BTreeMap<AccountId, (Balance, Balance, bool)>",
                "period": "BlockNumber",
                "campaignStart": "BlockNumber",
                "campaignEnd": "BlockNumber",
                "campaignRetirementPeriod": "BlockNumber",
                "proposalRetirementPeriod": "BlockNumber",
                "isApproved": "bool",
                "isRejected": "bool",
                "isWaiting": "bool",
                "isActive": "bool",
                "isSuccessful": "bool",
                "isFailed": "bool",
                "isEnded": "bool",
                "isClaimed": "bool"
              },
              "CampaignInfoOf": "CampaignInfo"
            }
          }));

        case 3:
          api = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(api.isReady);

        case 6:
          console.log("Api Ready");
          return _context.abrupt("return", api);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getApiProvider = getApiProvider;
var _default = getApiProvider;
exports["default"] = _default;