import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './utils'

// import Balances from './Balances'
import Campaigns from './Campaigns'
import Proposals from './Proposals'
import Events from './Events'

  function Main() {
    const { apiState, apiError, keyringState } = useSubstrateState()
  
    const loader = text => (
      <Dimmer active>
        <Loader size="small">{text}</Loader>
      </Dimmer>
    )
  
    const message = errObj => (
      <Grid centered columns={2} padded>
        <Grid.Column>
          <Message
            negative
            compact
            floating
            header="Error Connecting to Substrate"
            content={`Connection to websocket '${errObj.target.url}' failed.`}
          />
        </Grid.Column>
      </Grid>
    )
  
    if (apiState === 'ERROR') return message(apiError)
    else if (apiState !== 'READY') return loader('Connecting to Substrate')
  
    if (keyringState !== 'READY') {
      return loader(
        "Loading accounts (please review any extension's authorization)"
      )
    }
  
    const contextRef = createRef()
  
  return (
    <div ref={contextRef}>
      <Container>
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <Proposals />
          </Grid.Row>
          <Grid.Row stretched>
            <Campaigns />
          </Grid.Row>
          {/* <Grid.Row stretched>
            <Balances />
          </Grid.Row> */}
          <Grid.Row>
            <Events />
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
