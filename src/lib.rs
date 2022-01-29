//! # Launchpad Crowdsales Pallet
//!
//! ## Overview
//!
//! This module creates a crowdsales launchpad
//! for teams to raise funds and sell their tokens to the public -
//! governance is done from an update origin. 

#![cfg_attr(not(feature = "std"), no_std)]
// Disable the following two lints since they originate from an external macro (namely decl_storage)
#![allow(clippy::string_lit_as_bytes)]
#![allow(clippy::unused_unit)]

use frame_support::{
	pallet_prelude::*, transactional, PalletId, traits::Get, ensure
};
use frame_system::{pallet_prelude::*, ensure_signed};
use orml_traits::{GetByKey, MultiCurrency, MultiLockableCurrency, LockIdentifier};

use sp_std::{
	vec::Vec,
};
use sp_runtime::{traits::{AccountIdConversion, Zero}, DispatchResult};

mod mock;
mod tests;
pub mod traits;

pub use traits::{
	Balance, CampaignId, CampaignInfo, CampaignManager, CurrencyId, Proposal,
};
pub use module::*;


pub(crate) type BalanceOf<T> = <<T as Config>::MultiCurrency as MultiCurrency<<T as frame_system::Config>::AccountId>>::Balance;
pub(crate) type CurrencyIdOf<T> =
	<<T as Config>::MultiCurrency as MultiCurrency<<T as frame_system::Config>::AccountId>>::CurrencyId;
pub(crate) type CampaignInfoOf<T> =
	CampaignInfo<<T as frame_system::Config>::AccountId, BalanceOf<T>, <T as frame_system::Config>::BlockNumber>;

pub const LAUNCHPAD_LOCK_ID: LockIdentifier = *b"set/lpad";
#[frame_support::pallet]
pub mod module {
	use super::*;

	#[pallet::config]
	pub trait Config: frame_system::Config {
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;

		/// The Currency for managing assets related to the SERP (Setheum Elastic Reserve Protocol).
		type MultiCurrency: MultiLockableCurrency<Self::AccountId, CurrencyId = Balance, Balance = Balance>;

		#[pallet::constant]
		/// Native currency_id.
		/// 
		type GetNativeCurrencyId: Get<CurrencyIdOf<Self>>;

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
		type MinRaise: GetByKey<CurrencyIdOf<Self>, BalanceOf<Self>>;

		/// The minimum amount that may be contributed into a crowdfund - by currency_id.
		/// Should almost certainly be at least ExistentialDeposit.
		type MinContribution: GetByKey<CurrencyIdOf<Self>, BalanceOf<Self>>;

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
		/// The crowdfund's contribution period has ended; no more contributions will be accepted.
		CampaignEnded,
		/// Campaign has failed
		CampaignFailed,
		/// Campaign is not approved
		CampaignNotApproved,
		/// Campaign is not active
		CampaignNotActive,
		/// Campaign is not in the list of campaigns.
		CampaignNotFound,
		/// Campaign has not started
		CampaignNotStarted,
		/// Campaign is still active
		CampaignStillActive,
		/// Contributors balance is not enough to contribute
		ContributionCurrencyNotEnough,
		/// Contribution failed to transfer
		ContributionFailedTransfer,
		/// Contribution is not in the list of contributions.
		ContributionNotFound,
		/// Must contribute at least the minimum amount of funds.
		ContributionTooSmall,
		/// Contribution has duplicate account
		DuplicateContribution,
		/// Must contribute at least the minimum amount of funds.
		GoalBelowMinimumRaise,
		/// Wrong Currency Type in use.
		InvalidCurrencyType,
		/// The fund index specified does not exist.
		InvalidIndex,
		/// Maximum number of simultaneous campaigns has been reached;
        /// no more campaigns can be approved until one is closed.
		MaxCampaignsExceeded,
		/// Crowdsale period has exceeded the maximum active period.
		MaxActivePeriodExceeded,
		/// Maximum number of Proposals has been exceeded
		MacProposalsExceeded,
		/// Maximum number of simultaneous proposals has been exceeded;
		/// no more proposals can be made until one is approved or rejected.
		MaxProposalsExceeded,
		/// Campaign Id unavailable.
		NoAvailableCampaignId,
		/// You cannot withdraw funds because you have not contributed any.
		NoContribution,
		/// Proposal is already approved.
		ProposalAlreadyApproved,
		/// Proposal is not in the list of proposals.
		ProposalNotFound,
		/// The origin is not correct
		WrongOrigin,
		/// Crowdfund period is too short.
		ZeroPeriod,
	}

