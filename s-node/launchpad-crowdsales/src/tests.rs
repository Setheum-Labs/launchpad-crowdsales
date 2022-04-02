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
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
                project_name: "Project Name".as_bytes().to_vec(),
                project_logo: "Project Logo".as_bytes().to_vec(),
                project_description: "Project Description".as_bytes().to_vec(),
                project_website: "project.website".as_bytes().to_vec(),
                beneficiary: BOB,
                pool: LaunchPad::campaign_pool(0),
                raise_currency: SETUSD,
                sale_token: TEST,
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
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_eq!(
                LaunchPad::proposal_info(0),
                Some(CampaignInfo {
                    id:0,
                    origin: ALICE,
                    project_name: "Project Name".as_bytes().to_vec(),
                    project_logo: "Project Logo".as_bytes().to_vec(),
                    project_description: "Project Description".as_bytes().to_vec(),
                    project_website: "project.website".as_bytes().to_vec(),
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
            )
        });
}

#[test]
fn campaign_info_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
                project_name: "Project Name".as_bytes().to_vec(),
                project_logo: "Project Logo".as_bytes().to_vec(),
                project_description: "Project Description".as_bytes().to_vec(),
                project_website: "project.website".as_bytes().to_vec(),
                beneficiary: BOB,
                pool: LaunchPad::campaign_pool(0),
                raise_currency: SETUSD,
                sale_token: TEST,
                token_price: 10,
                crowd_allocation: 10_000,
                goal: 100_000,
                raised: 0,
                contributors_count: 0,
                contributions: Vec::new(),
                period: 20,
                campaign_start: 20,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            LaunchPad::on_initialize(23);
            assert_eq!(
                LaunchPad::campaign_info(0),
                Some(CampaignInfo {
                    id:0,
                    origin: ALICE,
                    project_name: "Project Name".as_bytes().to_vec(),
                    project_logo: "Project Logo".as_bytes().to_vec(),
                    project_description: "Project Description".as_bytes().to_vec(),
                    project_website: "project.website".as_bytes().to_vec(),
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
                    campaign_start: 20,
                    campaign_end: 40,
                    campaign_retirement_period: 0,
                    proposal_retirement_period: 0,
                    is_approved: true,
                    is_rejected: false,
                    is_waiting: false,
                    is_active: true,
                    is_successful: false,
                    is_failed: false,
                    is_ended: false,
                    is_claimed: false,
                })
            )
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
fn make_proposal_does_not_work() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            assert_noop!(
                LaunchPad::make_proposal(
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
                    0
                ),
                Error::<Runtime>::ZeroPeriod
            );
            assert_noop!(
                LaunchPad::make_proposal(
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
                    21
                ),
                Error::<Runtime>::MaxActivePeriodExceeded
            );
            assert_noop!(
                LaunchPad::make_proposal(
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
                    99,
                    20
                ),
                Error::<Runtime>::GoalBelowMinimumRaise
            );
        });
}

#[test]
fn contribute_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                10_000
            ));

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                10_000
            ));
            assert_noop!(
                LaunchPad::contribute(
                    Origin::signed(BOB),
                    0,
                    10
                ),
                Error::<Runtime>::ContributionTooSmall
            );
            assert_noop!(
                LaunchPad::contribute(
                    Origin::signed(BOB),
                    0,
                    100_001
                ),
                Error::<Runtime>::ContributionCurrencyNotEnough
            );
        });
}

#[test]
fn contribute_does_not_work() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );

            assert_noop!(
                LaunchPad::contribute(
                    Origin::signed(BOB),
                    0,
                    10
                ),
                Error::<Runtime>::CampaignNotFound
            );
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            assert_noop!(
                LaunchPad::contribute(
                    Origin::signed(BOB),
                    0,
                    10_000
                ),
                Error::<Runtime>::CampaignNotActive
            );
        });
}

#[test]
fn claim_contribution_allocation_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                50_000
            ));

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                50_000
            ));
           
            LaunchPad::on_initialize(41);
            System::set_block_number(41);
            assert_ok!(LaunchPad::claim_contribution_allocation(
                Origin::signed(BOB),
                0,
            ));
        });
}

#[test]
fn claim_contribution_allocation_does_not_work() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            LaunchPad::on_initialize(23);
            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                10_000
            ));

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                10_000
            ));

            assert_noop!(
                LaunchPad::claim_contribution_allocation(
                    Origin::signed(BOB),
                    0,
                ),
                Error::<Runtime>::CampaignFailed
            );
        });
}

#[test]
fn claim_campaign_fundraise_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                50_000
            ));

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                50_000
            ));
           
            LaunchPad::on_initialize(41);
            System::set_block_number(41);
            assert_ok!(LaunchPad::claim_campaign_fundraise(
                Origin::signed(ALICE),
                0,
            ));
        });
}

