<p align="center">
<img width="400" alt="LightSpell logo" src="https://user-images.githubusercontent.com/55763425/251588168-4855abc3-445a-4207-9a65-e891975be62c.png">
</p>

<h1 align="center">
XCM-API (Supporting 47 Parachains)
</h1>

<p align="center">
The 🥇 XCM-API in Polkadot & Kusama ecosystem.
</p>

<p align="center">
Enhance the cross-chain experience of your Polkadot/Kusama decentralized application.
</p>

[1. Introduction](#introduction)<br />
[2. Problem statement](#problem-statement)<br />
[3. Usage guide](#usage-guide)<br />
&nbsp;&nbsp;[3.1 XCM Messages](#xcm-messages)<br />
&nbsp;&nbsp;[3.2 XCM Router](#xcm-router)<br />
&nbsp;&nbsp;[3.3 Asset Pallet](#asset-pallet)<br />
&nbsp;&nbsp;[3.4 XCM Pallet](#xcm-pallet)<br />
&nbsp;&nbsp;[3.5 HRMP Pallet](#hrmp-pallet)<br />
[4. Running the API locally](#running-the-api-locally)<br />
&nbsp;&nbsp;[4.1 Installation](#installation)<br />
&nbsp;&nbsp;[4.2 Start nest server](#start-nest-server)<br />
[5. Upgrading request per minute count](#upgrading-request-per-minute-count)<br />
[6. Deploying API yourself](#deploying-api-yourself)<br />
[7. Tests](#tests)<br />
&nbsp;&nbsp;[7.1 API playground](#api-playground-for-router-endpoint-testing-use-xcm-router-playground)<br />
&nbsp;&nbsp;[7.2 API tests](#api-tests)<br />

## Live status
API is now deployed on the live server and accessible on the following link: https://api.lightspell.xyz/

## Introduction
Our team has focused on the unification of cross-chain communication in the Polkadot and Kusama ecosystems for a while now. Our latest and flagship addition is XCM API also known as LightSpell⚡️. This tool allows you to implement cross-chain interoperability into your application within moments.

**Reasons to use XCM API for interoperability integration into your application:**
- XCM API handles complex logic and you are only required to provide basic details to create calls (Junctions and other complex details are auto-filled for you)
- Offloads your server from heavy computing required to construct calls (You receive constructed message already)
- Saves you server costs (Because of the reason mentioned above)
- Package-less integration (No need to install anything)
- Simple to implement (Constructed to be as dev-friendly as possible)

## Problem statement
The interoperability experience on Polkadot & Kusama is very diverse for developers. Currently, XCM has the following problems our XCM API &  XCM SDK tries to overcome them for you:
- Different XCM versions implemented across Parachains (Some still have V1 others switched to the latest V3 already)
- Multiple variations and differences of XCM Pallets across Parachains (eg. asset selection mechanism on xTokens, some Parachains use asset id (eg. Basilisk) to select assets others have multilayer asset selection (eg. Acala) this can be observed [in this picture](https://user-images.githubusercontent.com/55763425/253806931-3fa05b86-627c-46bc-a4ab-c5c2cd619b35.png).)
- Ecosystem has 4 different XCM Pallets (PolkadotXCM, OrlmXTokens, xTokens, PalletXCM)
- To novices in the ecosystem it can be hard to find which Parachains are HRMP-connected and XCM-compatible
- Parachains have their own Asset registration systems and they have different assets (Can lead to asset loss if a novice sends an asset that is not registered on the destination chain)

Our XCM API solves this by implementing XCM SDK which researched every compatible Parachain XCM Pallet and integrated support for them and their variations. XCM SDK is updated regularly to keep every integrated Parachain up to date. XCM SDK unifies XCM message construction to simple patterns. Our XCM API can utilize this and enhance it making XCM call construction a matter of seconds instead of hours or days. XCM API and XCM SDK also feature user error prevention (Inability to construct a message from Parachain on Polkadot to Parachain on Kusama, inability to construct a message if the asset is not registered on the destination or origin chain and many more). **XCM API can greatly reduce application development times, save server costs and boost the ecosystem with new fresh projects**.

## Usage guide
This guide briefly covers how to use XCM-API. For a full guide refer to [official documentation](https://paraspell.github.io/docs/api/g-started.html).

### XCM Messages
A complete guide on this section can be found in [official docs](https://paraspell.github.io/docs/api/xcmP.html).

Possible parameters:
- `from` (Query parameter): (optional): Represents the Parachain from which the assets will be transferred.
- `to` (Query parameter): (optional): Represents the Parachain to which the assets will be transferred.
- `currency` (Query parameter): (optional): Represents the asset being sent. It should be a string value.
- `amount` (Query parameter): (required): Specifies the amount of assets to transfer. It should be a numeric value.
- `address` (Query parameter): (required): Specifies the address of the recipient.

```js
//Construct XCM call from Relay chain to Parachain (DMP)
const response = await fetch(
    "http://localhost:3001/x-transfer?" +
    new URLSearchParams({
        to: "Parachain",   //Replace "Parachain" with destination Parachain eg. "Moonbeam"
        amount: "Amount",  //Replace "Amount" with the amount you wish to transfer (Numeric value)
        address: "Address" //Replace "Address" with destination wallet address (In AccountID32 or AccountKey20 Format)
    })
);

//Construct XCM call from Parachain chain to Relay chain (UMP)
const response = await fetch(
    "http://localhost:3001/x-transfer?" +
    new URLSearchParams({
        from: "Parachain", //Replace "Parachain" with sender Parachain eg. "Acala"
        amount: "Amount",  //Replace "Amount" with the amount you wish to transfer (Numeric value)
        address: "Address" //Replace "Address" with destination wallet address (In AccountID32 or AccountKey20 Format)
    })
);

//Construct XCM call from Parachain to Parachain (HRMP)
const response = await fetch(
    "http://localhost:3001/x-transfer?" +
    new URLSearchParams({
        from: "Parachain", //Replace "Parachain" with sender Parachain eg. "Acala"
        to: "Parachain",   //Replace "Parachain" with destination Parachain eg. "Moonbeam"
        currency: "Currency", //Replace "Currency" with asset id or symbol eg. "DOT"
        amount: "Amount",  //Replace "Amount" with the amount you wish to transfer (Numeric value)
        address: "Address" //Replace "Address" with destination wallet address (In AccountID32 or AccountKey20 Format)
    })
);
```

### XCM Router
A complete guide on this section can be found in [official docs](https://paraspell.github.io/docs/api/xcmRouter.html).

NOTICE: It is advised to use at least 120s timeout with this endpoint (Because API has to connect to other endpoints and that is time dependent)

Possible parameters:
- `from` (Query parameter): (required): Represents the Parachain from which the assets will be transferred.
- `exchange` (Query parameter): (optional): Represents the Parachain DEX on which tokens will be exchanged (If not provided, DEX is selected automatically based on best price output).
- `to` (Query parameter): (required): Represents the Parachain to which the assets will be transferred.
- `currencyFrom` (Query parameter): (required): Represents the asset being sent.
- `currencyTo` (Query parameter): (required): Represents the asset being received. 
- `amount` (Query parameter): (required): Specifies the amount of assets to transfer.
- `slippagePct` (Query parameter): (required): Specifies the slippage percentage. 
- `address` (Query parameter): (required): Specifies the address of the recipient.
- `injectorAddress` (Query parameter): (required): Specifies the address of the sender.

```js
const response = await fetch(
    "http://localhost:3001/router?" +
    new URLSearchParams({
        from: "Polkadot", //Origin Parachain/Relay chain
        exchange: "AcalaDex", //Exchange Parachain/Relay chain
        to: "Interlay", //Destination Parachain/Relay chain
        currencyFrom: "DOT", // Currency to send
        currencyTo: "INTR", // Currency to receive
        amount: "100000", // Amount to send
        slippagePct: "1", // Max slipppage percentage
        address: "5F5586mfsnM6durWRLptYt3jSUs55KEmahdodQ5tQMr9iY96", //Recipient address
        injectorAddress: '5F5586mfsnM6durWRLptYt3jSUs55KEmahdodQ5tQMr9iY96', //Address of sender
    })
);
```

### Asset Pallet
A complete guide on this section can be found in [official docs](https://paraspell.github.io/docs/api/assetP.html).

Possible parameters:
- `node`: Specific Parachain eg. Moonbeam
- `asset`: Asset symbol eg. DOT
- `paraID`: Parachain ID eg. 2090 (Basilisk)

```js
//Retrieve assets object for a specific Parachain
const response = await fetch("http://localhost:3001/assets/:node");

//Retrieve asset ID for particular Parachain and asset
const response = await fetch("http://localhost:3001/assets/:node/id?symbol=:asset");

//Retrieve the Relay chain asset Symbol for a particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/relay-chain-symbol");

//Retrieve native assets for a particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/native");

//Retrieve foreign assets for a particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/other");

//Retrieve all asset symbols for particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/all-symbols");

//Retrieve support for a particular asset on a particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/has-support?symbol=:asset");

//Retrieve decimals for a particular asset for a particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/decimals?symbol=:asset");

//Retrieve Parachain ID for a particular Parachain
const response = await fetch("http://localhost:3001/assets/:node/para-id");

//Retrieve Parachain name from Parachain ID
const response = await fetch("http://localhost:3001/assets/:paraID");

//Retrieve a list of implemented Parachains
const response = await fetch("http://localhost:3001/assets");

```

### XCM Pallet
A complete guide on this section can be found in [official docs](https://paraspell.github.io/docs/api/nodeP.html).

Possible parameters:
- `node`: Specific Parachain eg. Moonbeam

```js
//Return default pallet for specific Parachain
const response = await fetch("http://localhost:3001/pallets/:node/default");

//Return an array of supported pallets for specific Parachain
const response = await fetch("http://localhost:3001/pallets/:node");
```

### HRMP Pallet
A complete guide on this section can be found in [official docs](https://paraspell.github.io/docs/api/hrmpP.html).

Possible parameters:
- `from` (Query parameter): (required): Specifies the origin Parachain.
- `to` (Query parameter): (required): Specifies the destination Parachain.
- `maxSize` (Query parameter): (required): Specifies the maximum size.
- `maxMessageSize` (Query parameter): (required): Specifies the maximum message size.
- `inbound` (Query parameter): (required): Specifies the maximum inbound.
- `outbound` (Query parameter):  (required): Specifies the maximum outbound.

```js
//Opening HRMP Channel
const response = await fetch(
    "http://localhost:3001/hrmp/channels?" +
    new URLSearchParams({
        from: Parachain, //eg. replace "Parachain" with "Moonbeam"
        to: Parachain,   //eg. replace "Parachain" with "Acala"
        maxSize: "8",
        maxMessageSize: "1024",
    }),
    { method: "POST" }
);

//Closing HRMP Channel
const response = await fetch(
    "http://localhost:3001/hrmp/channels?" +
    new URLSearchParams({
        from: Parachain, //eg. replace "Parachain" with "Moonriver"
        inbound: "0",
        outbound: "0",
    }),
    { method: "DELETE" }
);
```

## Running the API locally

### Installation
The following command installs all necessary packages.

NOTICE: Use Yarn v1.22 (Temporarily)

```bash
$ yarn
```

### Start nest server
The following commands allow you to start the nest server locally. You can then test its endpoints with various tools (eg. [Insomnia](https://insomnia.rest/)) or integrate it directly into your application.
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Upgrading request per minute count
For guidance on this topic head to the following [documentation section](https://paraspell.github.io/docs/api/upgrade.html).

## Deploying API yourself
For guidance on this topic head to the following [documentation section](https://paraspell.github.io/docs/api/deploy.html).

## Tests
The following section contains various test types (unit, e2e, integration, coverage) and a test playground that allows you to fully test API capabilities.

### API playground (For Router endpoint testing use [XCM Router Playground](https://github.com/paraspell/xcm-router/tree/main/playground))
```bash
# Navigate to the playground folder
$ cd playground

# Install playground packages
$ pnpm i

# Start playground
$ pnpm run serve

# IMPORTANT: Make sure XCM API is also running in another terminal!
$ pnpm run start
```

### API tests
Following commands allow you to run various tests on the API.

```bash
# unit & integration tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

