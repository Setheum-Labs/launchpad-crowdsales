import { ApiPromise, WsProvider } from "@polkadot/api";
// const fs = require('fs');

export const getApiProvider = async () => {
  const provider = new WsProvider('ws://localhost:9944');
  // const types = JSON.parse(fs.readFileSync('./types.json', 'utf8'));
  const api = await ApiPromise.create({
    provider,
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
  });

  await api.isReady;
  console.log("Api Ready");
  return api;
};

export default getApiProvider;
