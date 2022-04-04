//! Benchmarks for the launchpas-crowdsales module.

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]
use crate::{
	AccountId, Balance, BlockNumber, CurrencyId, Currencies, dollar, Event, Ratio, Runtime,
	LaunchPad, System, GetSerpCurrencyId, GetNativeCurrencyId, GetHelpCurrencyId, GetSetUSDId, 
};

use super::utils::set_balance;
use frame_benchmarking::{account, whitelisted_caller};
use frame_system::RawOrigin;
use orml_benchmarking::runtime_benchmarks;
use frame_support::traits::OnInitialize;
use orml_traits::MultiCurrency;
use sp_runtime::traits::Zero;
use sp_std::prelude::*;

use sp_std::vec::Vec;

use frame_support::{dispatch::DispatchErrorWithPostInfo, traits::Get, weights::DispatchClass};
use sp_runtime::traits::{AccountIdConversion, StaticLookup, UniqueSaturatedInto};

use primitives::CampaignInfo;


const SEED: u32 = 0;

const LAUNCHPAD: CurrencyId = GetHelpCurrencyId::get();
const STABLECOIN: CurrencyId = GetSetUSDId::get();
const SALECOIN: CurrencyId = GetSerpCurrencyId::get();
const NATIVE: CurrencyId = GetNativeCurrencyId::get();

