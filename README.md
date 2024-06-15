# Solana Location Rating DApp

A decentralized application (DApp) built with Next.js that utilizes a Solana smart contract deployed on the devnet. This DApp allows users to rate different locations from 1-10, providing a description, title, location, and the rating itself. Users can also update their previously left reviews using the unique title as the identifier.

## Overview

This project integrates a Next.js frontend with a Solana smart contract. The smart contract, deployed on Solana's devnet, facilitates the creation and updating of location reviews. The frontend allows users to connect their wallets, interact with the smart contract, and manage their reviews.

## Features

- **Rate Locations**: Users can rate locations from 1-10.
- **Add Descriptions**: Each rating can include a description, title, and location.
- **Update Reviews**: Users can update their previously submitted reviews using the unique title.
- **Wallet Connection**: Seamless integration with Solana wallets using wallet adapter.
- **Solana Web3.js**: Utilizes Solana Web3.js for interaction with the blockchain.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Solana wallet (e.g., Phantom)

### Installation

1. **Install dependencies:**

```bash
   npm install
   # or
   yarn install
```

2. **Run the development server:**

```bash
   npm run dev
   # or
   yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Usage

1. **Connect Wallet**: Use the wallet adapter to connect your Solana wallet (e.g., Phantom).

2. **Rate a Location**: Fill out the form with the title, location, description, and rating (1-10). Submit the form to rate a location.

3. **Update a Review**: To update a review, provide the same title and update the other fields as needed. Submit the form to update your review.

## Smart Contract

The Solana smart contract is deployed on the devnet with the program ID: `D7VHn82pVMWqppuXJSe4M3ExL1ZAhdUzsM8nLC8wznCE`. The contract supports the following functionalities:

- **Add Review**: Allows users to add a new review with a title, location, description, and rating.
- **Update Review**: Enables users to update an existing review identified by the unique title.

### Interaction

The smart contract is interacted with using Solana Web3.js. The frontend handles the connection, transaction creation, and submission to the Solana blockchain.

## Frontend

The frontend is built with Next.js and provides a simple form-based interface for interacting with the Solana smart contract. Key technologies used include:

- **Next.js**: React framework for building server-side rendered applications.
- **Solana Web3.js**: JavaScript library for interacting with the Solana blockchain.
- **Wallet Adapter**: For connecting and interacting with Solana wallets.

### Key Components

- **Wallet Connection**: Facilitated by the wallet adapter, allowing users to connect their Solana wallets.
- **Form Interface**: A form that captures the title, location, description, and rating, and submits this data to the smart contract.

## License

This project is licensed under the MIT License.
