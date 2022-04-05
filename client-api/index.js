const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

const fs = require('fs');
const BigNumber = require('bignumber.js');

async function main() {
    const provider = new WsProvider('ws://localhost:9944');
    const types = JSON.parse(fs.readFileSync('../types.json', 'utf8'));
    const api = await ApiPromise.create({ provider, types });

    const keyring = new Keyring({type: 'sr25519'});

    const alice = keyring.addFromUri('//Alice');
    const treasury = "VQi5wfR3UZnJY4KvxG2uVPP6n6CS296xTznrzqs3hfD4Fyp6x";

    // make proposal
    console.info('Making Proposal');
    await includedInBlock(alice, api.tx.launchPad.makeProposal(
        treasury, { Token: "SETUSD" }, { Token: "SERP" }, 10, 10000, 100000, 20,
    ));
    const result = await api.query.launchPad.proposals({ Token: "SERP" });
    console.info(result.toHuman());

    // contribute
    console.info('Contributing');
    await includedInBlock(alice, api.tx.launchPad.contribute({ Token: "SERP" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ Token: "SERP" }));
    console.info(campaignInfo.toHuman());

    // claim contribution allocation
    console.info('Claiming Contribution Allocation');
    await includedInBlock(alice, api.tx.launchPad.claimContributionAllocation({ Token: "SERP" }));
    campaignInfo = (await api.query.launchPad.campaigns({ Token: "SERP" }));
    console.info(campaignInfo.toHuman());

    // claim campaign fundraise
    console.info('Claiming Campaign Fundraise');
    await includedInBlock(alice, api.tx.launchPad.claimCampaignFundraise({ Token: "SERP" }));
    campaignInfo = (await api.query.launchPad.campaigns({ Token: "SERP" }));
    console.info(campaignInfo.toHuman());

    // approve proposal
    console.info('Approving Proposal');
    await includedInBlock(alice, api.tx.launchPad.approveProposal({ Token: "SERP" }));
    campaignInfo = (await api.query.launchPad.campaigns({ Token: "SERP" }));
    console.info(campaignInfo.toHuman());

    // reject proposal
    console.info('Rejecting Proposal');
    await includedInBlock(alice, api.tx.launchPad.rejectProposal({ Token: "SERP" }));
    campaignInfo = (await api.query.launchPad.campaigns({ Token: "SERP" }));
    console.info(campaignInfo.toHuman());

    // activate waiting campaign
    console.info('Activating Waiting Campaign');
    await includedInBlock(alice, api.tx.launchPad.activateWaitingCampaign({ Token: "SERP" }));
    campaignInfo = (await api.query.launchPad.campaigns({ Token: "SERP" }));
    console.info(campaignInfo.toHuman());

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
