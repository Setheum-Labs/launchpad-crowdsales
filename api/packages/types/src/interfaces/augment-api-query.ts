// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { AccountId32, Call, H160, H256 } from '@setheum.js/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { SetheumPrimitivesCurrencyCurrencyId, SetheumPrimitivesTradingPair, FrameSupportWeightsPerDispatchClassU64, FrameSystemAccountInfo, FrameSystemEventRecord, FrameSystemLastRuntimeUpgradeInfo, FrameSystemPhase, SetheumRuntimeScheduledTasks, ModuleAssetRegistryModuleAssetIds, ModuleAssetRegistryModuleAssetMetadata, ModuleAuctionManagerCollateralAuctionItem, ModuleCdpEngineRiskManagementParams, ModuleDexTradingPairStatus, ModuleEvmModuleAccountInfo, ModuleEvmModuleCodeInfo, ModuleLoansPosition, OrmlNftClassInfo, OrmlNftTokenInfo, OrmlOracleModuleTimestampedValue, OrmlTokensAccountData, OrmlTokensBalanceLock, OrmlTraitsAuctionAuctionInfo, OrmlVestingVestingSchedule, PalletAuthorshipUncleEntryItem, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesReleases, PalletBalancesReserveData, PalletBountiesBounty, PalletCollectiveVotes, PalletMultisigMultisig, PalletProxyAnnouncement, PalletProxyProxyDefinition, PalletSchedulerReleases, PalletSchedulerScheduledV2, PalletTipsOpenTip, PalletTreasuryProposal, SpConsensusBabeSr25519AppSr25519Public, SpRuntimeDigest } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';

