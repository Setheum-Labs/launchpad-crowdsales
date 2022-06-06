import React, { useCallback, useState } from 'react'
import { Card, Grid, Button, Message } from 'semantic-ui-react'
import { getSigner, getApiProvider } from './utils';

const ProposalCard = props => {
  const { api } = getApiProvider();
  const signer = getSigner();
//   const proposals = api.rpc.launchPad.proposals();
  const { proposal } = props
  
  const { 
      id = null,
      origin = null,
      beneficiary = null,
      pool = null,
      raiseCurrency = null,
      saleToken = null,
      tokenPrice = null,
      crowdAllocation = null,
      goal = null,
      raised = null,
      contributorsCount = null,
      contributions = null,
      period = null,
      campaignStart = null,
      campaignEnd = null,
      campaignRetirementPeriod = null,
      proposalRetirementPeriod = null,
      isApproved = null,
      isRejected = null,
      isWaiting = null,
      isActive = null,
      isSuccessful = null,
      isFailed = null,
      isEnded = null,
      isClaimed = null
    } = proposal
  const [isSubmitting, setIsSubmitting] = useState(false);

  const approveProposal = useCallback(async (id) => {
    if (api && signer) {
      setIsSubmitting(true);
      try {
        const extrinsic = api.tx.launchPad.approveProposal(id);

        await extrinsic.signAndSend(signer);

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
  }, [api, signer]);

  const rejectProposal = useCallback(async (id) => {
    if (api && signer) {
      setIsSubmitting(true);
      try {
        const extrinsic = api.tx.launchPad.rejectProposal(id);

        await extrinsic.signAndSend(signer);

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
  }, [api, signer]);


  return (
      <Card>
          <Card.Content>
             <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>

             </Card.Meta>
             <Card.Description>
                <p style={{ overflowWrap: 'break-word' }}>Campaign ID: {id}</p>
                <p style={{ overflowWrap: 'break-word' }}>Sale Token: {saleToken}</p>
                <p style={{ overflowWrap: 'break-word' }}>Raise Token: {raiseCurrency}</p>
                <p style={{ overflowWrap: 'break-word' }}>Token Price: {tokenPrice}</p>
                <p style={{ overflowWrap: 'break-word' }}>Crowd Allocation: {crowdAllocation}</p>
                <p style={{ overflowWrap: 'break-word' }}>Raise Goal: {goal}</p>
                <p style={{ overflowWrap: 'break-word' }}>Raised Amount: {raised}</p>
                <p style={{ overflowWrap: 'break-word' }}>Campaign Creator: {origin}</p>
                <p style={{ overflowWrap: 'break-word' }}>Campaign Beneficiary: {beneficiary}</p>
                <p style={{ overflowWrap: 'break-word' }}>Campaign Pool: {pool}</p>
                <p style={{ overflowWrap: 'break-word' }}>Contributors: {contributorsCount}</p>
                <p style={{ overflowWrap: 'break-word' }}>Contributions: {contributions}</p>
                <p style={{ overflowWrap: 'break-word' }}>Period: {period}</p>
                <p style={{ overflowWrap: 'break-word' }}>Start: {campaignStart}</p>
                <p style={{ overflowWrap: 'break-word' }}>End: {campaignEnd}</p>
                <p style={{ overflowWrap: 'break-word' }}>Campaign Retirement Period: {campaignRetirementPeriod}</p>
                <p style={{ overflowWrap: 'break-word' }}>Proposal Retirement Period: {proposalRetirementPeriod}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Approved?: {isApproved}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Rejected?: {isRejected}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Waiting?: {isWaiting}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Active?: {isActive}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Successful?: {isSuccessful}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Failed?: {isFailed}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Ended?: {isEnded}</p>
                <p style={{ overflowWrap: 'break-word' }}>Is Claimed?: {isClaimed}</p>
             </Card.Description>
          </Card.Content>
          <Card.Content extra style={{ textAlign: 'center' }}>
            <Button.Group>
              <Button negative compact size="tiny" onClick={rejectProposal(id)} disabled = {isSubmitting}>Reject</Button>
              <Button.Or />
              <Button positive compact size="tiny" onClick={approveProposal(id)} disabled = {isSubmitting}>Approve</Button>
            </Button.Group>
          </Card.Content>
      </Card>
  )
}

const ProposalCards = props => {
    const { proposals } = props
  
    if (proposals.length === 0) {
      return (
        <Message info>
          <Message.Header>
            No proposals found... Make a Proposal first!&nbsp;
          </Message.Header>
        </Message>
      )
    }
  
    return (
      <Grid columns={3}>
        {proposals.map((proposal, i) => (
          <Grid.Column key={`proposal-${i}`}>
            <ProposalCard proposal={proposal} />
          </Grid.Column>
        ))}
      </Grid>
    )
  }
  
export default ProposalCards