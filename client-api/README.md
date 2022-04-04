# launchpad-crowdsales {client-api}

JS Client API to for interacting with the Launchpad Crowdsales Module.

## Getting Started

Getting started with launchpad-crowdsales client API

### Client

Use `yarn` to install the dependencies and run the application:

```bash
npm install --global yarn
```

To run the sample demo node run the following:

```bash
yarn run-node
```

In a second terminal, to run the client app, run the following:

```bash
yarn run-client
```

### API

The launchpad-crowdsales extrinsics are accessible as follows.. See [index.js](index.js) for the full source code.

#### make proposal

To make a `launchpad-crowdsales` proposal, access the `make_proposal` extrinsic.

```javascript
api.tx.launchPad.makeProposal(
    projectName,
    projectLogo,
    projectDescription,
    projectWebsite,
    beneficiary,
    raiseCurrency,
    saleToken,
    tokenPrice,
    crowdAllocation,
    goal,
    period,
)
```

#### contribute

To contribute to a runnning `launchpad-crowdsales` campaign, access the `contribute` extrinsic.

```javascript
api.tx.launchPad.contribute(id, contributionAmount)
```

#### claim contribution allocation

Tp claim contribution allocation from a `launchpad-crowdsales` campaign, access the `claim_contribution_allocation` extrinsic.

```javascript
api.tx.launchPad.claimContributionAllocation(id)
```

#### claim campaign fundraise

Tp claim campaign fundraise from a `launchpad-crowdsales` campaign, access the `claim_campaign_fundraise` extrinsic.

```javascript
api.tx.launchPad.claimCampaignFundraise(id)
```

#### approve proposal

Tp claim approve a proposal from a `launchpad-crowdsales` campaign, access the `approve_proposal` extrinsic.

```javascript
api.tx.launchPad.approveProposal(id)
```

#### reject proposal

Tp claim reject a proposal from a `launchpad-crowdsales` campaign, access the `reject_proposal` extrinsic.

```javascript
api.tx.launchPad.rejectProposal(id)
```

#### activate waiting campaign

Tp activate a currently waiting campaign from waiting stage to active state from a `launchpad-crowdsales` campaign, access the `activate_waiting_campaign` extrinsic.

```javascript
api.tx.launchPad.activateWaitingCampaign(id)
```

## License

Apache License Version 2.0