#[test]
fn claim_campaign_fundraise_does_not_work() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            LaunchPad::on_initialize(23);
            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                10_000
            ));

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                10_000
            ));

            assert_noop!(
                LaunchPad::claim_campaign_fundraise(
                    Origin::signed(ALICE),
                    0,
                ),
                Error::<Runtime>::CampaignStillActive
            );

            LaunchPad::on_initialize(41);
            System::set_block_number(41);

            assert_ok!(LaunchPad::claim_campaign_fundraise(
                Origin::signed(ALICE),
                0,
            ));
            
            assert_noop!(
                LaunchPad::claim_campaign_fundraise(
                    Origin::signed(CHARLIE),
                    0,
                ),
                Error::<Runtime>::WrongOrigin
            );
        });
}

#[test]
fn claim_campaign_fundraise_does_not_work_already_claimed() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                is_claimed: true,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            LaunchPad::on_initialize(23);
            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                10_000
            ));

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                10_000
            ));

            LaunchPad::on_initialize(41);
            System::set_block_number(41);

            assert_noop!(
                LaunchPad::claim_campaign_fundraise(
                    Origin::signed(BOB),
                    0,
                ),
                Error::<Runtime>::CampaignAlreadyClaimed
            );
        });
}

#[test]
fn approve_proposal_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                10_000
            ));
        });
}

#[test]
fn approve_proposal_does_not_work() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: true,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_noop!(
                LaunchPad::approve_proposal(
                    Origin::signed(11),
                    0,
                ),
                Error::<Runtime>::ProposalAlreadyApproved
            );
            assert_noop!(
                LaunchPad::approve_proposal(
                    Origin::signed(11),
                    1,
                ),
                Error::<Runtime>::ProposalNotFound
            );
        });
}

#[test]
fn reject_proposal_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::reject_proposal(
                Origin::signed(11),
                0,
            ));
        });
}

#[test]
fn reject_proposal_does_not_work() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: true,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_noop!(
                LaunchPad::reject_proposal(
                    Origin::signed(11),
                    0,
                ),
                Error::<Runtime>::ProposalAlreadyApproved
            );
            assert_noop!(
                LaunchPad::reject_proposal(
                    Origin::signed(11),
                    1,
                ),
                Error::<Runtime>::ProposalNotFound
            );
        });
}

#[test]
fn get_contributors_count_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            let proposal = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let proposal_id = 0;
            <Proposals<Runtime>>::insert(proposal_id, proposal.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(proposal_id),
                "Proposal should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                10_000
            ));
            assert_ok!(LaunchPad::contribute(
                Origin::signed(BOB),
                0,
                10_000
            ));
            assert_ok!(LaunchPad::contribute(
                Origin::signed(CHARLIE),
                0,
                10_000
            ));
            
            assert_eq!(LaunchPad::get_contributors_count(0), 3);
        });
}

#[test]
fn get_total_amounts_raised_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            assert_eq!(
                LaunchPad::get_total_amounts_raised(),
                vec![]
            );
            let campaign = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let campaign_id = 0;
            <Proposals<Runtime>>::insert(campaign_id, campaign.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(campaign_id),
                "Campaign should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                50_000
            ));

            LaunchPad::on_initialize(40);

            assert_ok!(LaunchPad::on_successful_campaign(<frame_system::Pallet<Runtime>>::block_number(), campaign_id));
            assert_eq!(
                LaunchPad::get_total_amounts_raised(),
                vec![
                    (SETUSD, 50000),
                ]
            );
        });
}

#[test]
fn on_retire_works() {
    ExtBuilder::default()
        .one_hundred_thousand_for_all()
        .build()
        .execute_with(|| {
            assert_eq!(
                LaunchPad::get_total_amounts_raised(),
                vec![]
            );
            let campaign = CampaignInfo {
                id: 0,
                origin: ALICE.clone(),
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
                contributions: Vec::new(),
                period: 20,
                campaign_start: 21,
                campaign_end: 0,
                campaign_retirement_period: 0,
                proposal_retirement_period: 0,
                is_approved: false,
                is_rejected: false,
                is_waiting: true,
                is_active: true,
                is_successful: false,
                is_failed: false,
                is_ended: false,
                is_claimed: false,
            };
            let campaign_id = 0;
            <Proposals<Runtime>>::insert(campaign_id, campaign.clone());
            assert!(
                <Proposals<Runtime>>::contains_key(campaign_id),
                "Campaign should be in storage"
            );
            
            assert_ok!(LaunchPad::approve_proposal(
                Origin::signed(11),
                0,
            ));
            
            LaunchPad::on_initialize(21);

            assert_ok!(LaunchPad::contribute(
                Origin::signed(ALICE),
                0,
                50_000
            ));

            LaunchPad::on_initialize(60);

            assert_ok!(LaunchPad::on_retire(campaign_id));
        });
}
