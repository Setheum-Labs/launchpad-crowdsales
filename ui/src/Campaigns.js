// import React, { useEffect, useState } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
// import { Grid } from 'semantic-ui-react'
import { Grid, Button } from 'semantic-ui-react'
import { getSigner, getApiProvider } from './utils';
import { Keyring } from "@polkadot/keyring";

import CampaignCards from './CampaignCards'

const parseCampaign = ({
    id, origin, beneficiary, pool, raiseCurrency, saleToken, tokenPrice,
    crowdAllocation, goal, raised, contributorsCount, contributions,
    period, campaignStart, campaignEnd, campaignRetirementPeriod,
    proposalRetirementPeriod, isApproved, isRejected, isWaiting,
    isActive, isSuccessful, isFailed, isEnded, isClaimed
}) => ({
    id: id.toJSON(),
    origin: origin.toJSON(),
    beneficiary: beneficiary.toJSON(),
    pool: pool.toJSON(),
    raiseCurrency: raiseCurrency.toJSON(),
    saleToken: saleToken.toJSON(),
    tokenPrice: tokenPrice.toJSON(),
    crowdAllocation: crowdAllocation.toJSON(),
    goal: goal.toJSON(),
    raised: raised.toJSON(),
    contributorsCount: contributorsCount.toJSON(),
    contributions: contributions.toJSON(),
    period: period.toJSON(),
    campaignStart: campaignStart.toJSON(),
    campaignEnd: campaignEnd.toJSON(),
    campaignRetirementPeriod: campaignRetirementPeriod.toJSON(),
    proposalRetirementPeriod: proposalRetirementPeriod.toJSON(),
    isApproved: isApproved.toJSON(),
    isRejected: isRejected.toJSON(),
    isWaiting: isWaiting.toJSON(),
    isActive: isActive.toJSON(),
    isSuccessful: isSuccessful.toJSON(),
    isFailed: isFailed.toJSON(),
    isEnded: isEnded.toJSON(),
    isClaimed: isClaimed.toJSON()
})

export default function Campaigns(props) {
  const { api } = getApiProvider()
  const signer = getSigner();
  const [campaignIds, setCampaignIds] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [status] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribeCount = () => {
    let unsub = null

    const asyncFetch = async () => {
      unsub = await api.query.launchpadCrowdsales.campaignsCount(async count => {
        // Fetch campaigns keys
        const entries = await api.query.launchpadCrowdsales.campaigns.entries()
        const ids = entries.map(entry => entry[1].unwrap().dna)
        setCampaignIds(ids)
      })
    }

    asyncFetch()

    return () => {
      unsub && unsub()
    }
  }
  
  const subscribeCampaigns = () => {
    let unsub = null

    const asyncFetch = async () => {
      unsub = await api.query.launchpadCrowdsales.campaigns.multi(
        campaignIds,
        campaigns => {
          const campaignsMap = campaigns.map(campaign => parseCampaign(campaign.unwrap()))
          setCampaigns(campaignsMap)
        }
      )
    }

    asyncFetch()

    return () => {
      unsub && unsub()
    }
  }

  useEffect(subscribeCount, [api, signer])
  useEffect(subscribeCampaigns, [api, signer, campaignIds])

  const makeProposal = useCallback(async () => {
    const { api } = getApiProvider();
    if (api && signer) {
      setIsSubmitting(true);
      const keyring = new Keyring({ type: "sr25519" });
      const bob = keyring.addFromUri('//Bob');
      try {
        const extrinsic = api.tx.launchPad.makeProposal(
          bob.address,
          {
            Token: "SERP",
          },
          {
            Token: "SETM",
          },
          10 * 10 ** 18,
          100 * 10 ** 18,
          1000 * 10 ** 18,
          20
        );

        // await extrinsic.signAndSend(signer);

        const hash = await extrinsic.signAndSend(signer);

        console.log("Extrinsic hash:", hash.toHuman());

        await new Promise((resolve, reject) => {
          extrinsic.send((result) => {
            if (result.status.isFinalized || result.status.isInBlock) {
              result.events
                .filter(({ event: { section } }) => section === "system")
                .forEach((event) => {
                  const {
                    event: { data, method },
                  } = event;

                  if (method === "ExtrinsicFailed") {
                    const [dispatchError] = data;

                    let message = dispatchError.type;

                    if (dispatchError.isModule) {
                      try {
                        const mod = dispatchError.asModule;
                        const error = api.registry.findMetaError(
                          new Uint8Array([
                            mod.index.toNumber(),
                            mod.error.toNumber(),
                          ])
                        );
                        message = `${error.section}.${error.name}`;
                      } catch (error) {
                        // swallow
                      }
                    }

                    reject({ message, result });
                  } else if (method === "ExtrinsicSuccess") {
                    resolve({ result });
                  }
                });
            } else if (result.isError) {
              reject({ result });
            }
          });
        });

        alert("Success");
      } catch (error) {
        if (error.message) {
          alert(`Failed, ${error.message}`);
        } else {
          alert(`Failed`);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [
    api, signer
  ]);

  return (
    <Grid.Column width={19}>
      <h1>Campaigns</h1>
      <CampaignCards campaigns={campaigns} />
      <Button positive onClick={makeProposal}  disabled = {isSubmitting}>Make Proposal</Button>
      <div style={{ overflowWrap: 'break-word' }}>{status}</div>
    </Grid.Column>
  )
}
