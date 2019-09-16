import React from 'react'
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo-white.svg'
import './App.scss'
import networks from './networks.json'
import Network from './Network'

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <Logo />
        <h1>Ocean Protocol Status</h1>
        <p>
          Testing all RPC network connections from your browser, refreshed every
          5 sec.
        </p>
      </header>

      <div className="networks">
        {networks.map((network, i) => (
          <Network key={i} network={network} />
        ))}
      </div>
    </div>
  )
}
