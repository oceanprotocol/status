import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

function renderToDOM() {
  const rootElement = document.getElementById('root')

  if (rootElement !== null) {
    ReactDOM.render(<App />, rootElement)
  }
}

export { renderToDOM }

renderToDOM()

serviceWorker.register()
