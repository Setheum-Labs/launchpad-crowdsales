//! LaunchPad Crowdsales RPC module
//!
use std::sync::Arc;

use codec::Codec;
use jsonrpc_core::{Error as RpcError, ErrorCode, Result};
use jsonrpc_derive::rpc;
use sp_api::ProvideRuntimeApi;
use sp_blockchain::HeaderBackend;
use sp_runtime::{generic::BlockId, traits::Block as BlockT};
use sp_runtime::traits::MaybeDisplay;

use primitives::CampaignInfo;

pub use self::gen_client::Client as LaunchPadClient;
pub use launchpad_crowdsales_rpc_runtime_api::LaunchPadApi as LaunchPadRuntimeApi;

#[rpc]
pub trait LaunchPadApi<BlockHash, ResponseType> {
	#[rpc(name = "launchPad_getProposals")]
	fn get_proposals(&self, at: Option<BlockHash>) -> Result<ResponseType>;
	#[rpc(name = "launchPad_getCampaigns")]
	fn get_campaigns(&self, at: Option<BlockHash>) -> Result<ResponseType>;
}

/// A struct that implements the [`LaunchPadApi`].
pub struct LaunchPad<C, B> {
	client: Arc<C>,
	_marker: std::marker::PhantomData<B>,
}

impl<C, B> LaunchPad<C, B> {
	/// Create new `LaunchPad` with the given reference to the client.
	pub fn new(client: Arc<C>) -> Self {
		LaunchPad {
			client,
			_marker: Default::default(),
		}
	}
}

pub enum Error {
	RuntimeError,
}

impl From<Error> for i64 {
	fn from(e: Error) -> i64 {
		match e {
			Error::RuntimeError => 1,
		}
	}
}

impl<C, Block, AccountId, Balance, BlockNumber> LaunchPadApi<<Block as BlockT>::Hash, Vec<CampaignInfo<AccountId, Balance, BlockNumber>>> for LaunchPad<C, Block>
where
	Block: BlockT,
	C: Send + Sync + 'static + ProvideRuntimeApi<Block> + HeaderBackend<Block>,
	C::Api: LaunchPadRuntimeApi<Block, AccountId, Balance, BlockNumber>,
	AccountId: Clone + Codec + MaybeDisplay + Ord,
	Balance: Clone + Codec + MaybeDisplay,
	BlockNumber: Clone + Codec + MaybeDisplay,
{
	fn get_proposals(
		&self, at: Option<<Block as BlockT>::Hash>
	) -> Result<Vec<CampaignInfo<AccountId, Balance, BlockNumber>>> {
		let api = self.client.runtime_api();
		let at = BlockId::hash(at.unwrap_or(
			// If the block hash is not supplied assume the best block.
			self.client.info().best_hash,
		));
		api.get_proposals(&at).map_err(|e| RpcError {
			code: ErrorCode::ServerError(Error::RuntimeError.into()),
			message: "Unable to get proposals.".into(),
			data: Some(format!("{:?}", e).into()),
		})
	}

	fn get_campaigns(
		&self, at: Option<<Block as BlockT>::Hash>
	) -> Result<Vec<CampaignInfo<AccountId, Balance, BlockNumber>>> {
		let api = self.client.runtime_api();
		let at = BlockId::hash(at.unwrap_or(
			// If the block hash is not supplied assume the best block.
			self.client.info().best_hash,
		));
		api.get_campaigns(&at).map_err(|e| RpcError {
			code: ErrorCode::ServerError(Error::RuntimeError.into()),
			message: "Unable to get campaigns.".into(),
			data: Some(format!("{:?}", e).into()),
		})
	}
}
