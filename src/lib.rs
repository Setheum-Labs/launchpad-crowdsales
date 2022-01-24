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

/// The Structure of a Campaign
#[cfg_attr(feature = "std", derive(PartialEq, Eq))]
#[derive(Encode, Decode, Clone, RuntimeDebug)]
pub struct Campaign<AccountId, BlockNumber> {
	/// Campaign Creator
	origin: AccountId,
	/// Project Name
	project_name: Vec<u8>,
	/// Project Logo
	project_logo: Vec<u8>,
	/// Project Description
	project_description: Vec<u8>,
	/// Project Website
	project_website: Vec<u8>,
	/// Campaign Beneficiary
	beneficiary: AccountId,
	/// Currency type for the fundraise
	raise_currency: CurrencyId,
	/// Currency type (Token) for crowdsale
	sale_token: CurrencyId,
	/// Crowdsale Token amount for sale
	#[codec(compact)]
	crowd_allocaton: Balance,
	/// The Fundraise Goal - HardCap
	#[codec(compact)]
	goal: Balance,
	/// The period that the campaign runs for.
	period: BlockNumber,
	/// Is the campaign approved?
	is_approved: Bool,
}

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
	pub enum Event<T: Config> {}

	#[derive(Encode, Decode, Default, PartialEq, Eq)]
	#[cfg_attr(feature = "std", derive(Debug))]
	pub struct CampaignInfo<AccountId, Balance, BlockNumber> {
		/// The name of the Project that will recieve the funds if the campaign is successful
		project_name: Vec<u8>,
		/// The account that will recieve the funds if the campaign is successful
		project_logo: Vec<u8>,
		/// The account that will recieve the funds if the campaign is successful
		project_description: Vec<u8>,
		/// The account that will recieve the funds if the campaign is successful
		project_website: Vec<u8>,
		/// The account that will recieve the funds if the campaign is successful
		beneficiary: AccountId,
		/// The currency to raise for the campaign
		raise_currency: CurrencyId,
		/// The projects ERC20 token contract address
		erc20_contract: CurrencyId,
		/// The amount of project tokens (ERC20)
		/// allocated to the crowdfund campaign contributors
		crowd_allocation: Balance,
		/// The amount of project tokens (ERC20)
		/// allocated to the DEX for bootstrap
		bootstrap_allocation: Balance,
		/// The amount of deposit placed
		submission_deposit: Balance,
		/// The total amount raised
		raised: Balance,
		/// Success bound on `raised` - Soft Cap for the campaign.
		soft_goal: Balance,
		/// Upper bound on `raised` - Hard Cap for the campaign.
		hard_goal: Balance,
		/// The number of blocks that the campaign will last.
		period: BlockNumber,
	}
	/// Info on all of the proposed campaigns.
	///
	/// map ProposalIndex => CampaignInfoOf<T>
	#[pallet::storage]
	#[pallet::getter(fn proposals)]
	pub type Proposals<T: Config> = StorageMap<_, Blake2_128Concat, ProposalIndex, CampaignInfoOf<T>, OptionQuery>;
	
	/// Info on all of the approved campaigns.
	///
	/// map CampaignIndex => CampaignInfoOf<T>
	#[pallet::storage]
	#[pallet::getter(fn campaigns)]
	pub type Campaigns<T: Config> = StorageMap<_, Blake2_128Concat, CampaignIndex, CampaignInfoOf<T>, OptionQuery>;
	
	#[pallet::genesis_config]
	pub struct GenesisConfig<T: Config> {
		pub dummy: Option<T::Balance>,
		pub bar: Vec<(T::AccountId, T::Balance)>,
		pub foo: T::Balance,
	}

	impl<T: Config> Default for GenesisConfig<T> {
		fn default() -> Self {
			GenesisConfig {
				dummy: Default::default(),
				bar: Default::default(),
				foo: OnFooEmpty::<T>::get(),
			}
		}
	}

	#[pallet::genesis_build]
	impl<T: Config> GenesisBuild<T> for GenesisConfig<T> {
		fn build(&self) {
			if let Some(dummy) = self.dummy.as_ref() {
				Dummy::<T>::put(dummy);
			}
			for (k, v) in &self.bar {
				Bar::<T>::insert(k, v);
			}
			Foo::<T>::put(&self.foo);
		}
	}

	#[pallet::pallet]
	pub struct Pallet<T>(PhantomData<T>);

	#[pallet::hooks]
	impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {}

	#[pallet::call]
	impl<T: Config> Pallet<T> {}
}

impl<T: Config> Pallet<T> {}
