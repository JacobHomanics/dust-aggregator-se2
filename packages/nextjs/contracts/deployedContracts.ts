/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    UniversalDApp: {
      address: "0xe1aa25618fa0c7a1cfdab5d6b456af611873b629",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_systemContract",
              type: "address",
              internalType: "address",
            },
            {
              name: "_gateway",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "gateway",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IGatewayZEVM",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "onCall",
          inputs: [
            {
              name: "",
              type: "tuple",
              internalType: "struct MessageContext",
              components: [
                {
                  name: "origin",
                  type: "bytes",
                  internalType: "bytes",
                },
                {
                  name: "sender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "chainID",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
            },
            {
              name: "zrc20",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "message",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "onRevert",
          inputs: [
            {
              name: "revertContext",
              type: "tuple",
              internalType: "struct RevertContext",
              components: [
                {
                  name: "sender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "asset",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "revertMessage",
                  type: "bytes",
                  internalType: "bytes",
                },
              ],
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "systemContract",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract SystemContract",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "Reverted",
          inputs: [
            {
              name: "recipient",
              type: "bytes",
              indexed: false,
              internalType: "bytes",
            },
            {
              name: "asset",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "AdditionsOverflow",
          inputs: [],
        },
        {
          type: "error",
          name: "CantBeIdenticalAddresses",
          inputs: [],
        },
        {
          type: "error",
          name: "CantBeZeroAddress",
          inputs: [],
        },
        {
          type: "error",
          name: "IdenticalAddresses",
          inputs: [],
        },
        {
          type: "error",
          name: "InsufficientInputAmount",
          inputs: [],
        },
        {
          type: "error",
          name: "InsufficientLiquidity",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidAddress",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidChainToken",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidPath",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidPathLength",
          inputs: [],
        },
        {
          type: "error",
          name: "MultiplicationsOverflow",
          inputs: [],
        },
        {
          type: "error",
          name: "NotGateway",
          inputs: [],
        },
        {
          type: "error",
          name: "ZeroAddress",
          inputs: [],
        },
      ],
      inheritedFunctions: {
        onCall: "contracts/interfaces/IUniversalContract.sol",
      },
    },
    EvmDustTokens: {
      address: "0xe1da8919f262ee86f9be05059c9280142cf23f48",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "_gateway",
              type: "address",
              internalType: "contract IGatewayEVM",
            },
            {
              name: "_swapRouter",
              type: "address",
              internalType: "contract ISwapRouter",
            },
            {
              name: "_universalDApp",
              type: "address",
              internalType: "address",
            },
            {
              name: "_nativeToken",
              type: "address",
              internalType: "address payable",
            },
            {
              name: "initialOwner",
              type: "address",
              internalType: "address",
            },
            {
              name: "_permit2",
              type: "address",
              internalType: "contract IPermit2",
            },
            {
              name: "_tokenList",
              type: "address[]",
              internalType: "address[]",
            },
          ],
          stateMutability: "payable",
        },
        {
          type: "receive",
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "ReceiveTokens",
          inputs: [
            {
              name: "outputToken",
              type: "address",
              internalType: "address",
            },
            {
              name: "receiver",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "SwapAndBridgeTokens",
          inputs: [
            {
              name: "swaps",
              type: "tuple[]",
              internalType: "struct SwapInput[]",
              components: [
                {
                  name: "token",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "minAmountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
            },
            {
              name: "payload",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "nonce",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "deadline",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "signature",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "acceptOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "addToken",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "collectedFees",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "gateway",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IGatewayEVM",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokenList",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "address[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokensMetadata",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "addresses",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "names",
              type: "string[]",
              internalType: "string[]",
            },
            {
              name: "symbols",
              type: "string[]",
              internalType: "string[]",
            },
            {
              name: "decimals",
              type: "uint8[]",
              internalType: "uint8[]",
            },
            {
              name: "balances",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isWhitelisted",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "onRevert",
          inputs: [
            {
              name: "revertContext",
              type: "tuple",
              internalType: "struct RevertContext",
              components: [
                {
                  name: "sender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "asset",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "revertMessage",
                  type: "bytes",
                  internalType: "bytes",
                },
              ],
            },
          ],
          outputs: [],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "pendingOwner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "permit2",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IPermit2",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "protocolFee",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "removeToken",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "swapFee",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint24",
              internalType: "uint24",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "swapRouter",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ISwapRouter",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "universalDApp",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "wNativeToken",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address payable",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "withdrawFees",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "FeesWithdrawn",
          inputs: [
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferStarted",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Reverted",
          inputs: [
            {
              name: "recipient",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "asset",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SwappedAndDeposited",
          inputs: [
            {
              name: "executor",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "swaps",
              type: "tuple[]",
              indexed: false,
              internalType: "struct SwapOutput[]",
              components: [
                {
                  name: "tokenIn",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenOut",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
            },
            {
              name: "totalTokensReceived",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SwappedAndWithdrawn",
          inputs: [
            {
              name: "receiver",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "outputToken",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "totalTokensReceived",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "TokenAdded",
          inputs: [
            {
              name: "token",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "TokenRemoved",
          inputs: [
            {
              name: "token",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "FeeWithdrawalFailed",
          inputs: [],
        },
        {
          type: "error",
          name: "InsufficientAllowance",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "InsufficientBalance",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "InvalidAddress",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidMsgValue",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidToken",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "NoSwaps",
          inputs: [],
        },
        {
          type: "error",
          name: "NotGateway",
          inputs: [],
        },
        {
          type: "error",
          name: "OwnableInvalidOwner",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "OwnableUnauthorizedAccount",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "SwapFailed",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "TokenIsNotWhitelisted",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "TokenIsWhitelisted",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "TransferFailed",
          inputs: [],
        },
        {
          type: "error",
          name: "WrongIndex",
          inputs: [],
        },
      ],
      inheritedFunctions: {
        acceptOwnership:
          "lib/openzeppelin-contracts/contracts/access/Ownable2Step.sol",
        owner: "lib/openzeppelin-contracts/contracts/access/Ownable2Step.sol",
        pendingOwner:
          "lib/openzeppelin-contracts/contracts/access/Ownable2Step.sol",
        renounceOwnership:
          "lib/openzeppelin-contracts/contracts/access/Ownable2Step.sol",
        transferOwnership:
          "lib/openzeppelin-contracts/contracts/access/Ownable2Step.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