	#[pallet::event]
	#[pallet::generate_deposit(pub(crate) fn deposit_event)]
	#[pallet::metadata(T::AccountId = "AccountId", BalanceOf<T> = "Balance", CurrencyId = "CurrencyId")]
	pub enum Event<T: Config> {
		/// Created Proposal \[campaign_id\]
		CreatedProposal(CampaignId),
		/// Rejected Proposal \[campaign_id\]
		RejectedProposal(CampaignId),
		/// Approved Proposal \[campaign_id\]
		ApprovedProposal(CampaignId),
		/// Campaign Started \[campaign_id\]
		StartedCampaign(CampaignId),
		/// Ended Campaign Successfully \[campaign_id, campaign_info\]
		EndedCampaignSuccessful(CampaignId),
		/// Ended Campaign Unsuccessfully \[campaign_id, campaign_info\]
		EndedCampaignUnsuccessful(CampaignId),
		/// Contributed to Campaign \[campaign_id, contribution_amount\]
		ContributedToCampaign(CampaignId, BalanceOf<T>),
		/// Claimed Funds Raised \[claimant_account_id, campaign_id, amount_claimed\]
		ClaimedFundraise(T::AccountId, CampaignId, BalanceOf<T>),
		/// Claimed Contribution Allocation \[claimant_account_id, campaign_id, allocation_claimed\]
		ClaimedAllocation(T::AccountId, CampaignId, BalanceOf<T>),
		/// Dissolved Unclaimed Funds \[amount, campaign_id, now\]
		DissolvedFunds(BalanceOf<T>, CampaignId, <T as frame_system::Config>::BlockNumber),
		/// Dispensed Commissions \[amount, campaign_id, now\]
		DispensedCommissions(BalanceOf<T>, CampaignId, <T as frame_system::Config>::BlockNumber),
	}
	
	/// Info on all of the proposed campaigns.
	///
	/// map CampaignId => CampaignInfo
	#[pallet::storage]
	#[pallet::getter(fn proposals)]
	pub type Proposals<T: Config> = StorageMap<_, Blake2_128Concat, CampaignId, CampaignInfoOf<T>, OptionQuery>;
	
	/// Info on all of the approved campaigns.
	///
	/// map CampaignId => CampaignInfo
	#[pallet::storage]
	#[pallet::getter(fn campaigns)]
	pub type Campaigns<T: Config> = StorageMap<_, Blake2_128Concat, CampaignId, CampaignInfoOf<T>, OptionQuery>;

	// Track the next campaign id to be used.
	#[pallet::storage]
	#[pallet::getter(fn campaign_index)]
	pub type CampaignsIndex<T: Config> = StorageValue<_, CampaignId, ValueQuery>;

	// Track the number of simultaneous Active Campaigns - ActiveCampaignsIndex
	#[pallet::storage]
	#[pallet::getter(fn active_campaign_sindex)]
	pub type ActiveCampaignsIndex<T: Config> = StorageValue<_, CampaignId, ValueQuery>;

	// Track the next campaign id to be used.
	#[pallet::storage]
	#[pallet::getter(fn successful_campaign_index)]
	pub type SuccessfulCampaignsIndex<T: Config> = StorageValue<_, CampaignId, ValueQuery>;

	// Track the number of simultaneous Proposals - ProposalsIndex
	#[pallet::storage]
	#[pallet::getter(fn proposals_index)]
	pub type ProposalsIndex<T: Config> = StorageValue<_, CampaignId, ValueQuery>;

	/// Index campaigns by start timing.
	#[pallet::storage]
	#[pallet::getter(fn campaign_start)]
	pub type CampaignStart<T: Config> =
		StorageDoubleMap<_, Twox64Concat, T::BlockNumber, Blake2_128Concat, CampaignId, (), OptionQuery>;

