import { SignatureTransfer, PERMIT2_ADDRESS } from "@uniswap/permit2-sdk";
import EvmDustTokens from "../../foundry/out/EvmDustTokens.sol/EvmDustTokens.json";
import localnetData from "../../foundry/localnet.json";
import deployedContracts from "~~/contracts/deployedContracts";
import { ethers } from "ethers";
import { TokenSwap } from "./types";
import { parseAbi, PublicClient } from "viem";

type AddressData = {
  chain: string;
  type: string;
  address: string;
};
type LocalnetData = {
  pid: number;
  addresses: AddressData[];
};

const CHAIN_NAME_TO_ID: { [key: string]: number } = {
  ethereum: 31337,
  zetachain: 4
}

const readLocalnetAddresses = (chain: string, type: string) => {
  // const filePath = path.join(__dirname, "../../foundry/localnet.json");

  // let data: LocalnetData = { addresses: [], pid: 0 };

  // // Read existing data if the file exists
  // if (fs.existsSync(filePath)) {
  //   try {
  //     const fileContent = fs.readFileSync(filePath, "utf-8");
  //     data = JSON.parse(fileContent) as LocalnetData;
  //   } catch (error) {
  //     console.error("Error reading or parsing the JSON file:", error);
  //     throw new Error("Failed to read the deployment data.");
  //   }
  // }

  if (!localnetData.pid) {
    throw new Error("Localnet data not found");
  }

  const addressesData = localnetData;

  const addressData = addressesData.addresses.find(
    (address) => address.chain === chain && address.type2 === type
  );

  if (!addressData) {
    throw new Error(`Address not found for chain ${chain} and type ${type}`);
  }

  return addressData.address2;
};

const encodeDestinationPayload = (
  recipient: string,
  outputToken: string
): string => {
  const destinationPayloadTypes = ["address", "address"];
  const destinationFunctionParams = ethers.utils.defaultAbiCoder.encode(
    destinationPayloadTypes,
    [outputToken, recipient]
  );

  const functionName = "ReceiveTokens(address,address)";
  const functionSignature = ethers.utils.id(functionName).slice(0, 10);
  const destinationPayload = ethers.utils.hexlify(
    ethers.utils.concat([functionSignature, destinationFunctionParams])
  );

  return destinationPayload;
};

const encodeZetachainPayload = (
  targetChainToken: string,
  targetChainCounterparty: string,
  recipient: string,
  destinationPayload: string
) => {
  const args = {
    types: ["address", "bytes", "bytes", "bytes"],
    values: [
      targetChainToken,
      targetChainCounterparty,
      recipient,
      destinationPayload,
    ],
  };

  // Prepare encoded parameters for the call
  const valuesArray = args.values.map((value, index) => {
    const type = args.types[index];
    if (type === "bool") {
      try {
        return JSON.parse(value.toLowerCase());
      } catch (e) {
        throw new Error(`Invalid boolean value: ${value}`);
      }
    } else if (type.startsWith("uint") || type.startsWith("int")) {
      return ethers.BigNumber.from(value);
    } else {
      return value;
    }
  });

  const encodedParameters = ethers.utils.defaultAbiCoder.encode(
    args.types,
    valuesArray
  );

  return encodedParameters;
};

const preparePermitData = async (
  client: PublicClient,
  swaps: TokenSwap[],
  spender: string
) => {
  const nonce = Math.floor(Math.random() * 1e15); // 1 quadrillion potential nonces
  const deadline = calculateEndTime(30 * 60 * 1000); // 30 minute sig deadline

  // Create the permit object for batched transfers
  const permit = {
    deadline: deadline,
    nonce: nonce,
    permitted: swaps.map((s) => {
      return { amount: s.amount, token: s.token };
    }),
    spender: spender,
  };

  // Get the chainId (Sepolia = 11155111)
  const chainId = await client.getChainId();;

  // Generate the permit return data & sign it
  const { domain, types, values } = SignatureTransfer.getPermitData(
    permit,
    PERMIT2_ADDRESS,
    chainId
  );

  return { domain, types, values, deadline, nonce };
};

const calculateEndTime = (duration: number) => {
  return Math.floor((Date.now() + duration) / 1000);
};

async function getUniswapV3EstimatedAmountOut(
  client: PublicClient,
  quoterAddress: string, // Uniswap V3 Quoter address
  tokenIn: string,
  tokenOut: string,
  amountIn: ethers.BigNumber,
  slippageBPS: number
) {
  const quoterAbi = parseAbi([
    "function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) external returns (uint256 amountOut)",
  ]);

  // Initialize the Quoter contract
  // const quoterContract = new ethers.Contract(
  //   quoterAddress,
  //   quoterAbi,
  //   client
  // );
  try {
    const amountOut = await client.readContract({
      abi: quoterAbi,
      address: quoterAddress,
      functionName: 'quoteExactInputSingle',
      args: [tokenIn, tokenOut, 3000, amountIn, 0]
    });

    const slippageMultiplier = 10000 - slippageBPS; // 10000 represents 100%
    const amountOutMinimum = amountOut * BigInt(slippageMultiplier) / BigInt(10000);
    return amountOutMinimum;
  } catch (error) {
    console.error("Error getting estimated amount out:", error);
    throw error;
  }
}

export {
  readLocalnetAddresses,
  encodeDestinationPayload,
  encodeZetachainPayload,
  preparePermitData,
  getUniswapV3EstimatedAmountOut,
  EvmDustTokens,
};