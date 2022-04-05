const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

const fs = require('fs');
const BigNumber = require('bignumber.js');

async function main() {
    const provider = new WsProvider('ws://localhost:9944');
    const types = JSON.parse(fs.readFileSync('../types.json', 'utf8'));
    const api = await ApiPromise.create({ provider, types });

    const keyring = new Keyring({type: 'sr25519'});

    const alice = keyring.addFromUri('//Alice');
    const bob = keyring.addFromUri('//Bob');
    
    // make proposal
    console.info('Making Proposal');
    await includedInBlock(alice, api.tx.launchPad.makeProposal(
        bob, { TOKEN: "SETUSD" }, { TOKEN: "SERP" }, 10, 10000, 100000, 20,
    ));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);


    // contribute
    console.info('Contributing');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);

    // claim contribution allocation
    console.info('Claiming Contribution Allocation');
    await includedInBlock(alice, api.tx.launchPad.claimContributionAllocation({ TOKEN: "SETUSD" }));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);

    // claim campaign fundraise
    console.info('Claiming Campaign Fundraise');
    await includedInBlock(alice, api.tx.launchPad.claimCampaignFundraise({ TOKEN: "SETUSD" }));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);

    // approve proposal
    console.info('Approving Proposal');
    await includedInBlock(alice, api.tx.launchPad.approveProposal({ TOKEN: "SETUSD" }));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);

    // reject proposal
    console.info('Rejecting Proposal');
    await includedInBlock(alice, api.tx.launchPad.rejectProposal({ TOKEN: "SETUSD" }));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);

    // activate waiting campaign
    console.info('Activating Waiting Campaign');
    await includedInBlock(alice, api.tx.launchPad.activateWaitingCampaign({ TOKEN: "SETUSD" }));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Campaign Token: ${campaignInfo.id.toHuman()}`);
    console.info(`Campaign Creator: ${campaignInfo.origin.toHuman()}`);
    console.info(`Beneficiary: ${campaignInfo.beneficiary.toHuman()}`);
    console.info(`Campaign Pool Account: ${campaignInfo.pool.toHuman()}`);
    console.info(`Raise Currency: ${campaignInfo.raiseCurrency.toHuman()}`);
    console.info(`Sale Token: ${campaignInfo.saleToken.toHuman()}`);
    console.info(`Token Price: ${campaignInfo.tokenPrce.toHuman()}`);
    console.info(`Crowd Allocation: ${campaignInfo.crowdAllocation.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);
    console.info(`Contributors Count: ${campaignInfo.contributorsCount.toHuman()}`);
    console.info(`Contributions: ${campaignInfo.contributions.toHuman()}`);
    console.info(`Active Campaign Period: ${campaignInfo.period.toHuman()}`);
    console.info(`Campaign Starts at: ${campaignInfo.campaignStart.toHuman()}`);
    console.info(`Campaign Ends at: ${campaignInfo.campaignEnd.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.campaignRetirementPeriod.toHuman()}`);
    console.info(`Campaign Retirement Period: ${campaignInfo.proposalRetirementPeriod.toHuman()}`);
    console.info(`Is Campaign Approved?: ${campaignInfo.isApproved.toHuman()}`);
    console.info(`Is Campaign Rejected?: ${campaignInfo.isRejected.toHuman()}`);
    console.info(`Is Campaign Waiting?: ${campaignInfo.isWaiting.toHuman()}`);
    console.info(`Is Campaign Active?: ${campaignInfo.isActive.toHuman()}`);
    console.info(`Is Campaign Successful?: ${campaignInfo.isSuccessful.toHuman()}`);
    console.info(`Is Campaign Failed?: ${campaignInfo.isFailed.toHuman()}`);
    console.info(`Is Campaign Ended?: ${campaignInfo.isEnded.toHuman()}`);
    console.info(`Is Campaign Claimed?: ${campaignInfo.isClaimed.toHuman()}`);

}

function includedInBlock(signer, txCall) {
    return new Promise((resolve, reject) => {
        let unsub = null;
        txCall.signAndSend(signer, (result) => {
            if (result.status.isInBlock) {
                if (unsub == null) {
                    reject('Unsub not available');
                } else {
                    unsub();
                    resolve(result.events);
                }
            }
        }).then(x => {unsub = x;}, err => reject(err));
    });
}

(async () => {
    main().catch(e => {
        console.error(`Something went wrong: ${e.message}`);
    });
})();