	/// Index campaigns by end timing.
	#[pallet::storage]
	#[pallet::getter(fn campaign_end)]
	pub type CampaignEnd<T: Config> =
		StorageDoubleMap<_, Twox64Concat, T::BlockNumber, Blake2_128Concat, CampaignId, (), OptionQuery>;

	/// Index campaigns by end timing.
	#[pallet::storage]
	#[pallet::getter(fn campaign_retirement)]
	pub type CampaignRetirement<T: Config> =
		StorageDoubleMap<_, Twox64Concat, T::BlockNumber, Blake2_128Concat, CampaignId, (), OptionQuery>;

	/// Record of the total amount of funds raised in the protocol
	///  under a specific currency_id. currency_id => total_raised
	///
	/// TotalAmountRaised: map CurrencyIdOf<T> => BalanceOf<T>
	#[pallet::storage]
	#[pallet::getter(fn total_amount_raised)]
	pub type TotalAmountRaised<T: Config> = StorageMap<_, Twox64Concat, CurrencyIdOf<T>, BalanceOf<T>, ValueQuery>;

	#[pallet::pallet]
	pub struct Pallet<T>(PhantomData<T>);

	#[pallet::hooks]
	impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Make a new proposal
		#[pallet::weight((100_000_000 as Weight, DispatchClass::Operational))]
		#[transactional]
		pub fn make_proposal(
			origin: OriginFor<T>,
			project_name: Vec<u8>,
			project_logo: Vec<u8>,
			project_description: Vec<u8>,
			project_website: Vec<u8>,
			beneficiary: T::AccountId,
			raise_currency: CurrencyIdOf<T>,
			sale_token: CurrencyIdOf<T>,
			token_price: BalanceOf<T>,
			crowd_allocation: BalanceOf<T>,
			goal: BalanceOf<T>,
			period: T::BlockNumber,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Ensure that the period is not zero
			ensure!(period > T::BlockNumber::zero(), Error::<T>::ZeroPeriod);
			// Ensure that the period is not too long
			ensure!(period <= T::MaxActivePeriod::get(), Error::<T>::MaxActivePeriodExceeded);
			// Ensure that the goal is not less than the Minimum Raise
			ensure!(goal > T::MinRaise::get(&raise_currency), Error::<T>::GoalBelowMinimumRaise);

			// Create proposal and add campaign_id.
			Self::new_proposal(
				who.clone(),
				project_name,
				project_logo,
				project_description,
				project_website,
				beneficiary,
				raise_currency,
				sale_token,
				token_price,
				crowd_allocation,
				goal,
				period,
			)?;
			Ok(())
		}
	}
}

impl<T: Config> Pallet<T> {
	/// Get the Launchpad's Treasury  Account.
	pub fn launchpad_treasury() -> T::AccountId {
		T::PalletId::get().into_account()
	}

	/// The account ID of the fund pot.
	///
	pub fn campaign_pool(id: CampaignId) -> T::AccountId {
		T::PalletId::get().into_sub_account(id)
	}
}

impl<T: Config> Proposal<T::AccountId, T::BlockNumber> for Pallet<T> {
	/// The Campaign Proposal info of `id`
	fn proposal_info(id: CampaignId) -> Option<CampaignInfo<T::AccountId, Balance, T::BlockNumber>> {
		Self::proposals(id)
	}

