// import { useState } from 'react';
// import { useGetNetworkConfig } from 'hooks';
// import { ContractFunction, SmartContract } from 'utils';

// export const useCastVote = () => {
//   const { network } = useGetNetworkConfig();
//   const [hasPendingTransactions, setHasPendingTransactions] = useState(false);

//   const castVote = async (optionIndex: number) => {
//     try {
//       setHasPendingTransactions(true);

//       const contract = new SmartContract({
//         address: network.contractAddress,
//       });

//       const transaction = contract.call({
//         func: new ContractFunction('castVote'),
//         args: [optionIndex],
//         gasLimit: 1000000,
//       });

//       await transaction.send();

//       // Wait for the transaction to complete, then reset state
//       setHasPendingTransactions(false);
//     } catch (error) {
//       console.error('Error casting vote', error);
//       setHasPendingTransactions(false);
//     }
//   };

//   return { castVote, hasPendingTransactions };
// };
