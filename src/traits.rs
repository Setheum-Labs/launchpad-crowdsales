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
	/// Is the campaign approved?
	is_approved: Bool,
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
	/// Create new Campaign with specific `CampaignInfo`, return the `id` of the `Campaign`
	fn new_campaign(now: BlockNumber, info: CampaignInfo<AccountId, Self::Balance, BlockNumber>) -> result::Result<Self::CampaignId, DispatchError>;
	/// Update the Campaign info of `id` with `info`
	fn update_campaign(id: Self::CampaignId, info: CampaignInfo<AccountId, Self::Balance, BlockNumber>) -> DispatchResult;
	/// Remove Campaign by `id`
	fn remove_campaign(id: Self::CampaignId);
	fn on_start_campaign(
		now: BlockNumber,
		id: CampaignId,
		info: CampaignInfo<AccountId, Self::Balance, BlockNumber>,
	) -> DispatchResult;
	/// Called when a contribution is received.
	/// The return value determines if the contribution should be accepted and 
    /// update the amount of tokens allocated to the contributor.
	/// Implementation should reserve the funds from the contributor.
	fn on_contribution(
		now: BlockNumber,
		id: CampaignId,
		contribution: (AccountId, Balance),
	) -> DispatchResult;
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
	) -> DispatchResult;
}
