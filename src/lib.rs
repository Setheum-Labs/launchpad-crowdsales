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
	pallet_prelude::*, transactional, PalletId, traits::Get,
	codec::{Decode, Encode}, ensure, storage::child, BoundedVec,
};
use frame_system::{pallet_prelude::*, ensure_signed};
use orml_traits::{GetByKey, MultiCurrency, MultiCurrencyExtended, MultiReservableCurrency};
use sp_std::vec::Vec;
use sp_runtime::{traits::{AccountIdConversion, Saturating, Zero, Hash}};

mod mock;
pub mod traits;

pub use traits::{
	Campaign, CampaignId, CampaignInfo, Contribution, Proposal,
};
pub use module::*;

/// Simple index for identifying a fund.
pub type FundIndex = u32;
pub type ProposalIndex = u32;
pub type CampaignId = u32;
pub type CampaignIndex = u32;

type AccountIdOf<T> = <T as frame_system::Config>::AccountId;
type BalanceOf<T> = <<T as Config>::MultiCurrency as MultiCurrency<<T as frame_system::Config>::AccountId>>::Balance;
type CurrencyIdOf<T> =
	<<T as Config>::MultiCurrency as MultiCurrency<<T as frame_system::Config>::AccountId>>::CurrencyId;
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

		/// The period of time (number of blocks) a campaign is delayed after being Approved by governance.
		type CampaignStartDelay: Get<Self::BlockNumber>;

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
		/// Crowdsale period has exceeded the maximum active period.
		MaxActivePeriodExceeded,
		/// Maximum number of simultaneous proposals has been exceeded;
		/// no more proposals can be made until one is approved or rejected.
		MaxProposalsExceeded,
		/// Maximum number of simultaneous campaigns has been reached;
        /// no more campaigns can be approved until one is closed.
		MaxActiveCampaignsReached,
		/// Crowdfund period is too short.
		ZeroPeriod,
		/// Must contribute at least the minimum amount of funds.
		ContributionTooSmall,
		/// Must contribute at least the minimum amount of funds.
		GoalBelowMinimumRaise,
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
		/// Campaign Id unavailable.
		NoAvailableCampaignId,
		/// Proposal is not in the list of proposals.
		ProposalNotFound,
		/// Campaign is not in the list of campaigns.
		CampaignNotFound,
		/// Proposal is already approved.
		ProposalAlreadyApproved,
		/// Contributors balance is not enough to contribute
		ContributionNotEnoughBalance,

	#[pallet::event]
	#[pallet::generate_deposit(pub(crate) fn deposit_event)]
	#[pallet::metadata(T::AccountId = "AccountId", BalanceOf<T> = "Balance", CurrencyId = "CurrencyId")]
	pub enum Event<T: Config> {
		/// Created Proposal \[campaign_id\]
		CreatedProposal(T::CampaignId),
		/// Rejected Proposal \[campaign_id\]
		RejectedProposal(T::CampaignId),
		/// Approved Proposal \[campaign_id\]
		ApprovedProposal(T::CampaignId),
		/// Campaign Started \[campaign_id\]
		StartedCampaign(T::CampaignId),
		/// Ended Campaign Successfully \[campaign_id, campaign_info\]
		EndedCampaignSuccessful(T::CampaignId),
		/// Ended Campaign Unsuccessfully \[campaign_id, campaign_info\]
		EndedCampaignUnsuccessful(T::CampaignId),
		/// Contributed to Campaign \[campaign_id, contribution_amount\]
		ContributedToCampaign(T::CampaignId, BalanceOf<T>),
		/// Claimed Funds Raised \[claimant_account_id, campaign_id, amount_claimed\]
		ClaimedFundraise(AccountIdOf<T>, T::CampaignId, BalanceOf<T>),
		/// Claimed Contribution Allocation \[claimant_account_id, campaign_id, allocation_claimed\]
		ClaimedAllocation(AccountIdOf<T>, T::CampaignId, BalanceOf<T>),
		/// Dissolved Unclaimed Funds \[amount, campaign_id, now\]
		DissolvedFunds(BalanceOf<T>, T::CampaignId, <T as frame_system::Config>::BlockNumber),
		/// Dispensed Commissions \[amount, campaign_id, now\]
		DispensedCommissions(BalanceOf<T>, T::CampaignId, <T as frame_system::Config>::BlockNumber),
	}
	
	/// Info on all of the proposed campaigns.
	///
	/// map T::CampaignId => CampaignInfoOf<T>
	#[pallet::storage]
	#[pallet::getter(fn proposals)]
	pub type Proposals<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::CampaignId,
		BoundedVec<CampaignInfoOf<T>, T::MaxProposals>,
		OptionQuery
	>;
	
	/// Info on all of the approved campaigns.
	///
	/// map T::CampaignId => CampaignInfoOf<T>
	#[pallet::storage]
	#[pallet::getter(fn campaigns)]
	pub type Campaigns<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::CampaignId,
		BoundedVec<CampaignInfoOf<T>, T::MaxActiveCampaigns>,
		OptionQuery
	>;
	
	// Track the next campaign id to be used.
	#[pallet::storage]
	#[pallet::getter(fn campaign_index)]
	pub type CampaignsIndex<T: Config> = StorageMap<_, T::CampaignId, ValueQuery>;

	/// Record of all the contributions made to a campaign by contributors
	/// under campaign_id. 
	///
	/// Contributions: double_map T::CampaignId, AccountIdOf<T> => Contribution
	#[pallet::storage]
	#[pallet::getter(fn contributions)]
	pub type Contributions<T: Config> = 
		StorageDoubleMap<_, Twox64Concat, T::CampaignId, Twox64Concat, AccountIdOf<T>, Contribution, ValueQuery>;
	
	/// Record of the total amount of funds raised in the protocol
	///  under a specific currency_id. currency_id => total_raised
	///
	/// TotalAmountRaised: map CurrencyIdOf<T> => BalanceOf<T>
	#[pallet::storage]
	#[pallet::getter(fn total_amount_raised_in-protocol)]
	pub type TotalAmountRaised<T: Config> = StorageMap<_, Twox64Concat, CurrencyIdOf<T>, BalanceOf<T>, ValueQuery>;

	/// Record of the total number of successful campaigns done in the protocol.
	///
	/// SuccessfulCampaigns: map u32;
	#[pallet::storage]
	#[pallet::getter(fn total_successful_campaigns)]
	pub type SuccessfulCampaigns<T: Config> = StorageMap<_, T::CampaignId, ValueQuery>;

	#[pallet::pallet]
	pub struct Pallet<T>(PhantomData<T>);

	#[pallet::hooks]
	impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {}

	#[pallet::call]
	impl<T: Config> Pallet<T> {}
}

