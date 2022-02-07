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
            assert_ok!(LaunchPad::make_proposal(
                Origin::signed(ALICE),
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
            assert_eq!(
                LaunchPad::proposal_info(0),
                Some(CampaignInfo {
                    id: 0,
                    origin: ALICE,
                    project_name: "Project Name".as_bytes().to_vec(),
                    project_logo: "Project Logo".as_bytes().to_vec(),
                    project_description: "Project Description".as_bytes().to_vec(),
                    project_website: "Project Website".as_bytes().to_vec(),
                    beneficiary: BOB,
                    pool: LaunchPad::campaign_pool(0),
                    raise_currency: SETUSD,
                    sale_token: TEST,
                    token_price: 10,
                    crowd_allocation: 10_000,
                    goal: 100_000,
                    raised: 0,
                    contributors_count: 0,
                    contributions: vec![],
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
                })
            );
        });
}

#[test]
fn make_proposal_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            assert_ok!(LaunchPad::make_proposal(
                Origin::signed(ALICE),
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
        });
}

#[test]
fn all_proposals_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            assert_eq!(LaunchPad::all_proposals(), vec![]);

            assert_ok!(LaunchPad::make_proposal(
                Origin::signed(ALICE),
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
            assert_ok!(LaunchPad::make_proposal(
                Origin::signed(ALICE),
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
            assert_eq!(LaunchPad::all_proposals(), 
            vec![
                CampaignInfo {
                    id: 0,
                    origin: ALICE,
                    project_name: "Project Name".as_bytes().to_vec(),
                    project_logo: "Project Logo".as_bytes().to_vec(),
                    project_description: "Project Description".as_bytes().to_vec(),
                    project_website: "Project.Website".as_bytes().to_vec(),
                    beneficiary: BOB,
                    pool: LaunchPad::campaign_pool(0),
                    raise_currency: SETUSD,
                    sale_token: TEST,
                    token_price: 10,
                    crowd_allocation: 10_000,
                    goal: 100_000,
                    raised: 0,
                    contributors_count: 0,
                    contributions: vec![],
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
                },
                CampaignInfo {
                    id: 1,
                    origin: ALICE,
                    project_name: "Project Name".as_bytes().to_vec(),
                    project_logo: "Project Logo".as_bytes().to_vec(),
                    project_description: "Project Description".as_bytes().to_vec(),
                    project_website: "Project.Website".as_bytes().to_vec(),
                    beneficiary: BOB,
                    pool: LaunchPad::campaign_pool(1),
                    raise_currency: SETUSD,
                    sale_token: TEST,
                    token_price: 10,
                    crowd_allocation: 10_000,
                    goal: 100_000,
                    raised: 0,
                    contributors_count: 0,
                    contributions: vec![],
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
                },
            ]
        );
        });
}
