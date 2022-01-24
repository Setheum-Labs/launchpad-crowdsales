//! Unit tests for the Launchpad Crowdsales Pallet.

#![cfg(test)]

use crate::mock::*;
use frame_support::assert_ok;

#[test]
fn set_dummy_work() {
	new_test_ext().execute_with(|| {
		assert_eq!(Example::dummy(), None);
		assert_ok!(Example::set_dummy(Origin::root(), 20));
		assert_eq!(Example::dummy(), Some(20));
		System::assert_last_event(Event::Example(crate::Event::Dummy(20)));
	});
}

#[test]
fn do_set_bar_work() {
	new_test_ext().execute_with(|| {
		assert_eq!(Example::bar(2), 200);
		Example::do_set_bar(&2, 10);
		assert_eq!(Example::bar(2), 10);
	});
}
