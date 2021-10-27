import React from 'react'
import { ethers } from 'ethers'

export const EthersUtil = () => {
  let provider = null
  let signer = null
  let contracts = {}
  let account = '0x0'

  /*************************************************************/
  /* Step 1: Init Metamask                                     */
  /*  Connect to the default http://localhost:8545             */
  /*  const provider = new ethers.providers.JsonRpcProvider(); */
  /*************************************************************/
    const initProvider = async () => {
        const web3Provider = new ethers.providers.JsonRpcProvider()
            if (web3Provider !== null) {
                provider = web3Provider
                signer = provider.getSigner()
                let accountList = await provider.listAccounts()
                account = accountList[0]
            }
    }

    const initContractInstances = async () => {
        // Contract address or ENS like "dai.tokens.ethers.eth"
        // const electionAddress = 'Election.json'
        const electionAddress = '0x16A368975e962ade55d787A13A115A73652fc4A6'
        // Contract ABI. Ignore any methods not needed
        // Human readable example: Get the account balance. "function balanceOf(address) view returns (uint)",
        // read only functions
        const electionAbi = [
            {
                inputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                constant: true,
                inputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                name: 'candidates',
                outputs: [
                    {
                        internalType: 'uint16',
                        name: 'voteCount',
                        type: 'uint16',
                    },
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'candidatesCount',
                outputs: [
                    {
                        internalType: 'uint16',
                        name: '',
                        type: 'uint16',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
        ]

        // instantiate read only contract instance obj
        const electionContract = new ethers.Contract(
            electionAddress,
            electionAbi,
            provider
        )
        // instantiate read / write contract instance obj
        const electionContract_rw = new ethers.Contract(
            electionAddress,
            electionAbi,
            signer
        )
        bundleContracts(electionContract, electionContract_rw)
    }


    const bundleContracts = (_contractReadOnly, _contractReadRight) => {
        if (Object.entries(contracts).length === 0) {
            contracts = {
                electionContractReadOnly: _contractReadOnly,
                electionContractReadWright: _contractReadRight
            }    
        }
    }


}
