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
    // console.info('Making Proposal');
    // await includedInBlock(alice, api.tx.launchPad.makeProposal(
    //     "Project Name",
    //     "Project Description",
    //     "Project Website",
    //     100
    // ));
    // campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    // console.info(`Account Id: ${campaignInfo.accountId.toHuman()}`);
    // console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    // console.info(`Raised: ${campaignInfo.raised.toHuman()}`);

    // contribute
    console.info('Contributing');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Account Id: ${campaignInfo.accountId.toHuman()}`);
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);

    // claim contribution allocation
    console.info('Claiming Contribution Allocation');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);

    // claim campaign fundraise
    console.info('Claiming Campaign Fundraise');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    console.info(`Raised: ${campaignInfo.raised.toHuman()}`);

    // approve proposal
    console.info('Approving Proposal');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    
    // reject proposal
    console.info('Rejecting Proposal');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
    
    // activate waiting campaign
    console.info('Activating Waiting Campaign');
    await includedInBlock(alice, api.tx.launchPad.contribute({ TOKEN: "SETUSD" }, 100));
    campaignInfo = (await api.query.launchPad.campaigns({ TOKEN: "SETUSD" })).unwrap();
    console.info(`Goal: ${campaignInfo.goal.toHuman()}`);
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
