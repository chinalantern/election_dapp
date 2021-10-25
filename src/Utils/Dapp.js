// import React from 'react'
// import { ethers } from 'ethers'

// const Dapp = async () => ({
//   // Zero out precaution
//     provider: null,
//     // signer: null,
//   contracts: {},
//   account: '0x0',

//   /*************************************************************/
//   /* Step 1: Init Metamask                                     */
//   /*  Connect to the default http://localhost:8545             */
//   /*  const provider = new ethers.providers.JsonRpcProvider(); */
//   /*************************************************************/
//   initWeb3Provider: () => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//       if (provider !== null) {
//           Dapp.provider = provider
//         //   Dapp.signer = provider.getSigner()
//     }
//     // Get the balance of an account (by address or ENS name, if supported by network)
//     // const balance = (await provider.getBalance())
//     console.log('this is my provider', Dapp.provider)
//     // console.log('this is my signer', signer)
//   },

//   /*************************************************************************/
//   /* Step 2: Detect/Handle chain (network) and chainChanged (per EIP-1193) */
//   /*************************************************************************/
//   // FIXME https://docs.metamask.io/guide/ethereum-provider.html#events
//   //   initCheckNetworkChain: () => {
//   // const chainId = await window.ethereum.request({ method: 'eth_chainId' })
//   // window.ethereum.on('chainChanged', handleChainChanged(chainId))
//   // if (chainId) {
//   //   console.log('reloading page')
//   //   window.location.reload()
//   // }
// //   window.ethereum.on('accountsChanged', Dapp.handleAccountsChanged)
//   // },

//   /*******************************************************************/
//   /* Step 3: Handle user account change switching (per EIP-1193) */
//   /*******************************************************************/
//   handleAccountsChanged: () => {
//     // Set event listeners
//     window.ethereum.on('accountsChanged', (accounts) => {
//       // Handle the new accounts, or lack thereof.
//       if (accounts.length === 0) {
//         // FIXME handle this . MetaMask is locked or the user has not connected any accounts
//         console.log('Not getting any accounts. Please connect to MetaMask.')
//       } else if (accounts[0] !== Dapp.account) {
//         Dapp.account = accounts[0]
//       }
//     })
//   },

//   componentWillUnmount() {
//     // On component unmount remove event listeners
//     window.ethereum.removeListener('accountsChanged', Dapp.handleAccountsChanged)
//   },

//   //   var account = web3.eth.accounts[0];
//   //   var accountInterval = setInterval(function() {
//   //     if (web3.eth.accounts[0] !== account) {
//   //       account = web3.eth.accounts[0];
//   //       updateInterface();
//   //     }
//   //   }, 100);


//     // The Election contract object
//     initElectionContract: () => {
//         // Contract address or ENS like "dai.tokens.ethers.eth"
//         // const electionAddress = 'Election.json'
//         const electionAddress = '0xeDA142cE890aA6A14797ccdEe4f82dCB7Bee2dcc'
//         // Contract ABI. Ignore any methods not needed
//          // Human readable example: Get the account balance. "function balanceOf(address) view returns (uint)",
//         const electionAbi = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "candidate", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]
//         Dapp.contracts = new ethers.Contract(electionAddress, electionAbi, Dapp.provider)
//         console.log('Outputting the initContract', Dapp.contracts)
//       }
    

// })

// export default Dapp