	/// Create new Campaign Proposal with specific `CampaignInfo`, return the `id` of the Campaign
	fn new_proposal(
		origin: T::AccountId,
		project_name: Vec<u8>,
		project_logo: Vec<u8>,
		project_description: Vec<u8>,
		project_website: Vec<u8>,
		beneficiary: T::AccountId,
		raise_currency: CurrencyIdOf<T>,
		sale_token: CurrencyIdOf<T>,
		token_price: BalanceOf<T>,
		crowd_allocation: BalanceOf<T>,
		goal: BalanceOf<T>,
		period: T::BlockNumber,
	) -> DispatchResult {

		// Generate campaign_id
		let campaign_index = <CampaignsIndex<T>>::get();
		// overflow not managed
		let campaign_id = campaign_index + 1;
		<CampaignsIndex<T>>::put(campaign_id);
		<ProposalsIndex<T>>::put(campaign_id);

		// Generate the CampaignInfo structure
		let proposal = CampaignInfo {
			origin: origin.clone(),
			project_name: project_name,
			project_logo: project_logo,
			project_description: project_description,
			project_website: project_website,
			beneficiary: beneficiary,
			pool: Self::campaign_pool(campaign_id),
			raise_currency: raise_currency,
			sale_token: sale_token,
			token_price: token_price,
			crowd_allocation: crowd_allocation,
			goal: goal,
			raised: Zero::zero(),
			contributions: vec![],
			period: period,
			campaign_start: Zero::zero(),
			retirement_period: Zero::zero(),
			is_approved: false,
			is_waiting: false,
			is_active: false,
			is_successful: false,
			is_failed: false,
			is_ended: false,
			is_claimed: false,
		};

		// Try check available balance for Submission Deposit
		assert!(
			T::MultiCurrency::free_balance(T::GetNativeCurrencyId::get(), &origin) >= T::SubmissionDeposit::get(),
			"Account do not have enough balance for Submission Deposit"
		);
		// Try check available balance for Crowd Allocation
		assert!(
			T::MultiCurrency::free_balance(sale_token, &origin) >= crowd_allocation,
			"Account do not have enough balance for Crowd Allocation"
		);

		// Initiate the Proposal
		if T::MultiCurrency::set_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), &origin, T::SubmissionDeposit::get()).is_ok() &&
			T::MultiCurrency::transfer(sale_token, &origin, &Self::campaign_pool(campaign_id), crowd_allocation).is_ok() {
				// Add the CampaignInfo to the proposals
				<Proposals<T>>::insert(campaign_id, proposal);
		}

		Ok(())
	}

	/// Ensure proposal is valid
	fn ensure_valid_proposal(id: CampaignId) -> sp_std::result::Result<(), DispatchError> {
		// Check that the Proposal exists and tag it
		let proposal = Self::proposals(id).ok_or(Error::<T>::ProposalNotFound)?;
		ensure!(!proposal.is_approved, Error::<T>::ProposalAlreadyApproved);
		Ok(())
	}

    /// Approve Proposal by `id` at `now`.
    fn approve_proposal(id: CampaignId)-> sp_std::result::Result<(), DispatchError> {
		// Tag the proposal and ensure it is not already approved.
		let mut proposal = Self::proposals(id).ok_or(Error::<T>::ProposalNotFound)?;
		ensure!(!proposal.is_approved, Error::<T>::ProposalAlreadyApproved);
		// Approve the proposal in CampaignInfo
		proposal.is_approved = true;

		// Set campaign start time
		let start_time = <frame_system::Pallet<T>>::block_number() + T::CampaignStartDelay::get();
		CampaignStart::<T>::insert(&start_time, id, ());
		proposal.campaign_start = <frame_system::Pallet<T>>::block_number() + T::CampaignStartDelay::get();

		// Set campaign end time
		let end_time = <frame_system::Pallet<T>>::block_number() + T::CampaignStartDelay::get() + proposal.period;
		CampaignEnd::<T>::insert(&end_time, id, ());

		// Remove from proposals and add to campaigns
		<Proposals<T>>::remove(id);
		<Campaigns<T>>::insert(id, proposal);
		Ok(())
	}
	
	/// Reject Proposal by `id` and remove from storage.
	fn reject_proposal(id: CampaignId)-> sp_std::result::Result<(), DispatchError> {
		// Check that the Proposal exists and tag it
		let proposal = Self::proposals(id).ok_or(Error::<T>::ProposalNotFound)?;
		// Ensure that the proposal is not already approved
		Self::ensure_valid_proposal(id).unwrap();

		// Unlock balances and remove the Proposal from the storage.
		if T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), &proposal.origin).is_ok() &&
			T::MultiCurrency::transfer( proposal.sale_token, &proposal.pool, &proposal.origin, proposal.crowd_allocation).is_ok() {
				// Remove from proposals
				<Proposals<T>>::remove(id);
		};
		Ok(())
	}
}

impl<T: Config> CampaignManager<T::AccountId, T::BlockNumber> for Pallet<T> {

	/// The Campaign info of `id`
	fn campaign_info(id: CampaignId) -> Option<CampaignInfo<T::AccountId, Balance, T::BlockNumber>> {
		Self::campaigns(id)
	}