impl<T: Config> Pallet<T> {

}

impl<T: Config> Proposal<T::AccountId, T::BlockNumber> for Pallet<T> {
	/// The id of a CampaignInfo
	type CampaignId: u32;
	/// The currency type used for the campaign.
    type CurrencyId: u32;
    /// The balance type of a currency.
	type Balance: u64;

	/// The Campaign Proposal info of `id`
	fn proposal_info(id: Self::CampaignId) -> Option<CampaignInfo<AccountId, Self::Balance, BlockNumber>> {
		Self::proposals(id)
	}

	/// Create new Campaign Proposal with specific `CampaignInfo`, return the `id` of the Campaign
	fn new_proposal(
		origin: OriginFor<T>,
		project_name: Vec<u8>,
		project_logo: Vec<u8>,
		project_description: Vec<u8>,
		project_website: Vec<u8>,
		beneficiary: AccountIdOf<T>,
		raise_currency: CurrencyIdOf<T>,
		sale_token: CurrencyIdOf<T>,
		token_price: BalanceOf<T>,
		crowd_allocation: BalanceOf<T>,
		goal: BalanceOf<T>,
		period: T::BlockNumber,
	) -> result::Result<Self::CampaignId, DispatchError> {
		let who = ensure_signed(origin)?;

		// Ensure that the period is not zero
		ensure!(period > T::BlockNumber::zero(), Error::<T>::ZeroPeriod);
		// Ensure that the period is not too long
		ensure!(period <= T::MaxCampaignPeriod::get(), Error::<T>::MaxActivePeriodExceeded);
		// Ensure that the goal is not less than the Minimum Raise
		ensure!(goal > T::MinRaise::get(), Error::<T>::GoalBelowMinimumRaise);

		// Generate the CampaignInfo structure
		let bounded_proposal:BoundedVec<CampaignInfoOf<T>, T::MaxProposals> = 
		vec![CampaignInfo {
			origin: who.clone(),
			project_name: project_name,
			project_logo: project_logo,
			project_description: project_description,
			project_website: project_website,
			beneficiary: beneficiary,
			raise_currency: raise_currency,
			sale_token: sale_token,
			token_price: token_price,
			crowd_allocation: crowd_allocation,
			goal: goal,
			raised: Zero::zero(),
			period: period,
			campaign_start: <system::Pallet<T>>::block_number(),
			is_approved: false,
			is_successful: false,
			is_failed: false,
			is_ended: false,
		}]
		.try_into()
		.expect("Max proposals exceeded");

		let campaign_id = <CampaignsIndex<T>>::try_mutate(|idx| -> sp_std::result::Result<Self::CampaignId, DispatchError> {
			let id = *idx;
			ensure!(id != CampaignId::max_value(), Error::<T>::NoAvailableCampaignId);
			*idx += CampaignId::one();
			Ok(id)
		});

		// Try check available balance for Submission Deposit
		assert!(
			T::MultiCurrency::free_balance(T::GetNativeCurrencyId::get(), &who) >= T::SubmissionDeposit::get(),
			"Account do not have enough balance for Submission Deposit"
		);
		// Try check available balance for Crowd Allocation
		assert!(
			T::MultiCurrency::free_balance(sale_token, &who) >= crowd_allocation,
			"Account do not have enough balance for Crowd Allocation"
		);

		// Initiate the Proposal
		if T::MultiCurrency::set_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), who, T::SubmissionDeposit::get()).is_ok() &&
			T::MultiCurrency::set_lock(LAUNCHPAD_LOCK_ID, sale_token, who, crowd_allocation).is_ok() {
			CampaignInfo::<T>::insert(campaign_id, bounded_proposal);
		}
	}

	/// Ensure proposal is valid
	fn ensure_valid_proposal(id: Self::CampaignId) -> result::Result<(), DispatchError> {
		let proposal = Self::proposals(id);
		ensure!(proposal.is_some(), Error::<T>::InvalidProposalId);
		let proposal = proposal.unwrap();
		ensure!(!proposal.is_approved, Error::<T>::ProposalAlreadyApproved);
		Ok(())
	}
    /// Approve Proposal by `id` at `now`.
    fn approve_proposal(id: CampaignId) {
		let mut proposal = Self::proposals(id).ok_or(Error::<T>::ProposalNotFound)?;
		ensure!(!proposal.is_approved, Error::<T>::ProposalAlreadyApproved);
		proposal.is_approved = true;
		proposal.campaign_start = <system::Pallet<T>>::block_number() + T::CampaignStartDelay::get();

		Self::proposals(id).remove();
		Self::campaigns(id).put(proposal);
	}
	
	/// Reject Proposal by `id` and remove from storage.
	fn reject_proposal(id: Self::CampaignId) {
		// Check that the Proposal exists and tag it
		let mut proposal = Self::proposals(id).ok_or(Error::<T>::ProposalNotFound)?;
		// Ensure that the proposal is not already approved
		ensure!(!proposal.is_approved, Error::<T>::ProposalAlreadyApproved);

		// Unlock balances and remove the Proposal from the storage.
		if T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), proposal.origin, T::SubmissionDeposit::get()).is_ok() &&
			T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, sale_token, proposal.origin, crowd_allocation).is_ok() {
				Self::proposals(id).remove();
		}
	}
}

