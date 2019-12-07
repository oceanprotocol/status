import React from 'react'
import App from 'next/app'

import '@oceanprotocol/typographies/css/ocean-typo.css'
import '../styles/global.css'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
