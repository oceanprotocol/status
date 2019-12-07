[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">status</h1>

> 🐚 Overview and status checks of all Ocean Protocol RPC network connections. https://status.oceanprotocol.com

[![Build Status](https://travis-ci.com/oceanprotocol/status.svg?branch=master)](https://travis-ci.com/oceanprotocol/status)
[![Maintainability](https://api.codeclimate.com/v1/badges/ed14f83f8328dec5da11/maintainability)](https://codeclimate.com/github/oceanprotocol/status/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ed14f83f8328dec5da11/test_coverage)](https://codeclimate.com/github/oceanprotocol/status/test_coverage)

<a href="https://status.oceanprotocol.com"><img width="1373" alt="Status Interface" src="https://user-images.githubusercontent.com/90316/64959471-7ff30000-d891-11e9-84be-96151bb7ea2d.png"></a>

- [🦑 Features](#-features)
- [🏄 Get Started](#-get-started)
- [👩‍🔬 Testing](#-testing)
- [✨ Code Style](#-code-style)
- [🎁 Contributing](#-contributing)
- [🏛 License](#-license)

## 🦑 Features

- Fetches and displays information for each of Ocean's remote RPC endpoints
  - online/offline status
  - current block number
  - response time
- current block number is linked to respective explorer
- automatically refetch all data every 5 sec.
- Gets network metadata from [@ethereum-navigator/atlas](https://github.com/ethereum-navigator/atlas)

## 🏄 Get Started

```bash
npm install
npm start
```

## 👩‍🔬 Testing

Test suite is setup with [Jest](https://jestjs.io) and [react-testing-library](https://github.com/kentcdodds/react-testing-library) for unit testing.

To run all linting and unit tests:

```bash
npm test
```

For local development, you can start the test runner in a watch mode.

```bash
npm run test:watch
```

## ✨ Code Style

For linting and auto-formatting you can use from the root of the project:

```bash
# lint all js with eslint
npm run lint

# auto format all js & css with prettier, taking all configs into account
npm run format
```

## 🎁 Contributing

See the page titled "[Ways to Contribute](https://docs.oceanprotocol.com/concepts/contributing/)" in the Ocean Protocol documentation.

## 🏛 License

```text
Copyright 2019 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
