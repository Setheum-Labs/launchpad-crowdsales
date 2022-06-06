// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Option, U8aFixed, Vec, bool, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple } from '@polkadot/types/types';
import type { CollateralAuctionItem } from '@setheum.js/types/interfaces/auctionManager';
import type { RiskManagementParams } from '@setheum.js/types/interfaces/cdpEngine';
import type { TradingPairStatus } from '@setheum.js/types/interfaces/dex';
import type { CodeInfo, Erc20Info, EvmAddress } from '@setheum.js/types/interfaces/evm';
import type { Position } from '@setheum.js/types/interfaces/loans';
import type { ClassInfoOf, TokenId } from '@setheum.js/types/interfaces/nft';
import type { AuctionId, CurrencyId, TradingPair } from '@setheum.js/types/interfaces/primitives';
import type { AccountId, Balance, BalanceOf, BlockNumber, H256, Hash, KeyTypeId, Moment, OpaqueCall, OracleKey, Releases, Slot, ValidatorId } from '@setheum.js/types/interfaces/runtime';
import type { ExchangeRate } from '@setheum.js/types/interfaces/support';
import type { ScheduleTaskIndex } from '@open-web3/orml-types/interfaces/authority';
import type { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import type { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { AccountData, BalanceLock, ReserveData } from '@polkadot/types/interfaces/balances';
import type { ProposalIndex, Votes } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Proposal } from '@polkadot/types/interfaces/democracy';
import type { ProxyAnnouncement, ProxyDefinition } from '@polkadot/types/interfaces/proxy';
import type { Scheduled, TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { AccountInfo, ConsumedWeight, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Bounty, BountyIndex, OpenTip, TreasuryProposal } from '@polkadot/types/interfaces/treasury';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { ClassId } from '@polkadot/types/interfaces/uniques';
import type { BaseStorageType, StorageMap } from '@open-web3/api-mobx';

export interface StorageType extends BaseStorageType {
  setheumOracle: {    /**
     * If an oracle operator has feed a value in this block
     **/
    hasDispatched: OrderedSet | null;
    /**
     * True if Self::values(key) is up to date, otherwise the value is stale
     **/
    isUpdated: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | string, bool>;
    /**
     * Raw values for each oracle operators
     **/
    // rawValues: StorageDoubleMap<AccountId | string, OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Option<TimestampedValueOf>>;
    /**
     * Combined value, may not be up to date
     **/
    values: StorageMap<OracleKey | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Option<TimestampedValueOf>>;
  };
  auction: {    /**
     * Index auctions by end time.
     **/
    // auctionEndTime: StorageDoubleMap<BlockNumber | AnyNumber, AuctionId | AnyNumber, Option<ITuple<[]>>>;
    /**
     * Stores on-going and future auctions. Closed auction are removed.
     **/
    auctions: StorageMap<AuctionId | AnyNumber, Option<AuctionInfo>>;
    /**
     * Track the next auction ID.
     **/
    auctionsIndex: AuctionId | null;
  };
  auctionManager: {    /**
     * Mapping from auction id to collateral auction info
     *
     * CollateralAuctions: map AuctionId => Option<CollateralAuctionItem>
     **/
    collateralAuctions: StorageMap<AuctionId | AnyNumber, Option<CollateralAuctionItem>>;
    /**
     * Record of the total collateral amount of all active collateral auctions
     * under specific collateral type CollateralType -> TotalAmount
     *
     * TotalCollateralInAuction: map CurrencyId => Balance
     **/
    totalCollateralInAuction: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Balance>;
    /**
     * Record of total target sales of all active collateral auctions
     *
     * TotalTargetInAuction: Balance
     **/
    totalTargetInAuction: Balance | null;
  };
  babe: {    /**
     * The current authority set.
     **/
    authorities: Vec<AuthorityId> | null;
    /**
     * The current slot of this block.
     *
     * This will be set in `on_initialize`.
     **/
    currentSlot: Slot | null;
  };
  babeExt: {    /**
     * Serves as cache for the authorities.
     *
     * The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
     * but we require the old authorities to verify the seal when validating a PoV. This will always
     * be updated to the latest AuRa authorities in `on_finalize`.
     **/
    authorities: Vec<AuthorityId> | null;
  };
  authority: {    nextTaskIndex: ScheduleTaskIndex | null;
  };
  authorship: {    /**
     * Author of current block.
     **/
    author: Option<AccountId> | null;
    /**
     * Whether uncles were already set in this block.
     **/
    didSetUncles: bool | null;
    /**
     * Uncles
     **/
    uncles: Vec<UncleEntryItem> | null;
  };
  balances: {    /**
     * The balance of an account.
     *
     * NOTE: This is only used in the case that this pallet is used to store balances.
     **/
    account: StorageMap<AccountId | string, AccountData>;
    /**
     * Any liquidity locks on some account balances.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageMap<AccountId | string, Vec<BalanceLock>>;
    /**
     * Named reserves on some account balances.
     **/
    reserves: StorageMap<AccountId | string, Vec<ReserveData>>;
    /**
     * Storage version of the pallet.
     *
     * This is set to v2.0.0 for new networks.
     **/
    storageVersion: Releases | null;
    /**
     * The total units issued in the system.
     **/
    totalIssuance: Balance | null;
  };
  bounties: {    /**
     * Bounties that have been made.
     **/
    bounties: StorageMap<BountyIndex | AnyNumber, Option<Bounty>>;
    /**
     * Bounty indices that have been approved but not yet funded.
     **/
    bountyApprovals: Vec<BountyIndex> | null;
    /**
     * Number of bounty proposals that have been made.
     **/
    bountyCount: BountyIndex | null;
    /**
     * The description of each bounty.
     **/
    bountyDescriptions: StorageMap<BountyIndex | AnyNumber, Option<Bytes>>;
  };
  cdpEngine: {    /**
     * Mapping from collateral type to its risk management params
     *
     * CollateralParams: CurrencyId => RiskManagementParams
     **/
    collateralParams: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, RiskManagementParams>;
    /**
     * Mapping from collateral type to its exchange rate of debit units and
     * debit value
     *
     * DebitExchangeRate: CurrencyId => Option<ExchangeRate>
     **/
    debitExchangeRate: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Option<ExchangeRate>>;
  };
  cdpTreasury: {    /**
     * Current total debit value of system. It's not same as debit in CDP
     * engine, it is the bad debt of the system.
     *
     * DebitPool: Balance
     **/
    debitPool: Balance | null;
    /**
     * The expected amount size for per lot collateral auction of specific
     * collateral type.
     *
     * ExpectedCollateralAuctionSize: map CurrencyId => Balance
     **/
    expectedCollateralAuctionSize: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Balance>;
  };
  dex: {    /**
     * Initial exchange rate, used to calculate the dex share amount for founders of provisioning
     *
     * InitialShareExchangeRates: map TradingPair => (ExchangeRate, ExchangeRate)
     **/
    initialShareExchangeRates: StorageMap<TradingPair, ITuple<[ExchangeRate, ExchangeRate]>>;
    /**
     * Liquidity pool for TradingPair.
     *
     * LiquidityPool: map TradingPair => (Balance, Balance)
     **/
    liquidityPool: StorageMap<TradingPair, ITuple<[Balance, Balance]>>;
    /**
     * Provision of TradingPair by AccountId.
     *
     * ProvisioningPool: double_map TradingPair, AccountId => (Balance,
     * Balance)
     **/
    // provisioningPool: StorageDoubleMap<TradingPair, AccountId | string, ITuple<[Balance, Balance]>>;
    /**
     * Status for TradingPair.
     *
     * TradingPairStatuses: map TradingPair => TradingPairStatus
     **/
    tradingPairStatuses: StorageMap<TradingPair, TradingPairStatus>;
  };
  emergencyShutdown: {    /**
     * Open final redemption flag
     *
     * CanRefund: bool
     **/
    canRefund: bool | null;
    /**
     * Emergency shutdown flag
     *
     * IsShutdown: bool
     **/
    isShutdown: bool | null;
  };
  evm: {    /**
     * The EVM accounts info.
     *
     * Accounts: map EvmAddress => Option<AccountInfo<T>>
     **/
    accounts: StorageMap<EvmAddress | string, Option<AccountInfo>>;
    /**
     * The storages for EVM contracts.
     *
     * AccountStorages: double_map EvmAddress, H256 => H256
     **/
    // accountStorages: StorageDoubleMap<EvmAddress | string, H256 | string, H256>;
    /**
     * The code info for EVM contracts.
     * Key is Keccak256 hash of code.
     *
     * CodeInfos: H256 => Option<CodeInfo>
     **/
    codeInfos: StorageMap<H256 | string, Option<CodeInfo>>;
    /**
     * The code for EVM contracts.
     * Key is Keccak256 hash of code.
     *
     * Codes: H256 => Vec<u8>
     **/
    codes: StorageMap<H256 | string, Bytes>;
    /**
     * The storage usage for contracts. Including code size, extra bytes and total AccountStorages
     * size.
     *
     * Accounts: map EvmAddress => u32
     **/
    contractStorageSizes: StorageMap<EvmAddress | string, u32>;
    /**
     * Extrinsics origin for the current transaction.
     *
     * ExtrinsicOrigin: Option<AccountId>
     **/
    extrinsicOrigin: Option<AccountId> | null;
    /**
     * Next available system contract address.
     *
     * NetworkContractIndex: u64
     **/
    networkContractIndex: u64 | null;
  };
  evmAccounts: {    /**
     * The Substrate Account for EvmAddresses
     *
     * Accounts: map EvmAddress => Option<AccountId>
     **/
    accounts: StorageMap<EvmAddress | string, Option<AccountId>>;
    /**
     * The EvmAddress for Substrate Accounts
     *
     * EvmAddresses: map AccountId => Option<EvmAddress>
     **/
    evmAddresses: StorageMap<AccountId | string, Option<EvmAddress>>;
  };
  evmManager: {    /**
     * Mapping between u32 and Erc20 address.
     * Erc20 address is 20 byte, take the first 4 non-zero bytes, if it is less
     * than 4, add 0 to the left.
     *
     * map u32 => Option<Erc20Info>
     **/
    currencyIdMap: StorageMap<u32 | AnyNumber, Option<Erc20Info>>;
  };
  financialCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  financialCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  shuraCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  shuraCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  publicFundCouncil: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  publicFundCouncilMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  setmint: {    /**
     * The authorization relationship map from
     * Authorizer -> (CollateralType, Authorizee) -> Authorized
     *
     * Authorization: double_map AccountId, (CurrencyId, T::AccountId) => Option<Balance>
     **/
    // authorization: StorageDoubleMap<AccountId | string, ITuple<[CurrencyId, AccountId]> | [CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, AccountId | string], Option<Balance>>;
  };
  loans: {    /**
     * The collateralized debit positions, map from
     * Owner -> CollateralType -> Position
     *
     * Positions: double_map CurrencyId, AccountId => Position
     **/
    // positions: StorageDoubleMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, AccountId | string, Position>;
    /**
     * The total collateralized debit positions, map from
     * CollateralType -> Position
     *
     * TotalPositions: CurrencyId => Position
     **/
    totalPositions: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Position>;
  };
  multisig: {    calls: StorageMap<U8aFixed | string, Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>;
    /**
     * The set of open multisig operations.
     **/
    // multisigs: StorageDoubleMap<AccountId | string, U8aFixed | string, Option<Multisig>>;
  };
  operatorMembershipSetheum: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  ormlNft: {    /**
     * Store class info.
     *
     * Returns `None` if class info not set or removed.
     **/
    classes: StorageMap<ClassId | AnyNumber, Option<ClassInfoOf>>;
    /**
     * Next available class ID.
     **/
    nextClassId: ClassId | null;
    /**
     * Next available token ID.
     **/
    nextTokenId: StorageMap<ClassId | AnyNumber, TokenId>;
    /**
     * Store token info.
     *
     * Returns `None` if token info not set or removed.
     **/
    // tokens: StorageDoubleMap<ClassId | AnyNumber, TokenId | AnyNumber, Option<TokenInfoOf>>;
    /**
     * Token existence check by owner and class ID.
     **/
    tokensByOwner: ITuple<[]> | null;
  };
  prices: {    /**
     * Mapping from currency id to it's locked price
     *
     * map CurrencyId => Option<Price>
     **/
    lockedPrice: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Option<Price>>;
  };
  proxy: {    /**
     * The announcements made by the proxy (key).
     **/
    announcements: StorageMap<AccountId | string, ITuple<[Vec<ProxyAnnouncement>, BalanceOf]>>;
    /**
     * The set of account proxies. Maps the account which has delegated to the accounts
     * which are being delegated to, together with the amount held on deposit.
     **/
    proxies: StorageMap<AccountId | string, ITuple<[Vec<ProxyDefinition>, BalanceOf]>>;
  };
  scheduler: {    /**
     * Items to be executed, indexed by the block number that they should be executed on.
     **/
    agenda: StorageMap<BlockNumber | AnyNumber, Vec<Option<Scheduled>>>;
    /**
     * Lookup from identity to the block number and index of the task.
     **/
    lookup: StorageMap<Bytes | string, Option<TaskAddress>>;
    /**
     * Storage version of the pallet.
     *
     * New networks start with last version.
     **/
    storageVersion: Releases | null;
  };
  session: {    /**
     * Current index of the session.
     **/
    currentIndex: SessionIndex | null;
    /**
     * Indices of disabled validators.
     *
     * The set is cleared when `on_session_ending` returns a new set of identities.
     **/
    disabledValidators: Vec<u32> | null;
    /**
     * The owner of a key. The key is the `KeyTypeId` + the encoded key.
     **/
    keyOwner: StorageMap<ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber, Bytes | string], Option<ValidatorId>>;
    /**
     * The next session keys for a validator.
     **/
    nextKeys: StorageMap<ValidatorId | string, Option<Keys>>;
    /**
     * True if the underlying economic identities or weighting behind the validators
     * has changed in the queued validator set.
     **/
    queuedChanged: bool | null;
    /**
     * The queued keys for the next session. When the next session begins, these keys
     * will be used to determine the validator's session keys.
     **/
    queuedKeys: Vec<ITuple<[ValidatorId, Keys]>> | null;
    /**
     * The current set of validators.
     **/
    validators: Vec<ValidatorId> | null;
  };
  sudo: {    /**
     * The `AccountId` of the sudo key.
     **/
    key: AccountId | null;
  };
  system: {    /**
     * The full account information for a particular account ID.
     **/
    account: StorageMap<AccountId | string, AccountInfo>;
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     **/
    allExtrinsicsLen: Option<u32> | null;
    /**
     * Map of block numbers to block hashes.
     **/
    blockHash: StorageMap<BlockNumber | AnyNumber, Hash>;
    /**
     * The current weight for the block.
     **/
    blockWeight: ConsumedWeight | null;
    /**
     * Digest of the current block, also part of the block header.
     **/
    digest: DigestOf | null;
    /**
     * The number of events in the `Events<T>` list.
     **/
    eventCount: EventIndex | null;
    /**
     * Events deposited for the current block.
     **/
    events: Vec<EventRecord> | null;
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
    eventTopics: StorageMap<Hash | string, Vec<ITuple<[BlockNumber, EventIndex]>>>;
    /**
     * The execution phase of the block.
     **/
    executionPhase: Option<Phase> | null;
    /**
     * Total extrinsics count for the current block.
     **/
    extrinsicCount: Option<u32> | null;
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     **/
    extrinsicData: StorageMap<u32 | AnyNumber, Bytes>;
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     **/
    lastRuntimeUpgrade: Option<LastRuntimeUpgradeInfo> | null;
    /**
     * The current block number being processed. Set by `execute_block`.
     **/
    number: BlockNumber | null;
    /**
     * Hash of the previous block.
     **/
    parentHash: Hash | null;
    /**
     * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     * (default) if not.
     **/
    upgradedToTripleRefCount: bool | null;
    /**
     * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     **/
    upgradedToU32RefCount: bool | null;
  };
  technicalCommittee: {    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: Vec<AccountId> | null;
    /**
     * The prime member that helps determine the default vote behavior in case of absentations.
     **/
    prime: Option<AccountId> | null;
    /**
     * Proposals so far.
     **/
    proposalCount: u32 | null;
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: StorageMap<Hash | string, Option<Proposal>>;
    /**
     * The hashes of the active proposals.
     **/
    proposals: Vec<Hash> | null;
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: StorageMap<Hash | string, Option<Votes>>;
  };
  technicalCommitteeMembership: {    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: Vec<AccountId> | null;
    /**
     * The current prime member, if one exists.
     **/
    prime: Option<AccountId> | null;
  };
  timestamp: {    /**
     * Did the timestamp get updated in this block?
     **/
    didUpdate: bool | null;
    /**
     * Current time for the current block.
     **/
    now: Moment | null;
  };
  tips: {    /**
     * Simple preimage lookup from the reason's hash to the original data. Again, has an
     * insecure enumerable hash since the key is guaranteed to be the result of a secure hash.
     **/
    reasons: StorageMap<Hash | string, Option<Bytes>>;
    /**
     * TipsMap that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
     * This has the insecure enumerable hash function since the key itself is already
     * guaranteed to be a secure hash.
     **/
    tips: StorageMap<Hash | string, Option<OpenTip>>;
  };
  tokens: {    /**
     * The balance of a token type under an account.
     *
     * NOTE: If the total is ever zero, decrease account ref account.
     *
     * NOTE: This is only used in the case that this module is used to store
     * balances.
     **/
    // accounts: StorageDoubleMap<AccountId | string, CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, AccountData>;
    /**
     * Any liquidity locks of a token type under an account.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    // locks: StorageDoubleMap<AccountId | string, CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Vec<BalanceLock>>;
    /**
     * The total issuance of a token type.
     **/
    totalIssuance: StorageMap<CurrencyId | { Token: any } | { DEXShare: any } | { ERC20: any } | string, Balance>;
  };
  transactionPause: {    /**
     * The paused transaction map
     *
     * map (PalletNameBytes, FunctionNameBytes) => Option<()>
     **/
    pausedTransactions: StorageMap<ITuple<[Bytes, Bytes]> | [Bytes | string, Bytes | string], Option<ITuple<[]>>>;
  };
  transactionPayment: {    /**
     * The alternative fee swap path of accounts.
     **/
    alternativeFeeSwapPath: StorageMap<AccountId | string, Option<Vec<CurrencyId>>>;
    /**
     * The next fee multiplier.
     *
     * NextFeeMultiplier: Multiplier
     **/
    nextFeeMultiplier: Multiplier | null;
  };
  treasury: {    /**
     * Proposal indices that have been approved but not yet awarded.
     **/
    approvals: Vec<ProposalIndex> | null;
    /**
     * Number of proposals that have been made.
     **/
    proposalCount: ProposalIndex | null;
    /**
     * Proposals that have been made.
     **/
    proposals: StorageMap<ProposalIndex | AnyNumber, Option<TreasuryProposal>>;
  };
}
