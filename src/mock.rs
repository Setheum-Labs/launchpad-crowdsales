//! Mocks for the Launchpad Crowdsales Pallet.

#![cfg(test)]

use super::*;
use frame_support::{construct_runtime, ord_parameter_types, parameter_types};
use frame_system::EnsureSignedBy;
use orml_traits::parameter_type_with_key;
use sp_core::H256;
use sp_runtime::{
	testing::Header, AccountId32,
	traits::{IdentityLookup},
};

pub type AccountId = AccId;
pub type BlockNumber = u64;
pub type CurrencyId = u64;
pub type CurrencyId = u64;

// The network Treasury account.
pub const TREASURY: AccountId = AccountId32::new([0u8; 32]);
// Mock accounts.
pub const ALICE: AccountId = AccountId32::new([1u8; 32]);
pub const BOB: AccountId = AccountId32::new([2u8; 32]);
pub const CHARLIE: AccountId = AccountId32::new([3u8; 32]);
pub const DAVE: AccountId = AccountId32::new([4u8; 32]);
pub const EVE: AccountId = AccountId32::new([5u8; 32]);
pub const FRED: AccountId = AccountId32::new([6u8; 32]);
pub const GREG: AccountId = AccountId32::new([7u8; 32]);
pub const HANA: AccountId = AccountId32::new([8u8; 32]);
pub const IGOR: AccountId = AccountId32::new([9u8; 32]);
pub const JOHN: AccountId = AccountId32::new([10u8; 32]);

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

parameter_types! {
	pub const GetNativeCurrencyId: CurrencyId = SETM;  // Setheum native currency ticker is SETM/
	pub const CrowdsalesPalletId: PalletId = PalletId(*b"set/drop");
}

ord_parameter_types! {
	pub const TreasuryAccount: AccountId = TREASURY;
	pub const Eleven: AccountId = AccountId32::new([11u8; 32]);
}
impl Config for Runtime {
	type Event = Event;
	type MultiCurrency = Tokens;
	type GetNativeCurrencyId = GetNativeCurrencyId;
	type Crowdsales = Crowdsales;
	type UpdateOrigin = EnsureSignedBy<Eleven, AccountId>;
	type PalletId = CrowdsalesPalletId;
}

pub type Block = sp_runtime::generic::Block<Header, UncheckedExtrinsic>;
pub type UncheckedExtrinsic = sp_runtime::generic::UncheckedExtrinsic<u32, Call, u32, ()>;

construct_runtime!(
	pub enum Runtime where
		Block = Block,
		NodeBlock = Block,
		UncheckedExtrinsic = UncheckedExtrinsic
	{
		System: frame_system::{Pallet, Storage, Call, Config, Event<T>},
		Crowdsales: crowdsales::{Pallet, Storage, Call, Event<T>},
		Tokens: orml_tokens::{Pallet, Storage, Call, Event<T>},
	}
);

pub struct ExtBuilder {
	_balances: Vec<(AccountId, CurrencyId, Balance)>,
}

impl Default for ExtBuilder {
	fn default() -> Self {
		Self {
			_balances: vec![
				(ALICE, DOT, 100_000),
				(ALICE, TEST, 10_000_000),
				(BOB, DOT, 100_000),
				(BOB, TEST, 1_000_000),
				(CHARLIE, SETUSD, 100_000),
				(DAVE, SETUSD, 100_000),
				(EVE, SETUSD, 100_000),
				(FRED, SETUSD, 100_000),
				(GREG, SETUSD, 100_000),
				(HANA, SETUSD, 100_000),
				(IGOR, SETUSD, 100_000),
				(JOHN, SETUSD, 100_000),
				(TREASURY, DOT, 100_000),
				(TREASURY, SETUSD, 100_000),
			],
		}
	}
}
