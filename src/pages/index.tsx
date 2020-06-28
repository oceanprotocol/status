import React from 'react'
import atlas from '@ethereum-navigator/atlas'
import Logo from '@oceanprotocol/art/logo/logo-white.svg'
import Layout from '../Layout'
import Network, { NetworkProps } from '../components/Network'
import styles from './index.module.css'
import { title, description } from '../../site.config'

export default function Home() {
  return (
    <Layout>
      <header className={styles.header}>
        <Logo />
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <div className={styles.networks}>
        {atlas
          .filter(
            (item: NetworkProps) =>
              item.project === 'Ocean Protocol' &&
              item.name !== 'Spree' &&
              item.name !== 'Duero'
          )
          .reverse()
          .map((network: NetworkProps) => (
            <Network key={network.name} network={network} />
          ))}
      </div>
    </Layout>
  )
}
