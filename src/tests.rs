// //! Unit tests for the Launchpad Crowdsales Pallet.

#![cfg(test)]

use super::*;
use frame_support::{assert_noop, assert_ok};
use mock::*;

#[test]
fn proposal_info_works() {
	ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            assert_eq!(Tokens::free_balance(SETM, &BOB), 100_000);
            assert_ok!(LaunchPad::new_proposal(
                ALICE,
                "Project Name".as_bytes().to_vec(),
                "Project Logo".as_bytes().to_vec(),
                "Project Description".as_bytes().to_vec(),
                "Project Website".as_bytes().to_vec(),
                BOB,
                SETUSD,
                TEST,
                10,
                10_000,
                100_000,
                20
            ));
            assert_eq!(Tokens::free_balance(TEST, &BOB), 100000);
            assert_eq!(Tokens::locks(&BOB, SETM).len(), 0);
            assert_eq!(Tokens::locks(&BOB, SETUSD).len(), 0);
            // assert_eq!(Tokens::locks(&BOB, TEST)[1].amount, 10_000);
            
        });
}
