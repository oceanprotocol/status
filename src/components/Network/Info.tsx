import React from 'react'
import styles from './Info.module.css'

export default function Info({
  gasPrice,
  gasLimit,
  clientVersion,
  peers
}: {
  gasPrice: string
  gasLimit: string
  clientVersion: string
  peers: number
}) {
  return (
    <div className={styles.moreInfo}>
      {peers && (
        <p>
          Connected Peers <span>{peers}</span>
        </p>
      )}
      {gasLimit && (
        <p>
          Gas Limit <span>{gasLimit} gas</span>
        </p>
      )}
      {gasPrice && (
        <p>
          Gas Prize <span>{gasPrice} Gwei</span>
        </p>
      )}
      {clientVersion && <p className={styles.clientVersion}>{clientVersion}</p>}
    </div>
  )
}
