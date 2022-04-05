// بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

// This file is part of Setheum.

// Copyright (C) 2019-2021 Setheum Labs.
// SPDX-License-Identifier: GPL-3.0-or-later WITH Classpath-exception-2.0

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

//! Autogenerated weights for launchpad_crowdsales
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-04-05, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("dev"), DB CACHE: 128

// Executed Command:
// target/release/setheum-node
// benchmark
// --chain=dev
// --steps=50
// --repeat=20
// --pallet=launchpad_crowdsales
// --extrinsic=*
// --execution=wasm
// --wasm-execution=compiled
// --heap-pages=4096
// --template=./templates/orml-weight-template.hbs
// --output=../pallet/src/weights.rs


#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]
#![allow(clippy::unnecessary_cast)]

use frame_support::{traits::Get, weights::{Weight, constants::RocksDbWeight}};
use sp_std::marker::PhantomData;

/// Weight functions needed for launchpad_crowdsales.
pub trait WeightInfo {
	fn on_initialize(n: u32, ) -> Weight;
	fn make_proposal() -> Weight;
	fn contribute() -> Weight;
	fn claim_contribution_allocation() -> Weight;
	fn claim_campaign_fundraise() -> Weight;
	fn approve_proposal() -> Weight;
	fn reject_proposal() -> Weight;
	fn activate_waiting_campaign() -> Weight;
}

/// Default weights.
impl WeightInfo for () {
	fn on_initialize(_n: u32, ) -> Weight {
		(16_313_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(2 as Weight))
	}
	fn make_proposal() -> Weight {
		(174_680_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(6 as Weight))
			.saturating_add(RocksDbWeight::get().writes(7 as Weight))
	}
	fn contribute() -> Weight {
		(125_216_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(4 as Weight))
			.saturating_add(RocksDbWeight::get().writes(4 as Weight))
	}
	fn claim_contribution_allocation() -> Weight {
		(119_890_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(4 as Weight))
			.saturating_add(RocksDbWeight::get().writes(3 as Weight))
	}
	fn claim_campaign_fundraise() -> Weight {
		(38_276_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(1 as Weight))
	}
	fn approve_proposal() -> Weight {
		(47_382_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(2 as Weight))
			.saturating_add(RocksDbWeight::get().writes(3 as Weight))
	}
	fn reject_proposal() -> Weight {
		(37_680_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(1 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
	fn activate_waiting_campaign() -> Weight {
		(35_408_000 as Weight)
			.saturating_add(RocksDbWeight::get().reads(1 as Weight))
			.saturating_add(RocksDbWeight::get().writes(1 as Weight))
	}
}