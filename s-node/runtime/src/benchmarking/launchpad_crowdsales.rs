//! Benchmarks for the launchpas-crowdsales module.

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]
use crate::{
	AccountId, Balance, BlockNumber, CurrencyId, Currencies, dollar, Ratio, Runtime,
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
		let n in 0 .. 100;
		let u in 0 .. 100;

		let caller: AccountId = whitelisted_caller();
		let beneficiary: AccountId = account("beneficiary", 0, SEED);

		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));

		let now: BlockNumber = 258000;

		let mut proposals: Vec<u32> = Vec::new();
		let mut campaigns: Vec<u32> = Vec::new();
		for i in 0 .. n {
			LaunchPad::make_proposal(
				RawOrigin::Root.into(),
				vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
				whitelisted_caller(), STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
			)?;
			proposals.push(i);
		}
		for i in 0 .. u {
			LaunchPad::approve_proposal(RawOrigin::Root.into(), 1)?;
			campaigns.push(i);
		}

		System::set_block_number(now);
	}: {
		LaunchPad::on_initialize(System::block_number());
	}

	// mint NFT token
	make_proposal {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);

		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));
	}: _(
		RawOrigin::Signed(caller),
		vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
		beneficiary, STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
	)

	// transfer NFT token to another account
	contribute {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		
		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));

		LaunchPad::make_proposal(
			RawOrigin::Root.into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			beneficiary, STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
		)?;
		LaunchPad::approve_proposal(RawOrigin::Root.into(), 1)?;
		System::set_block_number(150u32.into());
	}: _(RawOrigin::Signed(caller), 1, 1_000 * dollar(STABLECOIN))

	// burn NFT token
	claim_contribution_allocation {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);

		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));

		LaunchPad::make_proposal(
			RawOrigin::Root.into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			beneficiary, STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
		)?;
		LaunchPad::approve_proposal(RawOrigin::Root.into(), 1)?;
		System::set_block_number(150u32.into());
		LaunchPad::contribute(RawOrigin::Root.into(), 1, 1_000 * dollar(STABLECOIN))?;
		System::set_block_number(171u32.into());
	}: _(RawOrigin::Signed(caller), 1)

	// burn NFT token with remark
	claim_campaign_fundraise {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);

		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));

		LaunchPad::make_proposal(
			RawOrigin::Root.into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			beneficiary, STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
		)?;
		LaunchPad::approve_proposal(RawOrigin::Root.into(), 1)?;
		System::set_block_number(150u32.into());
		LaunchPad::contribute(RawOrigin::Root.into(), 1, 1_000 * dollar(STABLECOIN))?;
		System::set_block_number(192u32.into());
		LaunchPad::on_initialize(System::block_number());
	}: _(RawOrigin::Signed(caller), 1)

	// destroy NFT class
	approve_proposal {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);

		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));

		LaunchPad::make_proposal(
			RawOrigin::Root.into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			beneficiary, STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
		)?;
	}: _(RawOrigin::Root, 1)

	reject_proposal {
		let caller: AccountId = account("caller", 0, SEED);
		let beneficiary: AccountId = account("beneficiary", 0, SEED);
		
		set_balance(LAUNCHPAD, &caller, 1000000000 * dollar(LAUNCHPAD));
		set_balance(STABLECOIN, &caller, 1000000000 * dollar(STABLECOIN));
		set_balance(SALECOIN, &caller, 1000000000 * dollar(SALECOIN));
		set_balance(NATIVE, &caller, 1000000000 * dollar(NATIVE));

		LaunchPad::make_proposal(
			RawOrigin::Root.into(),
			vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256], vec![b'X'; 256],
			beneficiary, STABLECOIN, SALECOIN, 10, 10_000, 100_000, 20
		)?;
	}: _(RawOrigin::Root, 1)
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::benchmarking::utils::tests::new_test_ext;
	use orml_benchmarking::impl_benchmark_test_suite;

	impl_benchmark_test_suite!(new_test_ext(),);
}
