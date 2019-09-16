import React from 'react'
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo-white.svg'
import styles from './App.module.scss'
import atlas from '@ethereum-navigator/atlas'
import Network from './Network'

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo />
        <h1>Ocean Protocol Status</h1>
        <p>
          Testing all RPC network connections from your browser, refreshed every
          5 sec.
        </p>
      </header>

      <div className={styles.networks}>
        {atlas
          .filter(
            item => item.project === 'Ocean Protocol' && item.name !== 'Spree'
          )
          .reverse()
          .map((network, i) => (
            <Network key={i} network={network} />
          ))}
      </div>
    </div>
  )
}
