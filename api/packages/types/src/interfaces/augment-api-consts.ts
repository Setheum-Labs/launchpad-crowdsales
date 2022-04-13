// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Price } from '@open-web3/orml-types/interfaces/traits';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { Vec, u16, u32, u64 } from '@polkadot/types-codec';
import type { Codec, ITuple } from '@polkadot/types-codec/types';
import type { SessionIndex } from '@polkadot/types/interfaces/session';
import type { EraIndex } from '@polkadot/types/interfaces/staking';
import type { RuntimeVersion } from '@polkadot/types/interfaces/state';
import type { WeightToFeeCoefficient } from '@polkadot/types/interfaces/support';
import type { BlockLength, BlockWeights } from '@polkadot/types/interfaces/system';
import type { PalletBalanceOf } from '@setheum.js/types/interfaces/accounts';
import type { EvmAddress } from '@setheum.js/types/interfaces/evm';
import type { CurrencyId, CurrencyIdOf } from '@setheum.js/types/interfaces/primitives';
import type { AccountId, Balance, BalanceOf, BlockNumber, Moment, PalletId, Percent, Permill, RuntimeDbWeight, TransactionPriority, Weight } from '@setheum.js/types/interfaces/runtime';
import type { ExchangeRate, Rate, Ratio } from '@setheum.js/types/interfaces/support';