runtime_benchmarks! {
	{ Runtime, launchpad_crowdsales }


	on_initialize {
		let n in 0 .. 200;
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		// set balance
		Currencies::deposit(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD))?;
		Currencies::deposit(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN))?;
		Currencies::deposit(SALECOIN, &caller, 1000000000 * dollar(SALECOIN))?;
		Currencies::deposit(NATIVE, &caller, 1000000000 * dollar(NATIVE))?;
		let now: BlockNumber = 258000;
		let proposal = CampaignInfo {
			id: SALECOIN,
			origin: caller.clone(),
			project_name: "Project Name".as_bytes().to_vec(),
			project_logo: "Project Logo".as_bytes().to_vec(),
			project_description: "Project Description".as_bytes().to_vec(),
			project_website: "project.website".as_bytes().to_vec(),
			beneficiary: beneficiary.clone(),
			pool: LaunchPad::campaign_pool(0),
			raise_currency: STABLECOIN,
			sale_token: SALECOIN,
			token_price: 10,
			crowd_allocation: 10_000,
			goal: 100_000,
			raised: 0,
			contributors_count: 0,
			contributions: Vec::new(),
			period: 20,
			campaign_start: 0,
			campaign_end: 0,
			campaign_retirement_period: 0,
			proposal_retirement_period: 0,
			is_approved: false,
			is_rejected: false,
			is_waiting: false,
			is_active: false,
			is_successful: false,
			is_failed: false,
			is_ended: false,
			is_claimed: false,
		};
		let mut proposals_vec: Vec<(CurrencyId, CampaignInfo<AccountId, Balance, BlockNumber>)> = Vec::new();
		let mut campaigns_vec: Vec<(CurrencyId, CampaignInfo<AccountId, Balance, BlockNumber>)> = Vec::new();
		for i in 0 .. n {
			for proposal in LaunchPad::proposals(SALECOIN).iter().into_iter() {
				LaunchPad::make_proposal(
					RawOrigin::Root.into(),
					vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
					whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
					10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
				)?;
				proposals_vec.push((SALECOIN, proposal.clone()));
				LaunchPad::approve_proposal(RawOrigin::Root.into(), SALECOIN)?;
			}
			for proposal in LaunchPad::campaigns(SALECOIN).iter().into_iter() {
				campaigns_vec.push((SALECOIN, proposal.clone()));
			}
		}
		System::set_block_number(now);
	}: {
		LaunchPad::on_initialize(System::block_number());
	}

	// Make Proposal
	make_proposal {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		// set balance
		Currencies::deposit(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD))?;
		Currencies::deposit(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN))?;
		Currencies::deposit(SALECOIN, &caller, 1000000000 * dollar(SALECOIN))?;
		Currencies::deposit(NATIVE, &caller, 1000000000 * dollar(NATIVE))?;
	}: _(
		RawOrigin::Signed(caller),
		vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
		beneficiary, STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
		10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
	)

	// Contribute to campaign
	contribute {
		// set vars
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		// set balance
		set_balance(LAUNCHPAD, &caller, 100_000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 100_000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 100_000 * dollar(NATIVE));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		// make proposal
		LaunchPad::make_proposal(
			RawOrigin::Signed(caller).into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
			10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
		)?;
		// approve proposal
		LaunchPad::approve_proposal(RawOrigin::Root.into(), SALECOIN)?;
		LaunchPad::activate_waiting_campaign(RawOrigin::Root.into(), SALECOIN)?;
		// execute => contribute 
	}: _(RawOrigin::Signed(whitelisted_caller()), SALECOIN, 1_000 * dollar(STABLECOIN))
	verify {
		assert_eq!(
			<Currencies as MultiCurrency<_>>::total_balance(STABLECOIN, &whitelisted_caller()),
			198_000 * dollar(STABLECOIN)
		);
	}

	// Claim contribution allocation
	claim_contribution_allocation {
		// set vars
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		let now: BlockNumber = 258000;
		// set balance
		set_balance(LAUNCHPAD, &caller, 100_000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 100_000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 100_000 * dollar(NATIVE));
		set_balance(STABLECOIN, &beneficiary, 100_000 * dollar(STABLECOIN));
		System::set_block_number(now);
		// make proposal
		LaunchPad::make_proposal(
			RawOrigin::Signed(caller).into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
			10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
		)?;
		// approve proposal
		LaunchPad::approve_proposal(RawOrigin::Root.into(), SALECOIN)?;
		LaunchPad::activate_waiting_campaign(RawOrigin::Root.into(), SALECOIN)?;
		// contribute
		System::set_block_number(now + 1);
		let _ = LaunchPad::contribute(RawOrigin::Signed(whitelisted_caller()).into(), SALECOIN, 50_000 * dollar(STABLECOIN));
		let __ = LaunchPad::contribute(RawOrigin::Signed(beneficiary).into(), SALECOIN, 50_000 * dollar(STABLECOIN));
		// execute => claim 
		System::set_block_number(now + 41);
		LaunchPad::on_initialize(now + 41);
	}: _(RawOrigin::Signed(whitelisted_caller()), SALECOIN)


	// Claim campaign Fundraise
	claim_campaign_fundraise {
		// set vars
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		let now: BlockNumber = 258000;
		// set balance
		set_balance(LAUNCHPAD, &caller, 100_000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 200_000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 100_000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 100_000 * dollar(NATIVE));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		System::set_block_number(now);
		// make proposal
		LaunchPad::make_proposal(
			RawOrigin::Signed(caller).into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
			10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
		)?;
		// approve proposal
		LaunchPad::approve_proposal(RawOrigin::Root.into(), SALECOIN)?;
		LaunchPad::activate_waiting_campaign(RawOrigin::Root.into(), SALECOIN)?;
		// contribute
		System::set_block_number(now + 1);
		let _ = LaunchPad::contribute(RawOrigin::Signed(whitelisted_caller()).into(), SALECOIN, 50_000 * dollar(STABLECOIN));
		let __ = LaunchPad::contribute(RawOrigin::Signed(beneficiary).into(), SALECOIN, 50_000 * dollar(STABLECOIN));
		// execute => claim 
		System::set_block_number(now + 61);
		LaunchPad::on_initialize(now + 61);
	}: _(RawOrigin::Signed(whitelisted_caller()), SALECOIN)

	// Approve Proposal
	approve_proposal {
		// set vars
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		let now: BlockNumber = 258000;
		// set balance
		set_balance(LAUNCHPAD, &caller, 100_000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 100_000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 100_000 * dollar(NATIVE));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		System::set_block_number(now);
		//make proposal
		LaunchPad::make_proposal(
			RawOrigin::Signed(caller).into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
			10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
		)?;
		// execute => contribute 
	}: _(RawOrigin::Root, SALECOIN)

	// Reject Proposal
	reject_proposal {
		// set vars
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		let now: BlockNumber = 258000;
		// set balance
		set_balance(LAUNCHPAD, &caller, 100_000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 100_000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 100_000 * dollar(NATIVE));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		System::set_block_number(now);
		// make proposal
		LaunchPad::make_proposal(
			RawOrigin::Signed(caller).into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
			10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
		)?;
		// execute => contribute 
		System::set_block_number(now + 41);
	}: _(RawOrigin::Root, SALECOIN)

	// Activate waiting campaign
	activate_waiting_campaign {
		// set vars
		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		let now: BlockNumber = 258000;
		// set balance
		set_balance(LAUNCHPAD, &caller, 100_000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 100_000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 100_000 * dollar(NATIVE));
		set_balance(STABLECOIN, &caller, 100_000 * dollar(STABLECOIN));
		System::set_block_number(now);
		// make proposal
		LaunchPad::make_proposal(
			RawOrigin::Signed(caller).into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			whitelisted_caller(), STABLECOIN, SALECOIN, 10 * dollar(STABLECOIN),
			10_000 * dollar(SALECOIN), 100_000 * dollar(STABLECOIN), 20
		)?;
		// approve proposal
		LaunchPad::approve_proposal(RawOrigin::Root.into(), SALECOIN)?;
		// execute => contribute 
	}: _(RawOrigin::Root, SALECOIN)
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::benchmarking::utils::tests::new_test_ext;
	use orml_benchmarking::impl_benchmark_test_suite;

	impl_benchmark_test_suite!(new_test_ext(),);
}
