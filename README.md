# launchpad-crowdsales

Subatrate pallet to raise funds on launchpad crowdsales

## Module Overview

This pallet is used to raise funds on launchpad crowdsales.
Teams and projects that are just getting started launching their products would need to raise funds and even sell their tokens to the public. They need community backed by token holders of their token, that is the crowd so that they could have a strong start. By creating a crowdfunding campaign that ends with their project Tokens getting sold to the public, they can raise funds and sell their tokens to the public.

We happen to be working on a similar product in Setheum, providing the High-End LaunchPad (HELP) Protocol to do just that for the projects building/deploying their tokens on Setheum as smartcontracts contracts.

Therefore, to raise funds ourselves, we are developing this pallet for the Substrate Community to benefit from it, and for us to raise funds from the Web3 Foundation General Grants Program.

The idea is to use the grant program to raise funds for deploying our dedicated Setheum Network nodes to go live.

There are four participants in a LaunchPad Crowdsales Protocol, the Campaign Creator, the Campaign Beneficiary, the Crowd/Contributors, and the Governance Council.

* The Campaign Creator is the person who creates the campaign and the project.
* The Campaign Beneficiary is the person who receives the funds raised.
* The Crowd/Contributors are the people who contribute to the campaign.
* The Governance Council is the people who manage the campaign and the protocol.

## How the protocol Works

![Screenshot from 2022-01-23 13-31-41](https://user-images.githubusercontent.com/15086345/150666483-3f9a07b3-2e76-46f9-97f9-729679c03f1c.png)
The HighEnd LaunchPad Protocol lets teams/projects/campaigns achieve two (2) major goals at once, it raises money, and and sell their tokens to the public.
The protocol uses `MultiCurrency` to let the Campaign Creator choose which currency to raise/sell their tokens for. Therefore,  Campaign Creator can choose to raise funds in any currency available on the chain.

There is a `goal` that is set by the Campaign Creator, the beneficiary of the fund and the Period (campaign period - amount of blocks a campaign should stay active) of the campaign and other information that describes the campaign.

### The Lifecycle of a Campaign

A Launchpad Campaign has three stages in its lifecycle, they are as follows:

1. **Pre-Funding/Proposal Stage**: The Campaign Creator creates the campaign and sets the Period/TimeCap and HardCap. In this stage, the Campaign Creator must submit the proposal to the Governance Council along with a `SubmissionDeposit` required by the protocol.

2. **Waiting Stage**: The Campaign waits for the appropriate time to start the Campaign. The Protocol has a `WaitingPeriod` that is set on runtime, and all campaigns have to wait for that period to start.

3. **Funding/Active Stage**: The Campaign can raise funds and sell their tokens to the public in this stage. If the `goal` is reached before the `period` to end the campaign, the campaign will be ended and the funds will be available for the public to claim and the raised funds for the Campaign Beneficiary or Creator to claim.

### Campaign Ctegories

#### A Successful Launchpad Campaign

A successful Launchpad Campaign is one that has raised the `goal` and has sold their tokens to the public. Once the `goal` is reached, the Campaign is considered successful.

#### A Failed Launchpad Campaign

A failed Launchpad Campaign is one that has not raised the `goal` and has not sold their tokens to the public. Once the `goal` is not reached and the `period` to end the campaign has ended, the Campaign is considered failed and the campaign allocation of tokens is available for the Campaign Creator to claim refund and the raised funds are also available for the Crowd/Contributors/buyers to claim refunds all only before the `RetirementPeriod` of the campaign.

## Getting Started

Commands to get started testing, building and running launchpad-crowdsales

### Tests

To run the tests, run the following command:

```bash
make tests
```

### Benchmarking

To run the benchmark, run the following commands:

```bash
make benchmark
```

### Initialise Toolchain

To run the benchmark, run the following commands:

```bash
make init
```

### Build

To run the benchmark, run the following commands:

```bash
make build
```

### Run

To run the benchmark, run the following commands:

```bash
make run
```

## License

Apache License Version 2.0
