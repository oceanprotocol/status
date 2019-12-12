import React from 'react'
import styles from './index.module.css'
import Status from './Status'

export interface NetworkProps {
  name: string
  project?: string
  networkId: string
  chainId?: string
  type: string
  rpcUrl?: string
  explorerUrl?: string
}

export default function Network({ network }: { network: NetworkProps }) {
  return (
    <div className={styles.network}>
      <header className={styles.networkHeader}>
        <h2 className={styles.title}>
          {network.name}
          <code>{network.networkId}</code>
          <span>{network.type}</span>
        </h2>
        <p>
          <code>{network.rpcUrl}</code>
        </p>
      </header>

      <Status network={network} />
    </div>
  )
}