impl<T: Config> Campaign<T::AccountId, T::BlockNumber> for Pallet<T> {
	/// The id of a CampaignInfo
	type CampaignId: u32;
	/// The currency type used for the campaign.
    type CurrencyId: u32;
    /// The balance type of a currency.
	type Balance:u32;
	/// The Campaign info of `id`
	fn campaign_info(id: Self::CampaignId) -> Option<CampaignInfo<AccountId, Self::Balance, BlockNumber>> {
		Self::campaigns(id)
	}

	/// Called when a contribution is received.
	fn on_contribution(
		who: AccountIdOf<T>,
		id: CampaignId,
		contribution: ( AccountIdOf<T>, BalanceOf<T>),
	) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		let (who, amount) = contribution;

		// Ensure campaign is valid
		Self::ensure_valid_campaign(id)?;

		ensure!(amount >= T::MinContribution::get(), Error::<T>::ContributionBelowMinimum);
		ensure!(T::MultiCurrency::free_balance(T::GetNativeCurrencyId::get(), &who) >= amount, Error::<T>::ContributionNotEnough);
		ensure!(T::MultiCurrency::set_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), who, amount).is_ok(), Error::<T>::ContributionNotEnoughBalance);
		
		campaign.raised += amount;
		Self::campaigns(id).put(campaign);

		// Get contribution position data
		let Contribution {contributed, allocated} = Self::positions(id, who);

		// Set and store contribution data structure in contributions map
		let Contribution {contributed, allocated} = Contribution {
			contributed: contributed + amount,
			allocated: contributed / campaign.token_price,
		} = Self::contributions(id, who);
	}

	/// Called when a contribution allocation is claimed
	fn on_claim_allocation(
		who: AccountId,
		id: CampaignId,
	) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		let (who, amount) = Self::positions(id, who);

		// Ensure campaign is valid
		Self::ensure_valid_campaign(id)?;

		ensure!(amount >= T::MinContribution::get(), Error::<T>::ContributionBelowMinimum);
		ensure!(T::MultiCurrency::free_balance(sale_token, &who) >= amount, Error::<T>::ContributionNotEnough);
		ensure!(T::MultiCurrency::set_lock(LAUNCHPAD_LOCK_ID, sale_token, who, amount).is_ok(), Error::<T>::ContributionNotEnoughBalance);
		
		campaign.raised += amount;
		Self::campaigns(id).put(campaign);

		// Get contribution position data
		let Contribution {contributed, allocated} = Self::positions(id, who);

		// Set and store contribution data structure in contributions map
		let Contribution {contributed, allocated} = Contribution {
			contributed: contributed + amount,
			allocated: contributed / campaign.token_price,
		} = Self::contributions(id, who);
	}

	/// Called when a campaign's raised fund is claimed
	fn on_claim_campaign(
		who: AccountId,
		id: CampaignId,
	) -> DispatchResult {}

	/// Ensure campaign is Valid
	fn ensure_valid_campaign(id: Self::CampaignId) -> DispatchResult {
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		ensure!(!campaign.is_failed, Error::<T>::CampaignFailed);
		ensure!(!campaign.is_ended, Error::<T>::CampaignSuccessful);
		ensure!(campaign.is_approved, Error::<T>::CampaignNotApproved);

		ensure!(campaign.campaign_start <= <system::Pallet<T>>::block_number(), Error::<T>::CampaignNotStarted);
		ensure!(campaign.period > <system::Pallet<T>>::block_number() - campaign.campaign_start, Error::<T>::CampaignNotActive);
		Ok(())
	}

	/// Ensure campaign is Valid
	fn ensure_successful_campaign(id: Self::CampaignId) -> DispatchResult {
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		ensure!(!campaign.is_failed, Error::<T>::CampaignFailed);
		ensure!(campaign.is_successful, Error::<T>::CampaignUnsuccessful);
		ensure!(campaign.is_ended, Error::<T>::CampaignStillActive);
		ensure!(campaign.is_approved, Error::<T>::CampaignNotApproved);

		ensure!(campaign.campaign_start <= <system::Pallet<T>>::block_number(), Error::<T>::CampaignNotStarted);
		ensure!(campaign.period > <system::Pallet<T>>::block_number() - campaign.campaign_start, Error::<T>::CampaignNotActive);
		Ok(())
	}

	/// Record Successful Campaign by `id`
	fn on_successful_campaign(id: Self::CampaignId) {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		campaign.is_successful = true;
		Self::successful_campaigns(id).put(campaign);
		Self::
	}
	/// Transfer contribution allocation from locked campaign crowd allocation to contributors
	fn dispense_contributions(who: AccountIdOf<T>, id: Self::CampaignId) {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		let allocation_origin = campaign.origin;
		let Some(contribution) = contributions.iter_mut().find(|who, contributed, allocated | c.who == who);
		if let Some(contribution) = contribution {
			contribution.amount += amount;
		} else {
			contributions.push(Contribution {
				who,
				amount,
			});
		}
	}
	/// Record Failed Campaign by `id`
	fn on_failed_campaign(id: Self::CampaignId) {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		campaign.is_failed = true;

		let mut contributions = Self::contributions(id).ok_or(Error::<T>::CampaignNotFound)?;
		for contribution in contributions {
			if T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, sale_token, contribution.who, contribution.amount).is_ok() {
				cont
			}
		}
		// Unlock campaign creator's balances and remove the Campaign from the storage.
		if T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), campaign.origin, T::SubmissionDeposit::get()).is_ok() &&
			T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, sale_token, campaign.origin, crowd_allocation).is_ok() && {
				
			Self::campaigns(id).remove();
		}
	}
}
