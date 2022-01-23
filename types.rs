{
    "Campaign": {
        "origin": "AccountId",
        "projectName": "Vec<u8>",
        "projectLogo": "Vec<u8>",
        "projectDescription": "Vec<u8>",
        "projectWebsite": "Vec<u8>",
        "beneficiary": "AccountId",
        "raiseCurrency": "CurrencyId",
        "salesToken": "CurrencyId",
        "crowdAllocation": "Balance"
        "goal": "Balance"
        "period": "BlockNumber"
        "isApproved": "bool",
    }
    "CampaignId": "u32",
    "CampaignIdOf": "CampaignId",
    "CampaignOf": "Campaign",
    "Crowdsales": {
        "campaign_id": "CampaignId",
        "sales": "Vec<SaleInfo>",
        "isApproved": "bool",
        "isCompleted": "bool",
    },
    "CrowdsalesOf": "Crowdsales",
    "SaleInfo": {
        "currencyId": "CurrencyId",
        "accountId": "AccountId",
        "contribution": "Balance"
        "allocation": "Balance"
    },
}
