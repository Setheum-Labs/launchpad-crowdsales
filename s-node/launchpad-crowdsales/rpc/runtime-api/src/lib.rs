//! Runtime API definition for LaunchPad Crowdsales.
//!
#![cfg_attr(not(feature = "std"), no_std)]
// The `too_many_arguments` warning originates from `decl_runtime_apis` macro.
#![allow(clippy::too_many_arguments)]
// The `unnecessary_mut_passed` warning originates from `decl_runtime_apis` macro.
#![allow(clippy::unnecessary_mut_passed)]

use codec::Codec;
use sp_std::prelude::Vec;
use sp_runtime::traits::MaybeDisplay;

use primitives::CampaignInfo;

sp_api::decl_runtime_apis! {
	pub trait LaunchPadApi<AccountId, Balance, BlockNumber> where
		AccountId: Codec + MaybeDisplay + Ord,
		Balance: Codec + MaybeDisplay,
		BlockNumber: Codec + MaybeDisplay,
	{
		fn get_proposals() -> Vec<CampaignInfo<AccountId, Balance, BlockNumber>>;
		fn get_campaigns() -> Vec<CampaignInfo<AccountId, Balance, BlockNumber>>;
	}
}
