//! # Launchpad Crowdsales Pallet
//!
//! ## Overview
//!
//! This module creates a crowdsales launchpad
//! for teams to raise funds and sell their tokens to the public -
//! governance is done from an update origin. 

#![cfg_attr(not(feature = "std"), no_std)]
#![allow(clippy::unused_unit)]

use frame_support::{
	pallet_prelude::*, transactional, PalletId, traits::Get, codec::{Decode, Encode}, ensure, storage::child,
};
use frame_system::{pallet_prelude::*, ensure_signed};
use orml_traits::{GetByKey, MultiCurrency, MultiCurrencyExtended, MultiReservableCurrency};
use sp_std::vec::Vec;
use sp_runtime::{traits::{AccountIdConversion, Saturating, Zero, Hash}};

mod mock;
pub mod traits;

pub use traits::{
	Campaign, CampaignId, CampaignInfo, OnNewCampaignResult, OnNewContributionResult, OnNewProposalResult, Proposal,
};
pub use module::*;

/// Simple index for identifying a fund.
pub type FundIndex = u32;
pub type ProposalIndex = u32;
pub type CampaignIndex = u32;

type AccountIdOf<T> = <T as frame_system::Config>::AccountId;
type BalanceOf<T> = <<T as Config>::MultiCurrency as MultiCurrency<<T as frame_system::Config>::AccountId>>::Balance;
type CurrencyIdOf<T> =
	<<T as Config>::MultiCurrency as MultiCurrency<<T as frame_system::Config>::AccountId>>::CurrencyId;
type CampaignInfoOf<T> =
	CampaignInfo<AccountIdOf<T>, BalanceOf<T>, <T as frame_system::Config>::BlockNumber>;
type CampaignInfoOf<T> =
	CampaignInfo<AccountIdOf<T>, BalanceOf<T>, <T as frame_system::Config>::BlockNumber>;

#[frame_support::pallet]
pub mod module {
	use super::*;

	#[pallet::config]
	pub trait Config: frame_system::Config {
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;

		/// The Currency for managing assets related to the SERP (Setheum Elastic Reserve Protocol).
		type MultiCurrency: MultiCurrencyExtended<Self::AccountId, CurrencyId = CurrencyId, Balance = Balance>;

		#[pallet::constant]
		/// Native currency_id.
		/// 
		type GetNativeCurrencyId: Get<CurrencyId>;

		/// Campaign to manage the Crowdsales process
		type Crowdsales: Crowdsales<Self::AccountId, Self::BlockNumber, CampaignId = CampaignId, Balance = Balance>;

		/// The Campaign Commission rate taken from successful campaigns
		/// The Treasury Commission is transferred to the Network's Treasury account.
		/// The first item of the tuple is the numerator of the commission rate, second
		/// item is the denominator, fee_rate = numerator / denominator,
		/// use (u32, u32) over another type to minimize internal division operation.
		#[pallet::constant]
		type GetCommission: Get<(u32, u32)>;

		/// The amount to be held on deposit by the owner of a crowdfund
		/// - in HighEnd LaunchPad (HELP) currency id. (LaunchPad Token)  
		type SubmissionDeposit: Get<BalanceOf<Self>>;

		/// The minimum amount that must be raised in a crowdsales campaign.
        /// Campaign Goal must be at least this amount.
		/// If this amount is not met, the proposal can be updated by the proposer or will be rejected.
		type MinRaise: Get<BalanceOf<Self>>;

		/// The minimum amount that may be contributed into a crowdfund. Should almost certainly be at
		/// least ExistentialDeposit.
		type MinContribution: Get<BalanceOf<Self>>;

		/// The maximum number of proposals that could be running at any given time.
		/// If set to 0, proposals are disabled and the Module will panic if a proposal is made.
		type MaxProposalsCount: Get<u32>;

		/// The maximum number of campaigns that could be running at any given time.
		/// If set to 0, campaigns are disabled and the Module will panic if a campaign is made.
		type MaxCampaignsCount: Get<u32>;

		/// The maximum period of time (in blocks) that a crowdfund campaign clould be active.
		/// If set to 0, active period is disabled and the Module will panic if a campaign is activated.
		type MaxActivePeriod: Get<Self::BlockNumber>;

		/// The period of time (number of blocks) a campaign has to wait after being Approved by governance.
		type WaitingPeriod: Get<Self::BlockNumber>;

		/// The period of time (in blocks) after an unsuccessful crowdfund ending during which
		/// contributors are able to withdraw their funds. After this period, their funds are lost.
		type RetirementPeriod: Get<Self::BlockNumber>;

		/// The origin which may update, approve or reject campaign proposals.
		type UpdateOrigin: EnsureOrigin<Self::Origin>;

