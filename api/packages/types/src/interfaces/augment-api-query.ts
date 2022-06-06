// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { CallOf, ScheduleTaskIndex } from '@open-web3/orml-types/interfaces/authority';
import type { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { VestingScheduleOf } from '@open-web3/orml-types/interfaces/vesting';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { Data } from '@polkadot/types';
import type { Bytes, Option, U8aFixed, Vec, bool, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { BabeAuthorityWeight, BabeEpochConfiguration, MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import type { AccountData, BalanceLock, ReserveData } from '@polkadot/types/interfaces/balances';
import type { ProposalIndex, Votes } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Proposal } from '@polkadot/types/interfaces/democracy';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type { RegistrarInfo, Registration } from '@polkadot/types/interfaces/identity';
import type { AuthIndex } from '@polkadot/types/interfaces/imOnline';
import type { Kind, OffenceDetails, OpaqueTimeSlot, ReportIdOf } from '@polkadot/types/interfaces/offences';
import type { ProxyAnnouncement, ProxyDefinition } from '@polkadot/types/interfaces/proxy';
import type { ActiveRecovery, RecoveryConfig } from '@polkadot/types/interfaces/recovery';
import type { Scheduled, TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { ActiveEraInfo, EraIndex, EraRewardPoints, Exposure, Forcing, Nominations, RewardDestination, SlashingSpans, SpanIndex, SpanRecord, StakingLedger, UnappliedSlash, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import type { AccountInfo, ConsumedWeight, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Bounty, BountyIndex, OpenTip, TreasuryProposal } from '@polkadot/types/interfaces/treasury';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { ClassId } from '@polkadot/types/interfaces/uniques';
import type { Multisig } from '@polkadot/types/interfaces/utility';
import type { Observable } from '@polkadot/types/types';
import type { CollateralAuctionItem } from '@setheum.js/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@setheum.js/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@setheum.js/types/interfaces/dex';
import type { CodeInfo, Erc20Info, EvmAddress } from '@setheum.js/types/interfaces/evm';
import type { Position } from '@setheum.js/types/interfaces/loans';
import type { ClassInfoOf, TokenId, TokenInfoOf } from '@setheum.js/types/interfaces/nft';
import type { AuctionId, CampaignId, CampaignInfoOf, CurrencyId, CurrencyIdOf, TradingPair } from '@setheum.js/types/interfaces/primitives';
import type { AccountId, AccountIndex, Balance, BalanceOf, BlockNumber, H256, Hash, KeyTypeId, Moment, OpaqueCall, OracleKey, Perbill, Percent, Releases, Slot, ValidatorId } from '@setheum.js/types/interfaces/runtime';
import type { ExchangeRate } from '@setheum.js/types/interfaces/support';

declare module '@polkadot/api-base/types/storage' {
  export interface AugmentedQueries<ApiType extends ApiTypes> {
    auction: {
      /**
       * Index auctions by end time.
       **/
      auctionEndTime: AugmentedQuery<ApiType, (arg1: BlockNumber | AnyNumber | Uint8Array, arg2: AuctionId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>, [BlockNumber, AuctionId]> & QueryableStorageEntry<ApiType, [BlockNumber, AuctionId]>;
      /**
       * Stores on-going and future auctions. Closed auction are removed.
       **/
      auctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<AuctionInfo>>, [AuctionId]> & QueryableStorageEntry<ApiType, [AuctionId]>;
      /**
       * Track the next auction ID.
       **/
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<AuctionId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auctionManager: {
      /**
       * Mapping from auction id to collateral auction info
       * 
       * CollateralAuctions: map AuctionId => Option<CollateralAuctionItem>
       **/
      collateralAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<CollateralAuctionItem>>, [AuctionId]> & QueryableStorageEntry<ApiType, [AuctionId]>;
      /**
       * Record of the total collateral amount of all active collateral auctions
       * under specific collateral type CollateralType -> TotalAmount
       * 
       * TotalCollateralInAuction: map CurrencyId => Balance
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Record of total target sales of all active collateral auctions
       * 
       * TotalTargetInAuction: Balance
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authority: {
      nextTaskIndex: AugmentedQuery<ApiType, () => Observable<ScheduleTaskIndex>, []> & QueryableStorageEntry<ApiType, []>;
      savedCalls: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<ITuple<[CallOf, Option<AccountId>]>>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authorship: {
      /**
       * Author of current block.
       **/
      author: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Whether uncles were already set in this block.
       **/
      didSetUncles: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Uncles
       **/
      uncles: AugmentedQuery<ApiType, () => Observable<Vec<UncleEntryItem>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    babe: {
      /**
       * Current epoch authorities.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * This field should always be populated during block processing unless
       * secondary plain slots are enabled (which don't contain a VRF output).
       * 
       * It is set in `on_initialize`, before it will contain the value from the last block.
       **/
      authorVrfRandomness: AugmentedQuery<ApiType, () => Observable<MaybeRandomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current slot number.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<Slot>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
       **/
      epochConfig: AugmentedQuery<ApiType, () => Observable<Option<BabeEpochConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current epoch index.
       **/
      epochIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The block numbers when the last and current epoch have started, respectively `N-1` and
       * `N`.
       * NOTE: We track this is in order to annotate the block number when a given pool of
       * entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
       * slots, which may be skipped, the block numbers may not line up with the slot numbers.
       **/
      epochStart: AugmentedQuery<ApiType, () => Observable<ITuple<[BlockNumber, BlockNumber]>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The slot at which the first epoch actually started. This is 0
       * until the first block of the chain.
       **/
      genesisSlot: AugmentedQuery<ApiType, () => Observable<Slot>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Temporary value (cleared at block finalization) which is `Some`
       * if per-block initialization has already been called for current block.
       **/
      initialized: AugmentedQuery<ApiType, () => Observable<Option<MaybeRandomness>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * How late the current block is compared to its parent.
       * 
       * This entry is populated as part of block execution and is cleaned up
       * on block finalization. Querying this storage entry outside of block
       * execution context should always yield zero.
       **/
      lateness: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next epoch authorities.
       **/
      nextAuthorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The configuration for the next epoch, `None` if the config will not change
       * (you can fallback to `EpochConfig` instead in that case).
       **/
      nextEpochConfig: AugmentedQuery<ApiType, () => Observable<Option<BabeEpochConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next epoch randomness.
       **/
      nextRandomness: AugmentedQuery<ApiType, () => Observable<Randomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Pending epoch configuration change that will be applied when the next epoch is enacted.
       **/
      pendingEpochConfigChange: AugmentedQuery<ApiType, () => Observable<Option<NextConfigDescriptor>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The epoch randomness for the *current* epoch.
       * 
       * # Security
       * 
       * This MUST NOT be used for gambling, as it can be influenced by a
       * malicious validator in the short term. It MAY be used in many
       * cryptographic protocols, however, so long as one remembers that this
       * (like everything else on-chain) it is public. For example, it can be
       * used where a number is needed that cannot have been chosen by an
       * adversary, for purposes such as public-coin zero-knowledge proofs.
       **/
      randomness: AugmentedQuery<ApiType, () => Observable<Randomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Randomness under construction.
       * 
       * We make a tradeoff between storage accesses and list length.
       * We store the under-construction randomness in segments of up to
       * `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
       * 
       * Once a segment reaches this length, we begin the next one.
       * We reset all segments and return to `0` at the beginning of every
       * epoch.
       **/
      segmentIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
       **/
      underConstruction: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Randomness>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    balances: {
      /**
       * The balance of an account.
       * 
       * NOTE: This is only used in the case that this pallet is used to store balances.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountData>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Named reserves on some account balances.
       **/
      reserves: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<ReserveData>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Storage version of the pallet.
       * 
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    bounties: {
      /**
       * Bounties that have been made.
       **/
      bounties: AugmentedQuery<ApiType, (arg: BountyIndex | AnyNumber | Uint8Array) => Observable<Option<Bounty>>, [BountyIndex]> & QueryableStorageEntry<ApiType, [BountyIndex]>;
      /**
       * Bounty indices that have been approved but not yet funded.
       **/
      bountyApprovals: AugmentedQuery<ApiType, () => Observable<Vec<BountyIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of bounty proposals that have been made.
       **/
      bountyCount: AugmentedQuery<ApiType, () => Observable<BountyIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The description of each bounty.
       **/
      bountyDescriptions: AugmentedQuery<ApiType, (arg: BountyIndex | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [BountyIndex]> & QueryableStorageEntry<ApiType, [BountyIndex]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpEngine: {
      /**
       * Mapping from collateral type to its risk management params
       * 
       * CollateralParams: CurrencyId => RiskManagementParams
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<RiskManagementParams>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and
       * debit value
       * 
       * DebitExchangeRate: CurrencyId => Option<ExchangeRate>
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Option<ExchangeRate>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      /**
       * Current total debit value of system under `currency_id`. It's not same as debit in CDP
       * engine, it is the bad debt of the system under a specific stable currency.
       * 
       * DebitPool: map CurrencyId => Balance
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The expected amount size for per lot collateral auction of specific
       * collateral type.
       * 
       * ExpectedCollateralAuctionSize: map CurrencyId => Balance
       **/
      expectedCollateralAuctionSize: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    dex: {
      /**
       * Initial exchange rate, used to calculate the dex share amount for founders of provisioning
       * 
       * InitialShareExchangeRates: map TradingPair => (ExchangeRate, ExchangeRate)
       **/
      initialShareExchangeRates: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<ITuple<[ExchangeRate, ExchangeRate]>>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Liquidity pool for TradingPair.
       * 
       * LiquidityPool: map TradingPair => (Balance, Balance)
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<ITuple<[Balance, Balance]>>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Provision of TradingPair by AccountId.
       * 
       * ProvisioningPool: double_map TradingPair, AccountId => (Balance,
       * Balance)
       **/
      provisioningPool: AugmentedQuery<ApiType, (arg1: TradingPair, arg2: AccountId | string | Uint8Array) => Observable<ITuple<[Balance, Balance]>>, [TradingPair, AccountId]> & QueryableStorageEntry<ApiType, [TradingPair, AccountId]>;
      /**
       * Status for TradingPair.
       * 
       * TradingPairStatuses: map TradingPair => TradingPairStatus
       **/
      tradingPairStatuses: AugmentedQuery<ApiType, (arg: TradingPair) => Observable<TradingPairStatus>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    emergencyShutdown: {
      /**
       * Open final redemption flag
       * 
       * CanRefund: bool
       **/
      canRefund: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Emergency shutdown flag
       * 
       * IsShutdown: bool
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evm: {
      /**
       * The EVM accounts info.
       * 
       * Accounts: map EvmAddress => Option<AccountInfo<T>>
       **/
      accounts: AugmentedQuery<ApiType, (arg: EvmAddress | string | Uint8Array) => Observable<Option<AccountInfo>>, [EvmAddress]> & QueryableStorageEntry<ApiType, [EvmAddress]>;
      /**
       * The storages for EVM contracts.
       * 
       * AccountStorages: double_map EvmAddress, H256 => H256
       **/
      accountStorages: AugmentedQuery<ApiType, (arg1: EvmAddress | string | Uint8Array, arg2: H256 | string | Uint8Array) => Observable<H256>, [EvmAddress, H256]> & QueryableStorageEntry<ApiType, [EvmAddress, H256]>;
      /**
       * The code info for EVM contracts.
       * Key is Keccak256 hash of code.
       * 
       * CodeInfos: H256 => Option<CodeInfo>
       **/
      codeInfos: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<CodeInfo>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The code for EVM contracts.
       * Key is Keccak256 hash of code.
       * 
       * Codes: H256 => Vec<u8>
       **/
      codes: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Bytes>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The storage usage for contracts. Including code size, extra bytes and total AccountStorages
       * size.
       * 
       * Accounts: map EvmAddress => u32
       **/
      contractStorageSizes: AugmentedQuery<ApiType, (arg: EvmAddress | string | Uint8Array) => Observable<u32>, [EvmAddress]> & QueryableStorageEntry<ApiType, [EvmAddress]>;
      /**
       * Extrinsics origin for the current transaction.
       * 
       * ExtrinsicOrigin: Option<AccountId>
       **/
      extrinsicOrigin: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next available system contract address.
       * 
       * NetworkContractIndex: u64
       **/
      networkContractIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evmAccounts: {
      /**
       * The Substrate Account for EvmAddresses
       * 
       * Accounts: map EvmAddress => Option<AccountId>
       **/
      accounts: AugmentedQuery<ApiType, (arg: EvmAddress | string | Uint8Array) => Observable<Option<AccountId>>, [EvmAddress]> & QueryableStorageEntry<ApiType, [EvmAddress]>;
      /**
       * The EvmAddress for Substrate Accounts
       * 
       * EvmAddresses: map AccountId => Option<EvmAddress>
       **/
      evmAddresses: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<EvmAddress>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evmManager: {
      /**
       * Mapping between u32 and Erc20 address.
       * Erc20 address is 20 byte, take the first 4 non-zero bytes, if it is less
       * than 4, add 0 to the left.
       * 
       * map u32 => Option<Erc20Info>
       **/
      currencyIdMap: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<Erc20Info>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    grandpa: {
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<SetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<StoredPendingChange>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       * 
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<ApiType, (arg: SetId | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>, [SetId]> & QueryableStorageEntry<ApiType, [SetId]>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[BlockNumber, BlockNumber]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<StoredState>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    identity: {
      /**
       * Information that is pertinent to identify the entity behind an account.
       * 
       * TWOX-NOTE: OK ― `AccountId` is a secure hash.
       **/
      identityOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Registration>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The set of registrars. Not expected to get very big as can only be added through a
       * special origin (likely a council motion).
       * 
       * The index into this can be cast to `RegistrarIndex` to get a valid value.
       **/
      registrars: AugmentedQuery<ApiType, () => Observable<Vec<Option<RegistrarInfo>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Alternative "sub" identities of this account.
       * 
       * The first item is the deposit, the second is a vector of the accounts.
       * 
       * TWOX-NOTE: OK ― `AccountId` is a secure hash.
       **/
      subsOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ITuple<[BalanceOf, Vec<AccountId>]>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The super-identity of an alternative "sub" identity together with its name, within that
       * context. If the account is not some other account's sub-identity, then just `None`.
       **/
      superOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<ITuple<[AccountId, Data]>>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    imOnline: {
      /**
       * For each session index, we keep a mapping of `ValidatorId<T>` to the
       * number of blocks authored by the given authority.
       **/
      authoredBlocks: AugmentedQuery<ApiType, (arg1: SessionIndex | AnyNumber | Uint8Array, arg2: ValidatorId | string | Uint8Array) => Observable<u32>, [SessionIndex, ValidatorId]> & QueryableStorageEntry<ApiType, [SessionIndex, ValidatorId]>;
      /**
       * The block number after which it's ok to send heartbeats in the current
       * session.
       * 
       * At the beginning of each session we set this to a value that should fall
       * roughly in the middle of the session duration. The idea is to first wait for
       * the validators to produce a block in the current session, so that the
       * heartbeat later on will not be necessary.
       * 
       * This value will only be used as a fallback if we fail to get a proper session
       * progress estimate from `NextSessionRotation`, as those estimates should be
       * more accurate then the value we calculate for `HeartbeatAfter`.
       **/
      heartbeatAfter: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current set of keys that may issue a heartbeat.
       **/
      keys: AugmentedQuery<ApiType, () => Observable<Vec<AuthorityId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * For each session index, we keep a mapping of `AuthIndex` to
       * `offchain::OpaqueNetworkState`.
       **/
      receivedHeartbeats: AugmentedQuery<ApiType, (arg1: SessionIndex | AnyNumber | Uint8Array, arg2: AuthIndex | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [SessionIndex, AuthIndex]> & QueryableStorageEntry<ApiType, [SessionIndex, AuthIndex]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    indices: {
      /**
       * The lookup from index to account.
       **/
      accounts: AugmentedQuery<ApiType, (arg: AccountIndex | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, BalanceOf, bool]>>>, [AccountIndex]> & QueryableStorageEntry<ApiType, [AccountIndex]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    launchPad: {
      activeCampaignsCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Info on all of the approved campaigns.
       * 
       * map CampaignId => CampaignInfo<T>
       **/
      campaigns: AugmentedQuery<ApiType, (arg: CampaignId | AnyNumber | Uint8Array) => Observable<Option<CampaignInfoOf>>, [CampaignId]> & QueryableStorageEntry<ApiType, [CampaignId]>;
      /**
       * Track the number of Campaigns
       **/
      campaignsCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      campaignsIndex: AugmentedQuery<ApiType, () => Observable<CampaignId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Info on all of the proposed campaigns.
       * 
       * map CampaignId => CampaignInfo<T>
       **/
      proposals: AugmentedQuery<ApiType, (arg: CampaignId | AnyNumber | Uint8Array) => Observable<Option<CampaignInfoOf>>, [CampaignId]> & QueryableStorageEntry<ApiType, [CampaignId]>;
      /**
       * Track the number of Proposals
       **/
      proposalsCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      successfulCampaignsCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Record of the total amount of funds raised in the protocol
       * under a specific currency_id. currency_id => total_raised
       * 
       * TotalAmountRaised: map CurrencyIdOf<T> => BalanceOf<T>
       **/
      totalAmountRaised: AugmentedQuery<ApiType, (arg: CurrencyIdOf | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<BalanceOf>, [CurrencyIdOf]> & QueryableStorageEntry<ApiType, [CurrencyIdOf]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    loans: {
      /**
       * The collateralized debit positions, map from
       * Owner -> CollateralType -> Position
       * 
       * Positions: double_map CurrencyId, AccountId => Position
       **/
      positions: AugmentedQuery<ApiType, (arg1: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Position>, [CurrencyId, AccountId]> & QueryableStorageEntry<ApiType, [CurrencyId, AccountId]>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       * 
       * TotalPositions: CurrencyId => Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Position>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    multisig: {
      calls: AugmentedQuery<ApiType, (arg: U8aFixed | string | Uint8Array) => Observable<Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>, [U8aFixed]> & QueryableStorageEntry<ApiType, [U8aFixed]>;
      /**
       * The set of open multisig operations.
       **/
      multisigs: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: U8aFixed | string | Uint8Array) => Observable<Option<Multisig>>, [AccountId, U8aFixed]> & QueryableStorageEntry<ApiType, [AccountId, U8aFixed]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    offences: {
      /**
       * A vector of reports of the same kind that happened at the same time slot.
       **/
      concurrentReportsIndex: AugmentedQuery<ApiType, (arg1: Kind | string | Uint8Array, arg2: OpaqueTimeSlot | string | Uint8Array) => Observable<Vec<ReportIdOf>>, [Kind, OpaqueTimeSlot]> & QueryableStorageEntry<ApiType, [Kind, OpaqueTimeSlot]>;
      /**
       * The primary structure that holds all offence records keyed by report identifiers.
       **/
      reports: AugmentedQuery<ApiType, (arg: ReportIdOf | string | Uint8Array) => Observable<Option<OffenceDetails>>, [ReportIdOf]> & QueryableStorageEntry<ApiType, [ReportIdOf]>;
      /**
       * Enumerates all reports of a kind along with the time they happened.
       * 
       * All reports are sorted by the time of offence.
       * 
       * Note that the actual type of this mapping is `Vec<u8>`, this is because values of
       * different types are not supported at the moment so we are doing the manual serialization.
       **/
      reportsByKindIndex: AugmentedQuery<ApiType, (arg: Kind | string | Uint8Array) => Observable<Bytes>, [Kind]> & QueryableStorageEntry<ApiType, [Kind]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    operatorMembershipSetheum: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    ormlNFT: {
      /**
       * Store class info.
       * 
       * Returns `None` if class info not set or removed.
       **/
      classes: AugmentedQuery<ApiType, (arg: ClassId | AnyNumber | Uint8Array) => Observable<Option<ClassInfoOf>>, [ClassId]> & QueryableStorageEntry<ApiType, [ClassId]>;
      /**
       * Next available class ID.
       **/
      nextClassId: AugmentedQuery<ApiType, () => Observable<ClassId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next available token ID.
       **/
      nextTokenId: AugmentedQuery<ApiType, (arg: ClassId | AnyNumber | Uint8Array) => Observable<TokenId>, [ClassId]> & QueryableStorageEntry<ApiType, [ClassId]>;
      /**
       * Store token info.
       * 
       * Returns `None` if token info not set or removed.
       **/
      tokens: AugmentedQuery<ApiType, (arg1: ClassId | AnyNumber | Uint8Array, arg2: TokenId | AnyNumber | Uint8Array) => Observable<Option<TokenInfoOf>>, [ClassId, TokenId]> & QueryableStorageEntry<ApiType, [ClassId, TokenId]>;
      /**
       * Token existence check by owner and class ID.
       **/
      tokensByOwner: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: ClassId | AnyNumber | Uint8Array, arg3: TokenId | AnyNumber | Uint8Array) => Observable<ITuple<[]>>, [AccountId, ClassId, TokenId]> & QueryableStorageEntry<ApiType, [AccountId, ClassId, TokenId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    prices: {
      /**
       * Mapping from currency id to it's locked price
       * 
       * map CurrencyId => Option<Price>
       **/
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Option<Price>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    proxy: {
      /**
       * The announcements made by the proxy (key).
       **/
      announcements: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ITuple<[Vec<ProxyAnnouncement>, BalanceOf]>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The set of account proxies. Maps the account which has delegated to the accounts
       * which are being delegated to, together with the amount held on deposit.
       **/
      proxies: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ITuple<[Vec<ProxyDefinition>, BalanceOf]>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    recovery: {
      /**
       * Active recovery attempts.
       * 
       * First account is the account to be recovered, and the second account
       * is the user trying to recover the account.
       **/
      activeRecoveries: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Option<ActiveRecovery>>, [AccountId, AccountId]> & QueryableStorageEntry<ApiType, [AccountId, AccountId]>;
      /**
       * The list of allowed proxy accounts.
       * 
       * Map from the user who can access it to the recovered account.
       **/
      proxy: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AccountId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The set of recoverable accounts and their recovery configuration.
       **/
      recoverable: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<RecoveryConfig>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    scheduler: {
      /**
       * Items to be executed, indexed by the block number that they should be executed on.
       **/
      agenda: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Vec<Option<Scheduled>>>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * Lookup from identity to the block number and index of the task.
       **/
      lookup: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<TaskAddress>>, [Bytes]> & QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Storage version of the pallet.
       * 
       * New networks start with last version.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    serpTreasury: {
      /**
       * The Total count of CashDrops successfully been claimed
       * 
       * CashDropCount: map CurrencyId => u32
       **/
      cashDropCount: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<u32>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * The CashDrop Pool
       * 
       * CashDropPool: map CurrencyId => Balance
       **/
      cashDropPool: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * The Total amounts of CashDrops successfully been claimed
       * 
       * CashDrops: map CurrencyId => Balance
       **/
      cashDrops: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * The inflation rate amount per StableCurrencyInflationPeriod of specific
       * stable currency type.
       * 
       * StableCurrencyInflationRate: map CurrencyId => Balance
       **/
      stableCurrencyInflationRate: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    session: {
      /**
       * Current index of the session.
       **/
      currentIndex: AugmentedQuery<ApiType, () => Observable<SessionIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Indices of disabled validators.
       * 
       * The set is cleared when `on_session_ending` returns a new set of identities.
       **/
      disabledValidators: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The owner of a key. The key is the `KeyTypeId` + the encoded key.
       **/
      keyOwner: AugmentedQuery<ApiType, (arg: ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<ValidatorId>>, [ITuple<[KeyTypeId, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[KeyTypeId, Bytes]>]>;
      /**
       * The next session keys for a validator.
       **/
      nextKeys: AugmentedQuery<ApiType, (arg: ValidatorId | string | Uint8Array) => Observable<Option<Keys>>, [ValidatorId]> & QueryableStorageEntry<ApiType, [ValidatorId]>;
      /**
       * True if the underlying economic identities or weighting behind the validators
       * has changed in the queued validator set.
       **/
      queuedChanged: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The queued keys for the next session. When the next session begins, these keys
       * will be used to determine the validator's session keys.
       **/
      queuedKeys: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[ValidatorId, Keys]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current set of validators.
       **/
      validators: AugmentedQuery<ApiType, () => Observable<Vec<ValidatorId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    setheumOracle: {
      /**
       * If an oracle operator has feed a value in this block
       **/
      hasDispatched: AugmentedQuery<ApiType, () => Observable<OrderedSet>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if Self::values(key) is up to date, otherwise the value is stale
       **/
      isUpdated: AugmentedQuery<ApiType, (arg: OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<bool>, [OracleKey]> & QueryableStorageEntry<ApiType, [OracleKey]>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Option<TimestampedValueOf>>, [AccountId, OracleKey]> & QueryableStorageEntry<ApiType, [AccountId, OracleKey]>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Option<TimestampedValueOf>>, [OracleKey]> & QueryableStorageEntry<ApiType, [OracleKey]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    setmint: {
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       * 
       * Authorization: double_map AccountId, (CurrencyId, T::AccountId) => Option<Balance>
       **/
      authorization: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<Option<Balance>>, [AccountId, ITuple<[CurrencyId, AccountId]>]> & QueryableStorageEntry<ApiType, [AccountId, ITuple<[CurrencyId, AccountId]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    shuraCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    shuraCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    staking: {
      /**
       * The active era information, it holds index and start.
       * 
       * The active era is the era being currently rewarded. Validator set of this era must be
       * equal to [`SessionInterface::validators`].
       **/
      activeEra: AugmentedQuery<ApiType, () => Observable<Option<ActiveEraInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map from all locked "stash" accounts to the controller account.
       **/
      bonded: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AccountId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * A mapping from still-bonded eras to the first session index of that era.
       * 
       * Must contains information for eras for the range:
       * `[active_era - bounding_duration; active_era]`
       **/
      bondedEras: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[EraIndex, SessionIndex]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The amount of currency given to reporters of a slash event which was
       * canceled by extraordinary circumstances (e.g. governance).
       **/
      canceledSlashPayout: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The threshold for when users can start calling `chill_other` for other validators / nominators.
       * The threshold is compared to the actual number of validators / nominators (`CountFor*`) in
       * the system compared to the configured max (`Max*Count`).
       **/
      chillThreshold: AugmentedQuery<ApiType, () => Observable<Option<Percent>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * A tracker to keep count of the number of items in the `Nominators` map.
       **/
      counterForNominators: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * A tracker to keep count of the number of items in the `Validators` map.
       **/
      counterForValidators: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current era index.
       * 
       * This is the latest planned era, depending on how the Session pallet queues the validator
       * set, it might be active or not.
       **/
      currentEra: AugmentedQuery<ApiType, () => Observable<Option<EraIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The last planned session scheduled by the session pallet.
       * 
       * This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
       **/
      currentPlannedSession: AugmentedQuery<ApiType, () => Observable<SessionIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The earliest era for which we have a pending, unapplied slash.
       **/
      earliestUnappliedSlash: AugmentedQuery<ApiType, () => Observable<Option<EraIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Rewards for the last `HISTORY_DEPTH` eras.
       * If reward hasn't been set or has been removed then 0 reward is returned.
       **/
      erasRewardPoints: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<EraRewardPoints>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * Exposure of validator at era.
       * 
       * This is keyed first by the era index to allow bulk deletion and then the stash account.
       * 
       * Is it removed after `HISTORY_DEPTH` eras.
       * If stakers hasn't been set or has been removed then empty exposure is returned.
       **/
      erasStakers: AugmentedQuery<ApiType, (arg1: EraIndex | AnyNumber | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Exposure>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * Clipped Exposure of validator at era.
       * 
       * This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
       * `T::MaxNominatorRewardedPerValidator` biggest stakers.
       * (Note: the field `total` and `own` of the exposure remains unchanged).
       * This is used to limit the i/o cost for the nominator payout.
       * 
       * This is keyed fist by the era index to allow bulk deletion and then the stash account.
       * 
       * Is it removed after `HISTORY_DEPTH` eras.
       * If stakers hasn't been set or has been removed then empty exposure is returned.
       **/
      erasStakersClipped: AugmentedQuery<ApiType, (arg1: EraIndex | AnyNumber | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Exposure>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * The session index at which the era start for the last `HISTORY_DEPTH` eras.
       * 
       * Note: This tracks the starting session (i.e. session index when era start being active)
       * for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
       **/
      erasStartSessionIndex: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * The total amount staked for the last `HISTORY_DEPTH` eras.
       * If total hasn't been set or has been removed then 0 stake is returned.
       **/
      erasTotalStake: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<BalanceOf>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * Similar to `ErasStakers`, this holds the preferences of validators.
       * 
       * This is keyed first by the era index to allow bulk deletion and then the stash account.
       * 
       * Is it removed after `HISTORY_DEPTH` eras.
       **/
      erasValidatorPrefs: AugmentedQuery<ApiType, (arg1: EraIndex | AnyNumber | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<ValidatorPrefs>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * The total validator era payout for the last `HISTORY_DEPTH` eras.
       * 
       * Eras that haven't finished yet or has been removed doesn't have reward.
       **/
      erasValidatorReward: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Option<BalanceOf>>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * Mode of era forcing.
       **/
      forceEra: AugmentedQuery<ApiType, () => Observable<Forcing>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of eras to keep in history.
       * 
       * Information is kept for eras in `[current_era - history_depth; current_era]`.
       * 
       * Must be more than the number of eras delayed by session otherwise. I.e. active era must
       * always be in history. I.e. `active_era > current_era - history_depth` must be
       * guaranteed.
       **/
      historyDepth: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
       * easy to initialize and the performance hit is minimal (we expect no more than four
       * invulnerables) and restricted to testnets.
       **/
      invulnerables: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map from all (unlocked) "controller" accounts to the info regarding the staking.
       **/
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<StakingLedger>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The maximum nominator count before we stop allowing new validators to join.
       * 
       * When this value is not set, no limits are enforced.
       **/
      maxNominatorsCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The maximum validator count before we stop allowing new validators to join.
       * 
       * When this value is not set, no limits are enforced.
       **/
      maxValidatorsCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Minimum number of staking participants before emergency conditions are imposed.
       **/
      minimumValidatorCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The minimum active bond to become and maintain the role of a nominator.
       **/
      minNominatorBond: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The minimum active bond to become and maintain the role of a validator.
       **/
      minValidatorBond: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The map from nominator stash key to the set of stash keys of all validators to nominate.
       * 
       * When updating this storage item, you must also update the `CounterForNominators`.
       **/
      nominators: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Nominations>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * All slashing events on nominators, mapped by era to the highest slash value of the era.
       **/
      nominatorSlashInEra: AugmentedQuery<ApiType, (arg1: EraIndex | AnyNumber | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Option<BalanceOf>>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * Where the reward payment should be made. Keyed by stash.
       **/
      payee: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<RewardDestination>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Slashing spans for stash accounts.
       **/
      slashingSpans: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<SlashingSpans>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The percentage of the slash that is distributed to reporters.
       * 
       * The rest of the slashed value is handled by the `Slash`.
       **/
      slashRewardFraction: AugmentedQuery<ApiType, () => Observable<Perbill>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Records information about the maximum slash of a stash within a slashing span,
       * as well as how much reward has been paid out.
       **/
      spanSlash: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, SpanIndex]> | [AccountId | string | Uint8Array, SpanIndex | AnyNumber | Uint8Array]) => Observable<SpanRecord>, [ITuple<[AccountId, SpanIndex]>]> & QueryableStorageEntry<ApiType, [ITuple<[AccountId, SpanIndex]>]>;
      /**
       * True if network has been upgraded to this version.
       * Storage version of the pallet.
       * 
       * This is set to v7.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * All unapplied slashes that are queued for later.
       **/
      unappliedSlashes: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Vec<UnappliedSlash>>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * The ideal number of staking participants.
       **/
      validatorCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The map from (wannabe) validator stash key to the preferences of that validator.
       * 
       * When updating this storage item, you must also update the `CounterForValidators`.
       **/
      validators: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ValidatorPrefs>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * All slashing events on validators, mapped by era to the highest slash proportion
       * and slash value of the era.
       **/
      validatorSlashInEra: AugmentedQuery<ApiType, (arg1: EraIndex | AnyNumber | Uint8Array, arg2: AccountId | string | Uint8Array) => Observable<Option<ITuple<[Perbill, BalanceOf]>>>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sudo: {
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    system: {
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountInfo>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<ConsumedWeight>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<DigestOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Events deposited for the current block.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       * 
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       * 
       * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<Phase>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<LastRuntimeUpgradeInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<Hash>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
       * (default) if not.
       **/
      upgradedToTripleRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    technicalCommittee: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    technicalCommitteeMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tips: {
      /**
       * Simple preimage lookup from the reason's hash to the original data. Again, has an
       * insecure enumerable hash since the key is guaranteed to be the result of a secure hash.
       **/
      reasons: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Bytes>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * TipsMap that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
       * This has the insecure enumerable hash function since the key itself is already
       * guaranteed to be a secure hash.
       **/
      tips: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<OpenTip>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tokens: {
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store
       * balances.
       **/
      accounts: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<AccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPause: {
      /**
       * The paused transaction map
       * 
       * map (PalletNameBytes, FunctionNameBytes) => Option<()>
       **/
      pausedTransactions: AugmentedQuery<ApiType, (arg: ITuple<[Bytes, Bytes]> | [Bytes | string | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<ITuple<[]>>>, [ITuple<[Bytes, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[Bytes, Bytes]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      /**
       * The alternative fee swap path of accounts.
       **/
      alternativeFeeSwapPath: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Vec<CurrencyId>>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The next fee multiplier.
       * 
       * NextFeeMultiplier: Multiplier
       **/
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    treasury: {
      /**
       * Proposal indices that have been approved but not yet awarded.
       **/
      approvals: AugmentedQuery<ApiType, () => Observable<Vec<ProposalIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of proposals that have been made.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<ProposalIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals that have been made.
       **/
      proposals: AugmentedQuery<ApiType, (arg: ProposalIndex | AnyNumber | Uint8Array) => Observable<Option<TreasuryProposal>>, [ProposalIndex]> & QueryableStorageEntry<ApiType, [ProposalIndex]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    vesting: {
      /**
       * Vesting schedules of an account under DNAR currency.
       * 
       * DinarVestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      dinarVestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Vesting schedules of an account under HELP currency.
       * 
       * HelpVestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      helpVestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Vesting schedules of an account under SETM currency.
       * 
       * NativeVestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      nativeVestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Vesting schedules of an account under SERP currency.
       * 
       * SerpVestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      serpVestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Vesting schedules of an account under SETR currency.
       * 
       * SetterVestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      setterVestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Vesting schedules of an account under SETUSD currency.
       * 
       * SetUSDVestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      setUSDVestingSchedules: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<VestingScheduleOf>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module
