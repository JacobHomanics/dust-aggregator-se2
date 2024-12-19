import { RefObject, useEffect, useRef, useState } from "react";
import SwapResultModal from "../SwapResultModal";
import WaitingModal from "../WaitingModal";
import dustAbi from "./dustAbi.json";
import { ethers } from "ethers";
import { encode } from "punycode";
import { parseUnits } from "viem";
import { useAccount, useSignTypedData, useWriteContract } from "wagmi";
import { getAccount } from "wagmi/actions";
import { TokenSwap } from "~~/lib/types";
import { getGasLimitByOutputToken } from "~~/lib/utils";
import {
  encodeDestinationPayload,
  encodeZetachainPayload,
  preparePermitData,
  readLocalnetAddresses,
} from "~~/lib/zetachainUtils";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

interface Props {
  togglePreviewModal: () => void;
  _handleApproveTokens: () => void;
  _tokensMinAmountOut: { [key: number]: number | undefined };
}

const ConfirmButton = ({ togglePreviewModal, _handleApproveTokens, _tokensMinAmountOut }: Props) => {
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [waitingModalOpen, setWaitingModalOpen] = useState(false);
  const { address } = useAccount();
  const { outputNetwork, outputToken, inputTokens, inputNetwork, recipient } = useGlobalState();
  const { writeContract, data: swapHash, isError, ...rest } = useWriteContract();
  // const { signTypedData } = useSignTypedData();
  const { chainId } = getAccount(wagmiConfig);

  const handleConfirm = async (e?: any) => {
    e?.preventDefault();

    const isBitcoin = outputNetwork?.name === "bitcoin";

    if (!outputNetwork) return;
    if (!isBitcoin && (!outputToken || !inputTokens.length)) return;

    // ===================
    await _handleApproveTokens();
    // ===================

    console.log(_tokensMinAmountOut);
    return;

    const signPermit = async (swaps: TokenSwap[]) => {
      if (!inputNetwork || !chainId) {
        throw new Error("No input network");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const { domain, types, values, deadline, nonce } = await preparePermitData(
        chainId,
        swaps,
        inputNetwork?.contractAddress,
      );
      const signature = await signer._signTypedData(domain, types, values);

      return { deadline, nonce, signature };
    };

    if (!outputToken) {
      throw new Error("No output token");
    }

    const gasLimit = isBitcoin ? BigInt(130000) : getGasLimitByOutputToken(outputToken?.address);
    const recipientAddress = (recipient || address) as `0x${string}`;
    const targetChainCounterparty = isBitcoin ? recipientAddress : outputNetwork.contractAddress;

    try {
      const encodedParameters = encodeZetachainPayload(
        outputNetwork.zrc20Address,
        gasLimit,
        targetChainCounterparty,
        recipientAddress,
        outputToken?.address as `0x${string}`,
        BigInt(1),
        isBitcoin,
      );

      const tokenSwaps: TokenSwap[] = inputTokens.map(({ amount, decimals, address }) => ({
        amount: parseUnits(amount, decimals),
        token: address,
        minAmountOut: BigInt(1), // TODO: Set a minimum amount out
      }));

      const permit = await signPermit(tokenSwaps);

      writeContract({
        address: inputNetwork?.contractAddress as string,
        abi: dustAbi,
        functionName: "SwapAndBridgeTokens",
        args: [tokenSwaps, encodedParameters, permit.nonce, permit.deadline, permit.signature],
        // enabled: inputNetwork, ??
      });
    } catch (error) {
      console.error("WHOOOPS", error);
    }
  };

  useEffect(() => {
    if (rest.error) {
      console.error("Error performing swap and bridge transaction:", rest.error);
      togglePreviewModal();
      setResultModalOpen(true);
    }
  }, [rest.error]);

  useEffect(() => {
    if (swapHash) setWaitingModalOpen(true);
  }, [swapHash]);

  const retryOperation = () => {
    setResultModalOpen(false);
    togglePreviewModal();
    handleConfirm();
  };

  return (
    <>
      <button
        onClick={handleConfirm}
        className="flex-1 px-6 hover:brightness-50 bg-[url('/button2.png')] bg-no-repeat bg-center bg-cover h-10"
      >
        Approve
      </button>
      <SwapResultModal
        // togglePreviewModal={togglePreviewModal}
        rebootMachine={() => {
          {
          }
        }}
        retryOperation={retryOperation}
        open={resultModalOpen}
        isError={isError}
        error={rest.error}
        amountCurency={"4005.3333 DAI"}
      />
      <WaitingModal open={waitingModalOpen} />
    </>
  );
};

export default ConfirmButton;