declare module '@polkadot/api-base/types/storage' {
  export interface AugmentedQueries<ApiType extends ApiTypes> {
    setheumOracle: {
      /**
       * If an oracle operator has feed a value in this block`
       **/
      hasDispatched: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if Self::values(key) is up to date, otherwise the value is stale
       **/
      isUpdated: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<bool>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<Option<OrmlOracleModuleTimestampedValue>>, [AccountId32, SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<Option<OrmlOracleModuleTimestampedValue>>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    assetRegistry: {
      /**
       * The storages for AssetMetadatas.
       * 
       * AssetMetadatas: map AssetIds => Option<AssetMetadata>
       **/
      assetMetadatas: AugmentedQuery<ApiType, (arg: ModuleAssetRegistryModuleAssetIds | { Erc20: any } | string | Uint8Array) => Observable<Option<ModuleAssetRegistryModuleAssetMetadata>>, [ModuleAssetRegistryModuleAssetIds]> & QueryableStorageEntry<ApiType, [ModuleAssetRegistryModuleAssetIds]>;
      /**
       * The storages for EvmAddress.
       * 
       * Erc20IdToAddress: map Erc20Id => Option<EvmAddress>
       **/
      erc20IdToAddress: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<H160>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auction: {
      /**
       * Index auctions by end time.
       **/
      auctionEndTime: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<Option<Null>>, [u32, u32]> & QueryableStorageEntry<ApiType, [u32, u32]>;
      /**
       * Stores on-going and future auctions. Closed auction are removed.
       **/
      auctions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<OrmlTraitsAuctionAuctionInfo>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Track the next auction ID.
       **/
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
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
      collateralAuctions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<ModuleAuctionManagerCollateralAuctionItem>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Record of the total collateral amount of all active collateral auctions
       * under specific collateral type CollateralType -> TotalAmount
       * 
       * TotalCollateralInAuction: map CurrencyId => Balance
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<u128>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Record of total target sales of all active collateral auctions
       * 
       * TotalTargetInAuction: Balance
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    babe: {
      /**
       * The current authority set.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<SpConsensusBabeSr25519AppSr25519Public>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current slot of this block.
       * 
       * This will be set in `on_initialize`.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    babeExt: {
      /**
       * Serves as cache for the authorities.
       * 
       * The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
       * but we require the old authorities to verify the seal when validating a PoV. This will always
       * be updated to the latest AuRa authorities in `on_finalize`.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<SpConsensusBabeSr25519AppSr25519Public>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authority: {
      nextTaskIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      savedCalls: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<ITuple<[Call, Option<AccountId32>]>>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authorship: {
      /**
       * Author of current block.
       **/
      author: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Whether uncles were already set in this block.
       **/
      didSetUncles: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Uncles
       **/
      uncles: AugmentedQuery<ApiType, () => Observable<Vec<PalletAuthorshipUncleEntryItem>>, []> & QueryableStorageEntry<ApiType, []>;
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
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletBalancesAccountData>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesBalanceLock>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Named reserves on some account balances.
       **/
      reserves: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesReserveData>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Storage version of the pallet.
       * 
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletBalancesReleases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    bounties: {
      /**
       * Bounties that have been made.
       **/
      bounties: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletBountiesBounty>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Bounty indices that have been approved but not yet funded.
       **/
      bountyApprovals: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of bounty proposals that have been made.
       **/
      bountyCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The description of each bounty.
       **/
      bountyDescriptions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
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
      collateralParams: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<ModuleCdpEngineRiskManagementParams>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and
       * debit value
       * 
       * DebitExchangeRate: CurrencyId => Option<ExchangeRate>
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<Option<u128>>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      /**
       * Current total debit value of system. It's not same as debit in CDP
       * engine, it is the bad debt of the system.
       * 
       * DebitPool: Balance
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The expected amount size for per lot collateral auction of specific
       * collateral type.
       * 
       * ExpectedCollateralAuctionSize: map CurrencyId => Balance
       **/
      expectedCollateralAuctionSize: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<u128>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
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
      initialShareExchangeRates: AugmentedQuery<ApiType, (arg: SetheumPrimitivesTradingPair) => Observable<ITuple<[u128, u128]>>, [SetheumPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesTradingPair]>;
      /**
       * Liquidity pool for TradingPair.
       * 
       * LiquidityPool: map TradingPair => (Balance, Balance)
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: SetheumPrimitivesTradingPair) => Observable<ITuple<[u128, u128]>>, [SetheumPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesTradingPair]>;
      /**
       * Provision of TradingPair by AccountId.
       * 
       * ProvisioningPool: double_map TradingPair, AccountId => (Balance,
       * Balance)
       **/
      provisioningPool: AugmentedQuery<ApiType, (arg1: SetheumPrimitivesTradingPair, arg2: AccountId32 | string | Uint8Array) => Observable<ITuple<[u128, u128]>>, [SetheumPrimitivesTradingPair, AccountId32]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesTradingPair, AccountId32]>;
      /**
       * Status for TradingPair.
       * 
       * TradingPairStatuses: map TradingPair => TradingPairStatus
       **/
      tradingPairStatuses: AugmentedQuery<ApiType, (arg: SetheumPrimitivesTradingPair) => Observable<ModuleDexTradingPairStatus>, [SetheumPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesTradingPair]>;
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
      accounts: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Option<ModuleEvmModuleAccountInfo>>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      /**
       * The storages for EVM contracts.
       * 
       * AccountStorages: double_map EvmAddress, H256 => H256
       **/
      accountStorages: AugmentedQuery<ApiType, (arg1: H160 | string | Uint8Array, arg2: H256 | string | Uint8Array) => Observable<H256>, [H160, H256]> & QueryableStorageEntry<ApiType, [H160, H256]>;
      /**
       * The code info for EVM contracts.
       * Key is Keccak256 hash of code.
       * 
       * CodeInfos: H256 => Option<CodeInfo>
       **/
      codeInfos: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<ModuleEvmModuleCodeInfo>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
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
      contractStorageSizes: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<u32>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      /**
       * Extrinsics origin for the current transaction.
       * 
       * ExtrinsicOrigin: Option<AccountId>
       **/
      extrinsicOrigin: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
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
      accounts: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Option<AccountId32>>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      /**
       * The EvmAddress for Substrate Accounts
       * 
       * EvmAddresses: map AccountId => Option<EvmAddress>
       **/
      evmAddresses: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<H160>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    shuraCouncil: {
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    shuraCouncilMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    idleScheduler: {
      nextTaskId: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Some documentation
       **/
      tasks: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<SetheumRuntimeScheduledTasks>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
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
      positions: AugmentedQuery<ApiType, (arg1: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<ModuleLoansPosition>, [SetheumPrimitivesCurrencyCurrencyId, AccountId32]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId, AccountId32]>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       * 
       * TotalPositions: CurrencyId => Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<ModuleLoansPosition>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    multisig: {
      calls: AugmentedQuery<ApiType, (arg: U8aFixed | string | Uint8Array) => Observable<Option<ITuple<[Bytes, AccountId32, u128]>>>, [U8aFixed]> & QueryableStorageEntry<ApiType, [U8aFixed]>;
      /**
       * The set of open multisig operations.
       **/
      multisigs: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: U8aFixed | string | Uint8Array) => Observable<Option<PalletMultisigMultisig>>, [AccountId32, U8aFixed]> & QueryableStorageEntry<ApiType, [AccountId32, U8aFixed]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    operatorMembershipSetheum: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
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
      classes: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<OrmlNftClassInfo>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Next available class ID.
       **/
      nextClassId: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next available token ID.
       **/
      nextTokenId: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<u64>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Store token info.
       * 
       * Returns `None` if token info not set or removed.
       **/
      tokens: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u64 | AnyNumber | Uint8Array) => Observable<Option<OrmlNftTokenInfo>>, [u32, u64]> & QueryableStorageEntry<ApiType, [u32, u64]>;
      /**
       * Token existence check by owner and class ID.
       **/
      tokensByOwner: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array, arg3: u64 | AnyNumber | Uint8Array) => Observable<Null>, [AccountId32, u32, u64]> & QueryableStorageEntry<ApiType, [AccountId32, u32, u64]>;
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
      lockedPrice: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<Option<u128>>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    proxy: {
      /**
       * The announcements made by the proxy (key).
       **/
      announcements: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<ITuple<[Vec<PalletProxyAnnouncement>, u128]>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * The set of account proxies. Maps the account which has delegated to the accounts
       * which are being delegated to, together with the amount held on deposit.
       **/
      proxies: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<ITuple<[Vec<PalletProxyProxyDefinition>, u128]>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    scheduler: {
      /**
       * Items to be executed, indexed by the block number that they should be executed on.
       **/
      agenda: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Option<PalletSchedulerScheduledV2>>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Lookup from identity to the block number and index of the task.
       **/
      lookup: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<ITuple<[u32, u32]>>>, [Bytes]> & QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Storage version of the pallet.
       * 
       * New networks start with last version.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletSchedulerReleases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sudo: {
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    system: {
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<FrameSystemAccountInfo>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<H256>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<FrameSupportWeightsPerDispatchClassU64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<SpRuntimeDigest>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Events deposited for the current block.
       * 
       * NOTE: This storage item is explicitly unbounded since it is never intended to be read
       * from within the runtime.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<FrameSystemEventRecord>>, []> & QueryableStorageEntry<ApiType, []>;
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
      eventTopics: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Vec<ITuple<[u32, u32]>>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemPhase>>, []> & QueryableStorageEntry<ApiType, []>;
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
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemLastRuntimeUpgradeInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<H256>, []> & QueryableStorageEntry<ApiType, []>;
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
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The prime member that helps determine the default vote behavior in case of absentations.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    technicalCommitteeMembership: {
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current prime member, if one exists.
       **/
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
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
      now: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
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
      reasons: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Bytes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * TipsMap that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
       * This has the insecure enumerable hash function since the key itself is already
       * guaranteed to be a secure hash.
       **/
      tips: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletTipsOpenTip>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
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
      accounts: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<OrmlTokensAccountData>, [AccountId32, SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<Vec<OrmlTokensBalanceLock>>, [AccountId32, SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<u128>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
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
      pausedTransactions: AugmentedQuery<ApiType, (arg: ITuple<[Bytes, Bytes]> | [Bytes | string | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<Null>>, [ITuple<[Bytes, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[Bytes, Bytes]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      /**
       * The alternative fee swap path of accounts.
       **/
      alternativeFeeSwapPath: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<Vec<SetheumPrimitivesCurrencyCurrencyId>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * The next fee multiplier.
       * 
       * NextFeeMultiplier: Multiplier
       **/
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The size of fee pool in native token. During `initialize_pool` this amount of native token
       * will be transferred from `TreasuryAccount` to sub account of `PalletId`.
       **/
      poolSize: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<u128>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * The balance threshold to trigger swap from dex, normally the value is gt ED of native asset.
       **/
      swapBalanceThreshold: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<u128>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * The exchange rate between the given currency and native token.
       * This value is updated when upon swap from dex.
       **/
      tokenExchangeRate: AugmentedQuery<ApiType, (arg: SetheumPrimitivesCurrencyCurrencyId | { Token: any } | { DexShare: any } | { Erc20: any } | string | Uint8Array) => Observable<Option<u128>>, [SetheumPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [SetheumPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    treasury: {
      /**
       * Proposal indices that have been approved but not yet awarded.
       **/
      approvals: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of proposals that have been made.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals that have been made.
       **/
      proposals: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletTreasuryProposal>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    vesting: {
      /**
       * Vesting schedules of an account.
       * 
       * VestingSchedules: map AccountId => Vec<VestingSchedule>
       **/
      vestingSchedules: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<OrmlVestingVestingSchedule>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module