	/// Called when a contribution is received.
	fn on_contribution(
		who: T::AccountId,
		id: CampaignId,
		amount: BalanceOf<T>,
	) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;

		// Ensure campaign is valid
		Self::ensure_valid_running_campaign(id)?;


		// Make assurances - minimum contribution & free balance
		ensure!(amount >= T::MinContribution::get(&campaign.raise_currency), Error::<T>::ContributionTooSmall);
		ensure!(T::MultiCurrency::free_balance(campaign.raise_currency, &who) >= amount, Error::<T>::ContributionCurrencyNotEnough);
		
		// Initiate the Contribution
		if T::MultiCurrency::transfer(campaign.raise_currency, &who, &campaign.pool, amount).is_ok() {
			
			// Update Campaign raised funds and contributors data
			campaign.raised += amount;
			
			let allocated = amount / campaign.token_price;

			// Check if contributor already exists in contributions list
			let mut found = false;
			for (contributor, contribution, allocation, _) in campaign.contributions.iter_mut() {
				if contributor == &who {

					found = true;
					*contribution += amount;
					*allocation += allocated;
					break;
				}
			}
			if !found {
				campaign.contributions.push((who, amount, allocated, false));
			}
			
			// Put campaign in campaigns storage
			<Campaigns<T>>::insert(id, campaign);
		};
		Ok(())
	}

	/// Called when a contribution allocation is claimed
	fn on_claim_allocation(
		who: T::AccountId,
		id: CampaignId,
	) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;

		// Check if the contributor exists in the contributions of the campaign, if not return error
		ensure!(campaign.contributions.iter().any(|(contributor, _, _, _)| *contributor == who), Error::<T>::ContributionNotFound);

		// Ensure campaign is successfully ended
		Self::ensure_successfully_ended_campaign(id)?;

		// Check if the contributor exists and transfer allocated from pool to contributor
		for (contributor, _, allocation, claimed) in campaign.contributions.iter_mut() {
			if contributor == &who && *claimed == false && 
				T::MultiCurrency::transfer(campaign.sale_token, &campaign.pool, &who, *allocation).is_ok() {
					//set claimed to true - allocation claimed
					*claimed = true;
					//complete claim by adding campaign update to storage
					<Campaigns<T>>::insert(id, campaign);
				}
			break;
		}
		Ok(())
	}

	/// Called when a campaign's raised fund is claimed
	fn on_claim_campaign(
		who: T::AccountId,
		id: CampaignId,
	) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;

		// Ensure origin is who created campaign proposal
		ensure!(campaign.origin == who || campaign.beneficiary == who, Error::<T>::WrongOrigin);

		// Ensure campaign is valid
		Self::ensure_ended_campaign(id)?;

		// Claim the campaign raised funds and transfer to the beneficiary
		if campaign.is_successful &&
			T::MultiCurrency::transfer(
				campaign.raise_currency,
				&campaign.pool,
				&campaign.beneficiary,
				campaign.raised
			)
			.is_ok()
		{
			// Campaign is claimed, update storage
			campaign.is_claimed = true;
			<Campaigns<T>>::insert(id, campaign);
		}
		Ok(())
	}

	/// Called when a failed campaign is claimed by the proposer
	fn on_claim_failed_campaign(
		who: T::AccountId,
		id: CampaignId,
	) -> DispatchResult {
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;

		// Ensure origin is who created campaign proposal
		ensure!(campaign.origin == who || campaign.beneficiary == who, Error::<T>::WrongOrigin);

		// Ensure campaign is valid and failed
		ensure!(campaign.is_failed, Error::<T>::CampaignFailed);
		ensure!(campaign.is_ended, Error::<T>::CampaignEnded);

		// Get the total amount of sale_token in the pool
		let total_sale_token = T::MultiCurrency::total_balance(campaign.sale_token, &campaign.pool);
		
		// Unlock balances and remove the Proposal from the storage.
		if T::MultiCurrency::remove_lock(LAUNCHPAD_LOCK_ID, T::GetNativeCurrencyId::get(), &campaign.origin).is_ok() &&
			T::MultiCurrency::transfer( campaign.sale_token, &campaign.pool, &who, total_sale_token).is_ok() {
				// Update campaign in campaigns storage
				<Campaigns<T>>::insert(id, campaign);
		};
		Ok(())
	}

	/// Ensure campaign is Valid and Running
	fn ensure_valid_running_campaign(id: CampaignId) -> DispatchResult {
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		ensure!(!campaign.is_failed, Error::<T>::CampaignFailed);
		ensure!(!campaign.is_ended, Error::<T>::CampaignEnded);
		ensure!(campaign.is_approved, Error::<T>::CampaignNotApproved);
		ensure!(campaign.is_active, Error::<T>::CampaignNotActive);

		ensure!(campaign.campaign_start <= <frame_system::Pallet<T>>::block_number(), Error::<T>::CampaignNotStarted);
		ensure!(campaign.period > <frame_system::Pallet<T>>::block_number() - campaign.campaign_start, Error::<T>::CampaignNotActive);
		Ok(())
	}

	/// Ensure campaign is Valid and Ended
	fn ensure_ended_campaign(id: CampaignId) -> DispatchResult {
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		ensure!(campaign.is_ended, Error::<T>::CampaignStillActive);
		Ok(())
	}

	/// Ensure campaign is Valid and Successfully Ended
	fn ensure_successfully_ended_campaign(id: CampaignId) -> DispatchResult {
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		ensure!(!campaign.is_failed, Error::<T>::CampaignFailed);
		ensure!(campaign.is_successful, Error::<T>::CampaignFailed);
		ensure!(campaign.is_ended, Error::<T>::CampaignStillActive);
		ensure!(campaign.is_approved, Error::<T>::CampaignNotApproved);

		ensure!(campaign.campaign_start <= <frame_system::Pallet<T>>::block_number(), Error::<T>::CampaignNotStarted);
		ensure!(campaign.period > <frame_system::Pallet<T>>::block_number() - campaign.campaign_start, Error::<T>::CampaignNotActive);
		Ok(())
	}

	/// Record Successful Campaign by `id`
	fn on_successful_campaign(id: CampaignId) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		campaign.is_successful = true;
		// Update campaign storage
		<Campaigns<T>>::insert(id, campaign);
		Ok(())
	}

	/// Record Failed Campaign by `id`
	fn on_failed_campaign(id: CampaignId) -> DispatchResult {
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		campaign.is_failed = true;
		// Update campaign storage
		<Campaigns<T>>::insert(id, campaign);
		Ok(())
	}

	/// Record Ended Campaign by `id`
	fn on_ended_campaign(id: CampaignId) -> DispatchResult {
		// Tag campaign and ensure it exists
		let mut campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;

		// Set retirement period
		let retirement_time = <frame_system::Pallet<T>>::block_number() + T::RetirementPeriod::get();
		CampaignRetirement::<T>::insert(&retirement_time, id, ());
		campaign.retirement_period =  retirement_time;
		
		// Update campaign storage
		campaign.is_ended = true;
		<Campaigns<T>>::insert(id, campaign);
		Ok(())
	}

	/// Called when pool is retired
	/// Only unsuccessful pools are retired
	fn on_retire(id: CampaignId) -> DispatchResult {
		// Get campaign in tag
		let campaign = Self::campaigns(id).ok_or(Error::<T>::CampaignNotFound)?;
		// Get accounts in tag
		let treasury = Self::launchpad_treasury();

		// Get the total amount of raise_currency in the pool
		let total_raise_currency = T::MultiCurrency::total_balance(campaign.raise_currency, &campaign.pool);
		// Get the total amount of sale_token in the pool
		let total_sale_token = T::MultiCurrency::total_balance(campaign.sale_token, &campaign.pool);
		
		// Dissolve unclaimed Fundraise
		if T::MultiCurrency::transfer(campaign.raise_currency, &campaign.pool, &treasury, total_raise_currency).is_ok() &&
			T::MultiCurrency::transfer(campaign.sale_token, &campaign.pool, &treasury, total_sale_token).is_ok() {
				
			// Remove campaign from campaigns storage
			<Campaigns<T>>::remove(id);
		}
		Ok(())
	}

	/// Get amount of contributors/contributions in a campaign
	fn get_contributors_count(id: CampaignId) -> u32 {
		let campaign = Self::campaigns(id).unwrap();
		campaign.contributions.len() as u32
	}
}
