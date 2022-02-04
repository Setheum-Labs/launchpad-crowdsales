//! Mocks for the Launchpad Crowdsales Pallet.

#![cfg(test)]

use super::*;
use frame_support::{construct_runtime, ord_parameter_types, parameter_types, PalletId};
use frame_system::EnsureSignedBy;
use orml_traits::parameter_type_with_key;
use sp_core::H256;
use sp_runtime::{
	testing::Header,
	traits::{IdentityLookup},
};

pub type AccountId = u128;
pub type Amount = i128;
pub type Balance = u32;
pub type BlockNumber = u64;
pub type CurrencyId = u32;

// The network Treasury account.
pub const TREASURY: AccountId = 0;
// Mock accounts.
pub const ALICE: AccountId = 1;
pub const BOB: AccountId = 2;
pub const CHARLIE: AccountId = 3;

pub const SETM: CurrencyId = 1;
pub const SETUSD: CurrencyId = 2;
pub const TEST: CurrencyId = 3;
pub const DOT: CurrencyId = 4;

mod crowdsales {
	pub use super::super::*;
}

parameter_types! {
	pub const BlockHashCount: u64 = 250;
}

impl frame_system::Config for Runtime {
	type Origin = Origin;
	type Index = u64;
	type BlockNumber = BlockNumber;
	type Call = Call;
	type Hash = H256;
	type Hashing = ::sp_runtime::traits::BlakeTwo256;
	type AccountId = AccountId;
	type Lookup = IdentityLookup<Self::AccountId>;
	type Header = Header;
	type Event = Event;
	type BlockHashCount = BlockHashCount;
	type BlockWeights = ();
	type BlockLength = ();
	type Version = ();
	type PalletInfo = PalletInfo;
	type AccountData = ();
	type OnNewAccount = ();
	type OnKilledAccount = ();
	type DbWeight = ();
	type BaseCallFilter = ();
	type SystemWeightInfo = ();
	type SS58Prefix = ();
	type OnSetCode = ();
}

parameter_type_with_key! {
	pub ExistentialDeposits: |_currency_id: CurrencyId| -> Balance {
		Default::default()
	};
}

impl orml_tokens::Config for Runtime {
	type Event = Event;
	type Balance = Balance;
	type Amount = Amount;
	type CurrencyId = CurrencyId;
	type WeightInfo = ();
	type ExistentialDeposits = ExistentialDeposits;
	type OnDust = ();
	type MaxLocks = ();
	type DustRemovalWhitelist = ();
}

parameter_type_with_key! {
	pub MinRaise: |currency_id: CurrencyId| -> Balance {
		match currency_id {
			&SETUSD => 100,
			&SETM => 100,
			&DOT => 100,
			_ => 0,
		}
	};
}

parameter_type_with_key! {
	pub MinContribution: |currency_id: CurrencyId| -> Balance {
		match currency_id {
			&SETUSD => 100,
			&SETM => 100,
			&DOT => 100,
			_ => 0,
		}
	};
}

parameter_types! {
	pub const GetNativeCurrencyId: CurrencyId = SETM;  // Setheum native currency ticker is SETM/
	pub const GetCommission: (u32, u32) = (10, 100); // 10%
	pub const SubmissionDeposit: Balance = 2;
	pub const MaxProposalsCount: u32 = 3;
	pub const MaxCampaignsCount: u32 = 3;
	pub const MaxActivePeriod: BlockNumber = 20;
	pub const CampaignStartDelay: BlockNumber = 5;
	pub const RetirementPeriod: BlockNumber = 20;
	pub const CrowdsalesPalletId: PalletId = PalletId(*b"set/help");
}

ord_parameter_types! {
	pub const TreasuryAccount: AccountId = TREASURY;
	pub const Eleven: AccountId = 11;
}
impl Config for Runtime {
	type Event = Event;
	type MultiCurrency = Tokens;
	type GetNativeCurrencyId = GetNativeCurrencyId;
	type GetCommission = GetCommission;
	type SubmissionDeposit = SubmissionDeposit;
	type MinRaise = MinRaise;
	type MinContribution = MinContribution;
	type MaxProposalsCount = MaxProposalsCount;
	type MaxCampaignsCount = MaxCampaignsCount;
	type MaxActivePeriod = MaxActivePeriod;
	type CampaignStartDelay = CampaignStartDelay;
	type CampaignRetirementPeriod = RetirementPeriod;
	type ProposalRetirementPeriod = RetirementPeriod;
	type UpdateOrigin = EnsureSignedBy<Eleven, AccountId>;
	type PalletId = CrowdsalesPalletId;
}

type UncheckedExtrinsic = frame_system::mocking::MockUncheckedExtrinsic<Runtime>;
type Block = frame_system::mocking::MockBlock<Runtime>;

construct_runtime!(
	pub enum Runtime where
		Block = Block,
		NodeBlock = Block,
		UncheckedExtrinsic = UncheckedExtrinsic
	{
		System: frame_system::{Pallet, Call, Storage, Config, Event<T>},
		LaunchPad: crowdsales::{Pallet, Storage, Call, Event<T>},
		Tokens: orml_tokens::{Pallet, Storage, Call, Event<T>},
	}
);

pub struct ExtBuilder {
	balances: Vec<(AccountId, CurrencyId, Balance)>,
}

impl Default for ExtBuilder {
	fn default() -> Self {
		Self { balances: vec![] }
	}
}

impl ExtBuilder {
	pub fn balances(mut self, balances: Vec<(AccountId, CurrencyId, Balance)>) -> Self {
		self.balances = balances;
		self
	}

	pub fn one_hundred_thousand_for_all(self) -> Self {
		self.balances(vec![
			(ALICE, SETM, 100_000),
			(ALICE, SETUSD, 100_000),
			(ALICE, DOT, 100_000),
			(ALICE, TEST, 100_000),
			(BOB, SETM, 100_000),
			(BOB, SETUSD, 100_000),
			(BOB, DOT, 100_000),
			(BOB, TEST, 100_000),
			(CHARLIE, SETM, 100_000),
			(CHARLIE, SETUSD, 100_000),
			(CHARLIE, DOT, 100_000),
			(CHARLIE, TEST, 100_000),
			(TREASURY, SETM, 100_000),
			(TREASURY, SETUSD, 100_000),
			(TREASURY, DOT, 100_000),
			(TREASURY, TEST, 100_000),
		])
	}

	pub fn build(self) -> sp_io::TestExternalities {
		let mut t = frame_system::GenesisConfig::default()
			.build_storage::<Runtime>()
			.unwrap();

		orml_tokens::GenesisConfig::<Runtime> {
			balances: self
				.balances
				.into_iter()
				.collect::<Vec<_>>(),
		}
		.assimilate_storage(&mut t)
		.unwrap();

		t.into()
	}
}