		#[pallet::constant]
		/// The Airdrop module pallet id, keeps airdrop funds.
		type PalletId: Get<PalletId>;                                                                                                                              

	}

	#[pallet::error]
	pub enum Error<T> {
		/// Crowdfund period is too long.
		PeriodTooLong,
		/// Crowdfund period is too short.
		ZeroPeriod,
		/// Must contribute at least the minimum amount of funds.
		ContributionTooSmall,
		/// The fund index specified does not exist.
		InvalidIndex,
		/// The crowdfund's contribution period has ended; no more contributions will be accepted.
		CampaignEnded,
		/// You may not withdraw or dispense funds while the fund is still active.
		FundStillActive,
		/// You cannot withdraw funds because you have not contributed any.
		NoContribution,
		/// Cannot dispense funds from an unsuccessful fund.
		CampaignNotSuccessful,
		/// Wrong Currency Type in use.
		InvalidCurrencyType,
		/// Maximum number of simultaneous campaigns has been reached;
        /// no more contributions will be accepted until a slot is free.
		MaxCampaignReached,

	#[pallet::event]
	#[pallet::generate_deposit(pub(crate) fn deposit_event)]
	#[pallet::metadata(T::AccountId = "AccountId", BalanceOf<T> = "Balance", CurrencyId = "CurrencyId")]
	pub enum Event<T: Config> {
		/// Created Proposal \[campaign_id, campaign_info\]
		CreatedProposal(CampaignIdOf<T>, CampaignInfo<Of>),
		/// Rejected Proposal \[campaign_id\]
		RejectedProposal(CampaignIdOf<T>),
		/// Approved Proposal \[campaign_id, campaign_info, now\]
		ApprovedProposal(CampaignIdOf<T>, CampaignInfo<Of>, <T as frame_system::Config>::BlockNumber),
		/// Campaign Started \[campaign_id, campaign_info, now\]
		StartedCampaign(CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Ended Campaign Successfully \[campaign_id, campaign_info, now\]
		EndedCampaignSuccessful(CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Ended Campaign Unsuccessfully \[campaign_id, campaign_info, now\]
		EndedCampaignUnsuccessful(CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Contributed to Campaign \[campaign_id, campaign_info, now\]
		ContributedToCampaign(CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Claimed Funds Raised \[claimant_account_id, campaign_id, campaign_info, now\]
		ClaimedFundraise(AccountIdOf<T>, CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Claimed Contribution Allocation \[claimant_account_id, campaign_id, campaign_info, now\]
		ClaimedAllocation(AccountIdOf<T>, CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Dissolved Unclaimed Funds \[amount, campaign_id, campaign_info, now\]
		DissolvedFunds(BalanceOf<T>, CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
		/// Dispensed Commissions \[amount, campaign_id, campaign_info, now\]
		DispensedCommissions(BalanceOf<T>, CampaignIdOf<T>, CampaignInfo, <T as frame_system::Config>::BlockNumber),
	}
	
	/// Info on all of the proposed campaigns.
	///
	/// map CampaignIdOf<T> => CampaignInfoOf<T>
	#[pallet::storage]
	#[pallet::getter(fn proposals)]
	pub type Proposals<T: Config> = StorageMap<_, Blake2_128Concat, CampaignIdOf<T>, CampaignInfoOf<T>, OptionQuery>;
	
	/// Info on all of the approved campaigns.
	///
	/// map CampaignIdOf<T> => CampaignInfoOf<T>
	#[pallet::storage]
	#[pallet::getter(fn campaigns)]
	pub type Campaigns<T: Config> = StorageMap<_, Blake2_128Concat, CampaignIdOf<T>, CampaignInfoOf<T>, OptionQuery>;
	
	/// Record of all the contributions made to a campaign by contributors
	/// under campaign_id. campaign_id => contributor_account_id, (contribution_amount, allocation_amount)
	///
	/// map CampaignIdOf<T> => AccountIdOf<T>, (BalanceOf<T>, BalanceOf<T>)
	#[pallet::storage]
	#[pallet::getter(fn campaigns)]
	pub type Contributions<T: Config> = 
		StorageDoubleMap<_, Twox64Concat, CampaignIdOf<T>, Twox64Concat, AccountIdOf<T>, (BalanceOf<T>, BalanceOf<T>), OptionQuery>;
	
	/// Record of the total amount of funds raised by a specific campaign.
	///
	/// TotalAmountRaisedInCampaign: map CampaignId => Balance
	#[pallet::storage]
	#[pallet::getter(fn total_amount_raised_in_campaign)]
	pub type TotalAmountRaisedInCampaign<T: Config> = StorageMap<_, Twox64Concat, CampaignIdOf<T>, BalanceOf<T>, ValueQuery>;

	/// Record of the total amount of funds raised under a specific currency.
	///
	/// TotalAmountRaisedInProtocol: map CurrencyIdOf<T> => Balance
	#[pallet::storage]
	#[pallet::getter(fn total_collateral_in_auction)]
	pub type TotalAmountRaisedInProtocol<T: Config> = StorageMap<_, Twox64Concat, CurrencyIdOf<T>, BalanceOf<T>, ValueQuery>;

	/// Record of the total number of successful campaigns done in the protocol.
	///
	/// TotalSuccessfulCampaigns: map u32;
	#[pallet::storage]
	#[pallet::getter(fn total_successful_campaigns)]
	pub type TotalSuccessfulCampaigns<T: Config> = StorageMap<_, u32, ValueQuery>;

	#[pallet::pallet]
	pub struct Pallet<T>(PhantomData<T>);

	#[pallet::hooks]
	impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {}

	#[pallet::call]
	impl<T: Config> Pallet<T> {}
}

impl<T: Config> Pallet<T> {

}

impl<T: Config> Campaign<T::AccountId, T::BlockNumber> for Pallet<T> {
	/// The id of a CampaignInfo
	type CampaignId: u32;
	/// The currency type used for the campaign.
    type CurrencyId: u32;
    /// The balance type of a currency.
	type Balance: u64;

	/// The Campaign info of `id`
	fn campaign_info(id: Self::CampaignId) -> Option<CampaignInfo<AccountId, Self::Balance, BlockNumber>>;
	/// Create new Campaign with specific `CampaignInfo`, return the `id` of the `Campaign`
	fn new_campaign(now: BlockNumber, info: CampaignInfo<AccountId, Self::Balance, BlockNumber>) -> result::Result<Self::CampaignId, DispatchError>;
	/// Update the Campaign info of `id` with `info`
	fn update_campaign(id: Self::CampaignId, info: CampaignInfo<AccountId, Self::Balance, BlockNumber>) -> DispatchResult;
	/// Remove Campaign by `id`
	fn remove_campaign(id: Self::CampaignId);
    /// Get the total amount of funds raised for the campaign.
	fn get_total_raised_in_campaign(id: Self::CampaignId) -> Self::Balance;
    /// Get the total amount of tokens sold for the campaign.
	fn get_total_sold_in_campaign(id: Self::CampaignId) -> Self::Balance;
	/// Called when a new campaign is received.
	/// The return value determines if the campaign schedule should be dispatched and 
    /// update the starting period of the campaign.
	fn on_campaign(
		now: BlockNumber,
		id: CampaignId,
		info: CampaignInfo<AccountId, Self::Balance, BlockNumber>,
	) -> OnNewCampaignResult<BlockNumber>;
	/// Called when a contribution is received.
	/// The return value determines if the contribution should be accepted and 
    /// update the amount of tokens allocated to the contributor.
	/// Implementation should reserve the funds from the contributor.
	fn on_contribution(
		now: BlockNumber,
		id: CampaignId,
		contribution: (AccountId, Balance),
	) -> OnNewContributionResult<BlockNumber>;
	/// End a Campaign when hard cap (goal) is reached.
	fn on_campaign_ended(id: CampaignId, winner: Option<(AccountId, Balance)>);
}

impl<T: Config> Proposal<T::AccountId, T::BlockNumber> for Pallet<T> {
	/// The id of a CampaignInfo
	type CampaignId: u32;
	/// The currency type used for the campaign.
    type CurrencyId: u32;
    /// The balance type of a currency.
	type Balance: u64;

	/// The Campaign Proposal info of `id`
	fn proposal_info(id: Self::CampaignId) -> Option<CampaignInfo<AccountId, Self::Balance, BlockNumber>>;
	/// Create new Campaign Proposal with specific `CampaignInfo`, return the `id` of the Campaign
	fn new_proposal(now: BlockNumber, info: CampaignInfo<AccountId, Self::Balance, BlockNumber>) -> result::Result<Self::CampaignId, DispatchError>;
    /// Approve Proposal by `id` at `now`.
    fn approve_proposal(
        now: BlockNumber,
        id: CampaignId,
    );
	/// Reject Proposal by `id`
	fn reject_proposal(id: Self::CampaignId);
    /// Remove Proposal by `id`
    fn remove_proposal(id: Self::CampaignId);
	/// Called when a new proposal is received.
	/// The return value determines if the proposal is valid and 
    /// update the amount of tokens allocated to the contributor.
	/// Implementation should reserve the funds from the contributor.
	fn on_proposal(
		now: BlockNumber,
		id: CampaignId,
		info: CampaignInfo<AccountId, Self::Balance, BlockNumber>,
	) -> OnNewProposalResult<BlockNumber>;
	/// End a Campaign when hard cap (goal) is reached.
	fn on_campaign_ended(id: CampaignId, winner: Option<(AccountId, Balance)>);
}