declare module '@polkadot/api-base/types/consts' {
  export interface AugmentedConsts<ApiType extends ApiTypes> {
    auctionManager: {
      /**
       * When the total duration of the auction exceeds this soft cap, push
       * the auction to end more faster
       **/
      auctionDurationSoftCap: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The extended time for the auction to end after each successful bid
       **/
      auctionTimeToClose: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The stable currency id
       **/
      getSetUSDId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The minimum increment size of each bid compared to the previous one
       **/
      minimumIncrementSize: Rate & AugmentedConst<ApiType>;
      /**
       * A configuration for base priority of unsigned transactions.
       * 
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple modules send unsigned transactions.
       **/
      unsignedPriority: TransactionPriority & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    authorship: {
      /**
       * The number of blocks back we should accept uncles.
       * This means that we will deal with uncle-parents that are
       * `UncleGenerations + 1` before `now`.
       **/
      uncleGenerations: BlockNumber & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    babe: {
      /**
       * The amount of time, in slots, that each epoch should last.
       * NOTE: Currently it is not possible to change the epoch duration after
       * the chain has started. Attempting to do so will brick block production.
       **/
      epochDuration: u64 & AugmentedConst<ApiType>;
      /**
       * The expected average block time at which BABE should be creating
       * blocks. Since BABE is probabilistic it is not trivial to figure out
       * what the expected average block time should be based on the slot
       * duration and the security parameter `c` (where `1 - c` represents
       * the probability of a slot being empty).
       **/
      expectedBlockTime: Moment & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    balances: {
      /**
       * The minimum amount required to keep an account open.
       **/
      existentialDeposit: Balance & AugmentedConst<ApiType>;
      /**
       * The maximum number of locks that should exist on an account.
       * Not strictly enforced, but used for weight estimation.
       **/
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of named reserves that can exist on an account.
       **/
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    bounties: {
      /**
       * Percentage of the curator fee that will be reserved upfront as deposit for bounty curator.
       **/
      bountyCuratorDeposit: Permill & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit for placing a bounty proposal.
       **/
      bountyDepositBase: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The delay period for which a bounty beneficiary need to wait before claim the payout.
       **/
      bountyDepositPayoutDelay: BlockNumber & AugmentedConst<ApiType>;
      /**
       * Bounty duration in blocks.
       **/
      bountyUpdatePeriod: BlockNumber & AugmentedConst<ApiType>;
      /**
       * Minimum value for a bounty.
       **/
      bountyValueMinimum: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit per byte within bounty description.
       **/
      dataDepositPerByte: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Maximum acceptable reason length.
       **/
      maximumReasonLength: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpEngine: {
      /**
       * The alternative swap path joint list, which can be concated to
       * alternative swap path when cdp treasury swap collateral to stable.
       **/
      alternativeSwapPathJointList: Vec<Vec<CurrencyId>> & AugmentedConst<ApiType>;
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
      /**
       * The default debit exchange rate for all collateral types
       **/
      defaultDebitExchangeRate: ExchangeRate & AugmentedConst<ApiType>;
      /**
       * The default liquidation penalty rate when liquidate unsafe CDP
       **/
      defaultLiquidationPenalty: Rate & AugmentedConst<ApiType>;
      /**
       * The default liquidation ratio for all collateral types of CDP
       **/
      defaultLiquidationRatio: Ratio & AugmentedConst<ApiType>;
      /**
       * Stablecoin currency id
       **/
      getSetUSDId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * When swap with DEX, the acceptable max slippage for the price from oracle.
       **/
      maxSwapSlippageCompareToOracle: Ratio & AugmentedConst<ApiType>;
      /**
       * The minimum debit value to avoid debit dust
       **/
      minimumDebitValue: Balance & AugmentedConst<ApiType>;
      /**
       * A configuration for base priority of unsigned transactions.
       * 
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple modules send unsigned transactions.
       **/
      unsignedPriority: TransactionPriority & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cdpTreasury: {
      /**
       * The alternative swap path joint list, which can be concated to
       * alternative swap path when cdp treasury swap collateral to stable.
       **/
      alternativeSwapPathJointList: Vec<Vec<CurrencyId>> & AugmentedConst<ApiType>;
      /**
       * Stablecoin currency id
       **/
      getSetUSDId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The cap of lots number when create collateral auction on a
       * liquidation or to create debit/surplus auction on block end.
       * If set to 0, does not work.
       **/
      maxAuctionsCount: u32 & AugmentedConst<ApiType>;
      /**
       * The CDP treasury's module id, keep surplus and collateral assets
       * from liquidation.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    currencies: {
      /**
       * The native currency id
       **/
      getNativeCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    dex: {
      /**
       * Trading fee rate
       * The first item of the tuple is the numerator of the fee rate, second
       * item is the denominator, fee_rate = numerator / denominator,
       * use (u32, u32) over `Rate` type to minimize internal division
       * operation.
       **/
      getExchangeFee: ITuple<[u32, u32]> & AugmentedConst<ApiType>;
      /**
       * Trading fee waiver rate
       * The first item of the tuple is the numerator of the fee rate, second
       * item is the denominator, fee_rate = numerator / denominator,
       * use (u32, u32) over `Rate` type to minimize internal division
       * operation.
       **/
      getStableCurrencyExchangeFee: ITuple<[u32, u32]> & AugmentedConst<ApiType>;
      /**
       * The DEX's module id, keep all assets in DEX.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * The limit for length of trading path
       **/
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    emergencyShutdown: {
      /**
       * The list of valid collateral currency types
       **/
      collateralCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    evm: {
      /**
       * Chain ID of EVM.
       **/
      chainId: u64 & AugmentedConst<ApiType>;
      /**
       * The fee for deploying the contract.
       **/
      deploymentFee: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Deposit for the developer.
       **/
      developerDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The EVM address for creating system contract.
       **/
      networkContractSource: EvmAddress & AugmentedConst<ApiType>;
      /**
       * Charge extra bytes for creating a contract, would be reserved until
       * the contract deleted.
       **/
      newContractExtraBytes: u32 & AugmentedConst<ApiType>;
      /**
       * Storage required for per byte.
       **/
      storageDepositPerByte: BalanceOf & AugmentedConst<ApiType>;
      treasuryAccount: AccountId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    identity: {
      /**
       * The amount held on deposit for a registered identity
       **/
      basicDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit per additional field for a registered identity.
       **/
      fieldDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Maximum number of additional fields that may be stored in an ID. Needed to bound the I/O
       * required to access an identity, but can be pretty high.
       **/
      maxAdditionalFields: u32 & AugmentedConst<ApiType>;
      /**
       * Maxmimum number of registrars allowed in the system. Needed to bound the complexity
       * of, e.g., updating judgements.
       **/
      maxRegistrars: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of sub-accounts allowed per identified account.
       **/
      maxSubAccounts: u32 & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit for a registered subaccount. This should account for the fact
       * that one storage item's value will increase by the size of an account ID, and there will be
       * another trie item whose value is the size of an account ID plus 32 bytes.
       **/
      subAccountDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    imOnline: {
      /**
       * A configuration for base priority of unsigned transactions.
       * 
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple pallets send unsigned transactions.
       **/
      unsignedPriority: TransactionPriority & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    indices: {
      /**
       * The deposit needed for reserving an index.
       **/
      deposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    launchPad: {
      /**
       * The Campaign Commission rate taken from successful campaigns
       * The Treasury Commission is transferred to the Network's Treasury account.
       * The first item of the tuple is the numerator of the commission rate, second
       * item is the denominator, fee_rate = numerator / denominator,
       * use (u32, u32) over another type to minimize internal division operation.
       **/
      getCommission: ITuple<[u32, u32]> & AugmentedConst<ApiType>;
      /**
       * Native currency_id.
       * 
       **/
      getNativeCurrencyId: CurrencyIdOf & AugmentedConst<ApiType>;
      /**
       * The Airdrop module pallet id, keeps airdrop funds.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    loans: {
      /**
       * The loan's module id, keep all collaterals of CDPs.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    multisig: {
      /**
       * The base amount of currency needed to reserve for creating a multisig execution or to store
       * a dispatch call for later.
       * 
       * This is held for an additional storage item whose value size is
       * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
       * `32 + sizeof(AccountId)` bytes.
       **/
      depositBase: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per unit threshold when creating a multisig execution.
       * 
       * This is held for adding 32 bytes more into a pre-existing storage value.
       **/
      depositFactor: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The maximum amount of signatories allowed in the multisig.
       **/
      maxSignatories: u16 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    nft: {
      /**
       * The minimum balance to create class
       **/
      createClassDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The minimum balance to create token
       **/
      createTokenDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Deposit required for per byte.
       **/
      dataDepositPerByte: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Maximum number of bytes in attributes
       **/
      maxAttributesBytes: u32 & AugmentedConst<ApiType>;
      /**
       * The NFT's module id
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    prices: {
      /**
       * The stable currency id, it should be SETUSD in Setheum.
       **/
      getSetUSDId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The stable currency id, it should be SETR in Setheum.
       **/
      setterCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The fixed prices of stable currency SETR, it should be 0.1 USD (10 cents) in Setheum.
       **/
      setterFixedPrice: Price & AugmentedConst<ApiType>;
      /**
       * The fixed prices of stable currency SETUSD, it should be 1 USD in Setheum.
       **/
      setUSDFixedPrice: Price & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    proxy: {
      /**
       * The base amount of currency needed to reserve for creating an announcement.
       * 
       * This is held when a new storage item holding a `Balance` is created (typically 16 bytes).
       **/
      announcementDepositBase: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per announcement made.
       * 
       * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
       * into a pre-existing storage value.
       **/
      announcementDepositFactor: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The maximum amount of time-delayed announcements that are allowed to be pending.
       **/
      maxPending: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of proxies allowed for a single account.
       **/
      maxProxies: u32 & AugmentedConst<ApiType>;
      /**
       * The base amount of currency needed to reserve for creating a proxy.
       * 
       * This is held for an additional storage item whose value size is
       * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
       **/
      proxyDepositBase: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per proxy added.
       * 
       * This is held for adding 32 bytes plus an instance of `ProxyType` more into a pre-existing
       * storage value. Thus, when configuring `ProxyDepositFactor` one should take into account
       * `32 + proxy_type.encode().len()` bytes of data.
       **/
      proxyDepositFactor: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    recovery: {
      /**
       * The base amount of currency needed to reserve for creating a recovery configuration.
       * 
       * This is held for an additional storage item whose value size is
       * `2 + sizeof(BlockNumber, Balance)` bytes.
       **/
      configDepositBase: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per additional user when creating a recovery configuration.
       * 
       * This is held for adding `sizeof(AccountId)` bytes more into a pre-existing storage value.
       **/
      friendDepositFactor: BalanceOf & AugmentedConst<ApiType>;
      /**
       * The maximum amount of friends allowed in a recovery configuration.
       **/
      maxFriends: u16 & AugmentedConst<ApiType>;
      /**
       * The base amount of currency needed to reserve for starting a recovery.
       * 
       * This is primarily held for deterring malicious recovery attempts, and should
       * have a value large enough that a bad actor would choose not to place this
       * deposit. It also acts to fund additional storage item whose value size is
       * `sizeof(BlockNumber, Balance + T * AccountId)` bytes. Where T is a configurable
       * threshold.
       **/
      recoveryDeposit: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    scheduler: {
      /**
       * The maximum weight that may be scheduled per block for any dispatchables of less priority
       * than `schedule::HARD_DEADLINE`.
       **/
      maximumWeight: Weight & AugmentedConst<ApiType>;
      /**
       * The maximum number of scheduled calls in the queue for a single block.
       * Not strictly enforced, but used for weight estimation.
       **/
      maxScheduledPerBlock: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    serpTreasury: {
      /**
       * The alternative swap path joint list, which can be concated to
       * alternative swap path when SERP-Treasury swaps for buyback.
       **/
      alternativeSwapPathJointList: Vec<Vec<CurrencyId>> & AugmentedConst<ApiType>;
      /**
       * CDP-Treasury account for processing serplus funds
       * CDPTreasury account.
       **/
      cdpTreasuryAccountId: AccountId & AugmentedConst<ApiType>;
      /**
       * The Dinar (DNAR) currency id
       **/
      getDinarCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * HighEnd LaunchPad (HELP) currency id. (LaunchPad Token)
       * 
       **/
      getHelpCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * Native (SETM) currency id
       **/
      getNativeCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The Serp (SERP) currency id
       **/
      getSerpCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The SetUSD currency id, it should be SETUSD in Setheum.
       **/
      getSetUSDId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The SERP Treasury's module id, keeps serplus and reserve asset.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Setter (SETR) currency id
       * 
       **/
      setterCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * A duration period for performing SERP-TES Operations.
       **/
      stableCurrencyInflationPeriod: BlockNumber & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    setmint: {
      /**
       * Reserved amount per authorization.
       **/
      depositPerAuthorization: Balance & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    staking: {
      /**
       * Number of eras that staked funds must remain bonded for.
       **/
      bondingDuration: EraIndex & AugmentedConst<ApiType>;
      maxNominations: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of nominators rewarded for each validator.
       * 
       * For each validator only the `$MaxNominatorRewardedPerValidator` biggest stakers can claim
       * their reward. This used to limit the i/o cost for the nominator payout.
       **/
      maxNominatorRewardedPerValidator: u32 & AugmentedConst<ApiType>;
      /**
       * Number of sessions per era.
       **/
      sessionsPerEra: SessionIndex & AugmentedConst<ApiType>;
      /**
       * Number of eras that slashes are deferred by, after computation.
       * 
       * This should be less than the bonding duration. Set to 0 if slashes
       * should be applied immediately, without opportunity for intervention.
       **/
      slashDeferDuration: EraIndex & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    system: {
      /**
       * Maximum number of block number to block hash mappings to keep (oldest pruned first).
       **/
      blockHashCount: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The maximum length of a block (in bytes).
       **/
      blockLength: BlockLength & AugmentedConst<ApiType>;
      /**
       * Block & extrinsics weights: base values and limits.
       **/
      blockWeights: BlockWeights & AugmentedConst<ApiType>;
      /**
       * The weight of runtime database operations the runtime can invoke.
       **/
      dbWeight: RuntimeDbWeight & AugmentedConst<ApiType>;
      /**
       * The designated SS85 prefix of this chain.
       * 
       * This replaces the "ss58Format" property declared in the chain spec. Reason is
       * that the runtime should know about the prefix in order to make use of it as
       * an identifier of the chain.
       **/
      ss58Prefix: u16 & AugmentedConst<ApiType>;
      /**
       * Get the chain's current version.
       **/
      version: RuntimeVersion & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    timestamp: {
      /**
       * The minimum period between blocks. Beware that this is different to the *expected* period
       * that the block production apparatus provides. Your chosen consensus system will generally
       * work with this to determine a sensible block time. e.g. For Aura, it will be double this
       * period on default settings.
       **/
      minimumPeriod: Moment & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tips: {
      /**
       * The amount held on deposit per byte within the tip report reason.
       **/
      dataDepositPerByte: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Maximum acceptable reason length.
       **/
      maximumReasonLength: u32 & AugmentedConst<ApiType>;
      /**
       * The period for which a tip remains open after is has achieved threshold tippers.
       **/
      tipCountdown: BlockNumber & AugmentedConst<ApiType>;
      /**
       * The amount of the final tip which goes to the original reporter of the tip.
       **/
      tipFindersFee: Percent & AugmentedConst<ApiType>;
      /**
       * The amount held on deposit for placing a tip report.
       **/
      tipReportDepositBase: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tokens: {
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    transactionPayment: {
      /**
       * Default fee swap path list
       **/
      defaultFeeSwapPathList: Vec<Vec<CurrencyId>> & AugmentedConst<ApiType>;
      /**
       * When swap with DEX, the acceptable max slippage for the price from oracle.
       **/
      maxSwapSlippageCompareToOracle: Ratio & AugmentedConst<ApiType>;
      /**
       * Native currency id, the actual received currency type as fee for
       * treasury. Should be SETM
       **/
      nativeCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The limit for length of trading path
       **/
      tradingPathLimit: u32 & AugmentedConst<ApiType>;
      /**
       * The fee to be paid for making a transaction; the per-byte portion.
       **/
      transactionByteFee: PalletBalanceOf & AugmentedConst<ApiType>;
      /**
       * The polynomial that is applied in order to derive fee from weight.
       **/
      weightToFee: Vec<WeightToFeeCoefficient> & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    treasury: {
      /**
       * Percentage of spare funds (if any) that are burnt per spend period.
       **/
      burn: Permill & AugmentedConst<ApiType>;
      /**
       * The maximum number of approvals that can wait in the spending queue.
       **/
      maxApprovals: u32 & AugmentedConst<ApiType>;
      /**
       * The treasury's pallet id, used for deriving its sovereign account ID.
       **/
      palletId: PalletId & AugmentedConst<ApiType>;
      /**
       * Fraction of a proposal's value that should be bonded in order to place the proposal.
       * An accepted proposal gets these back. A rejected proposal does not.
       **/
      proposalBond: Permill & AugmentedConst<ApiType>;
      /**
       * Minimum amount of funds that should be placed in a deposit for making a proposal.
       **/
      proposalBondMinimum: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Period between successive spends.
       **/
      spendPeriod: BlockNumber & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    utility: {
      /**
       * The limit on the number of batched calls.
       **/
      batchedCallsLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    vesting: {
      /**
       * The Dinar (DNAR) currency id.
       * 
       **/
      getDinarCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * HighEnd LaunchPad (HELP) currency id. (LaunchPad Token)
       * 
       **/
      getHelpCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * Native Setheum (SETM) currency id. [P]Pronounced "set M" or "setem"
       * 
       **/
      getNativeCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * Serp (SERP) currency id.
       * 
       **/
      getSerpCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The SetDollar (SETUSD) currency id
       **/
      getSetUSDId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * The minimum amount transferred to call `vested_transfer`.
       **/
      minVestedTransfer: BalanceOf & AugmentedConst<ApiType>;
      /**
       * Setter (SETR) currency id
       * 
       **/
      setterCurrencyId: CurrencyId & AugmentedConst<ApiType>;
      /**
       * SetheumTreasury account. For Vested Transfer
       **/
      treasuryAccount: AccountId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts
} // declare module
