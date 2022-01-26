//! Traits for the Launchpad Crowdsales Pallet.

use codec::FullCodec;
use codec::{Decode, Encode};
use sp_runtime::{
	traits::{AtLeast32Bit, Bounded, MaybeSerializeDeserialize},
	DispatchError, DispatchResult, RuntimeDebug,
};
use orml_traits::Change;
use sp_std::{
	cmp::{Eq, PartialEq},
	fmt::Debug,
	result,
};

/// Campaign ID
pub type CampaignId = u32;

/// The auction ID type.
type CampaignId: Parameter
		+ Member
		+ AtLeast32BitUnsigned
		+ Default
		+ Copy
		+ MaybeSerializeDeserialize
		+ Bounded
		+ codec::FullCodec;

/// A Contribution position.
#[derive(Encode, Decode, Eq, PartialEq, Copy, Clone, RuntimeDebug, Default, MaxEncodedLen)]
pub struct Contribution {
	/// The amount of contribution made.
	pub contributed: Balance,
	/// The amount of allocation made.
	pub allocated: Balance,
}
/// The Structure of a Campaign info.
#[cfg_attr(feature = "std", derive(PartialEq, Eq))]
#[derive(Encode, Decode, Clone, RuntimeDebug)]
pub struct CampaignInfo<AccountId, BlockNumber> {
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
	/// Crowdsale Token Price - Amount of raise_currency per sale_token
	#[codec(compact)]
	token_price: Balance,
	/// Crowdsale Token amount for sale
	#[codec(compact)]
	crowd_allocation: Balance,
	/// The Fundraise Goal - HardCap
	#[codec(compact)]
	goal: Balance,
	#[codec(compact)]
	raised: Balance,
	/// The period that the campaign runs for.
	period: BlockNumber,
	/// The time when the campaign starts.
	campaign_start: BlockNumber,
	/// Is the campaign approved?
	is_approved: Bool,
	/// Is the campaign Successful?
	is_successful: Bool,
	/// Is the campaign Failed?
	is_failed: Bool,
	/// Is the campaign Ended?
	is_ended: Bool,
}

/// Abstraction over th Launchpad Proposal system.
pub trait Proposal<AccountId, BlockNumber> {
	/// The id of a CampaignInfo
	type CampaignId: FullCodec + Default + Copy + Eq + PartialEq + MaybeSerializeDeserialize + Bounded + Debug;
	/// The currency type used for the Campaign Proposal.
    type CurrencyId: FullCodec + Eq + PartialEq + Copy + MaybeSerializeDeserialize + Debug;
    /// The balance type of a currency.
	type Balance: AtLeast32Bit + FullCodec + Copy + MaybeSerializeDeserialize + Debug + Default;

	/// The Campaign Proposal info of `id`
	fn proposal_info(id: Self::CampaignId) -> Option<CampaignInfo<AccountId, Self::Balance, BlockNumber>>;
	/// Create new Campaign Proposal with specific `CampaignInfo`, return the `id` of the Campaign
	fn new_proposal(
		origin: AccountId,
		project_name: Vec<u8>,
		project_logo: Vec<u8>,
		project_description: Vec<u8>,
		project_website: Vec<u8>,
		beneficiary: AccountId,
		raise_currency: Self::CurrencyId,
		sale_token: Self::CurrencyId,
		crowd_allocation: Self::Balance,
		goal: Balance,
		period: T::BlockNumber,
	) -> result::Result<Self::CampaignId, DispatchError>;
	/// Ensure proposal is valid
	fn ensure_valid_proposal(id: Self::CampaignId) -> result::Result<(), DispatchError>;
    /// Approve Proposal by `id` at `now`.
    fn approve_proposal(id: Self::CampaignId);
	/// Reject Proposal by `id` and remove from dtorage
	fn reject_proposal(id: Self::CampaignId);
}

/// Abstraction over th Launchpad Campaign system.
pub trait Campaign<AccountId, BlockNumber> {
	/// The id of a CampaignInfo
	type CampaignId: FullCodec + Default + Copy + Eq + PartialEq + MaybeSerializeDeserialize + Bounded + Debug;
	/// The currency type used for the campaign.
    type CurrencyId: FullCodec + Eq + PartialEq + Copy + MaybeSerializeDeserialize + Debug;
    /// The balance type of a currency.
	type Balance: AtLeast32Bit + FullCodec + Copy + MaybeSerializeDeserialize + Debug + Default;

	/// The Campaign info of `id`
	fn campaign_info(id: Self::CampaignId) -> Option<CampaignInfo<AccountId, Self::Balance, BlockNumber>>;
	/// Called when a contribution is received.
	fn on_contribution(
		who: AccountId,
		id: CampaignId,
		contribution: (Self::AccountId, Self::Balance),
	) -> DispatchResult;
	/// Called when a contribution allocation is claimed
	fn on_claim_allocation(
		who: AccountId,
		id: CampaignId,
	) -> DispatchResult;
	/// Called when a campaign's raised fund is claimed
	fn on_claim_campaign(
		who: AccountId,
		id: CampaignId,
	) -> DispatchResult;
	/// Ensure that the campaign is still running.
	fn ensure_valid_campaign(id: Self::CampaignId) -> DispatchResult;
	/// Record Successful Campaign by `id`
	fn on_successful_campaign(id: Self::CampaignId);
	/// Record Failed Campaign by `id`
	fn on_failed_campaign(id: Self::CampaignId);
}
