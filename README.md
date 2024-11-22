# Simple Voting dApp

This project is a **Simple Voting Decentralized Application (dApp)** built using the **[MultiversX dApp Template](https://template-dapp.multiversx.com/)**. The application leverages modern front-end technologies like **[React.js](https://reactjs.org/)** and **[TypeScript](https://www.typescriptlang.org/)** to deliver a robust and user-friendly experience.

The **MultiversX dApp Template** serves as the foundation for this project, providing seamless integration with the **[@multiversx/sdk-dapp](https://www.npmjs.com/package/@multiversx/sdk-dapp)** for essential blockchain features such as authentication and transaction signing.

For a live demonstration of the base template, visit [MultiversX DApp Template](https://template-dapp.multiversx.com/).

---

## Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (version >= 18)
- **npm** (version >= 10)

---

## Getting Started

This dApp is a client-side project built using the [Create React App](https://create-react-app.dev) framework. Follow the steps below to set up and run the project locally.

### Step 1: Configure Contract Address and ABI

To connect the dApp to a smart contract, configure the **contract address** and **ABI** (Application Binary Interface) as follows:

1. Verify that the `simple-voting.abi.json` file is present in the `src/contracts/` folder. If it is missing, copy it from the contract's output directory.

2. Update the ABI file import in `src/utils/smartContract.ts`:
   ```typescript
   import json from 'contracts/simple-voting.abi.json';
   ```

4. Update the contract address in `src/config/config.devnet.ts` with the correct deployment address:

   ```typescript
   export const contractAddress = 'erd1qqqqqqqqqqqqqpgq0weg304fhwxdza5mp9amdr2vrf7ufahfv2dsttn5a8';
   ```

5. Restart the development server to apply the updated configurations. Ensure the file `src/config/index.ts` reflects the new contract details at runtime.

---

### Step 2: Install Dependencies

Navigate to the project directory in your terminal and run:

```bash
yarn install
```

---

### Step 3: Run the Development Server

Start the application in development mode using the following commands based on the target environment:

```bash
yarn start:devnet    # For Devnet
yarn start:testnet   # For Testnet
yarn start:mainnet   # For Mainnet
```

This will launch the dApp on [http://localhost:3000](http://localhost:3000). Any code changes will automatically reload the app, and linting errors will appear in the console.

---

### Step 4: Build for Deployment

To prepare the app for testing or production, create a build for your target environment:

```bash
yarn build:devnet    # Build for Devnet
yarn build:testnet   # Build for Testnet
yarn build:mainnet   # Build for Mainnet
```

The build files will be available in the `build` directory, ready for deployment.

---

## Notes

- If you encounter errors in the browser console after configuration, ensure the contract address and ABI file are correctly set up and the development server is restarted.

