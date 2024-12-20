import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { zetachain } from "viem/chains";
import { useBlockNumber, useWaitForTransactionReceipt } from "wagmi";
import { useListenToUniversalDapp, useTimeUntilZetaFinalization, useWaitForOutput } from "~~/hooks/dust";
import { getBlockExplorerTxLink } from "~~/lib/utils";
import arrowSVG from "~~/public/assets/arrow-waiting-modal.svg";
import confirmedGearSVG from "~~/public/assets/confirmed-gear.svg";
import linkSVG from "~~/public/assets/link.svg";
import pendingGearSVG from "~~/public/assets/pending-gear.svg";
import successSVG from "~~/public/assets/success-green.svg";
import dustSVG from "~~/public/logo2.svg";
import { useGlobalState } from "~~/services/store/store";

interface Props {
  open: boolean;
  swapHash?: `0x${string}`;
}

const WaitingModal = ({ open, swapHash }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(true);
  const [inputNetworkSuccess, setInputNetworkSuccess] = useState(false);
  const [zetaNetworkSuccess, setZetaNetworkSuccess] = useState(false);
  const [outputNetworkSuccess, setOutputNetworkSuccess] = useState(false);
  const { outputNetwork, outputToken, inputTokens, inputNetwork } = useGlobalState();

  const { data: currZetaBlockNum } = useBlockNumber({
    chainId: zetachain.id,
  });

  const { percentageComplete, timeLeft } = useTimeUntilZetaFinalization(currZetaBlockNum);

  const { data: swapReceipt } = useWaitForTransactionReceipt({
    hash: swapHash,
  });

  const inputTxLink = getBlockExplorerTxLink(inputNetwork, swapHash);

  useEffect(() => {
    if (!swapReceipt) return;
    setInputNetworkSuccess(true);
  }, [swapReceipt]);
  useWaitForOutput(() => {
    setZetaNetworkSuccess(true);
    setOutputNetworkSuccess(true);
  });

  useEffect(() => {
    if (inputNetworkSuccess && zetaNetworkSuccess && outputNetworkSuccess) {
      setPending(false);
    }
  }, [inputNetworkSuccess, zetaNetworkSuccess, outputNetworkSuccess]);

  useListenToUniversalDapp();

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  const getTimeLeftMin = () => {
    if (timeLeft) {
      return Math.round(timeLeft / 60);
    }
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box box bg-[url('/assets/preview_bg.svg')] bg-no-repeat bg-center bg-auto rounded-xl flex flex-col gap-4">
        <span className="text-[#fffff] text-xl font-bold">Estimated wait time</span>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Image
                src={pending ? pendingGearSVG : confirmedGearSVG}
                alt={pending ? "pending" : "confirmed"}
                className={`${pending && "animate-spin-slow"}`}
              />
              <span className={`text-lg font-bold ${pending ? "text-[#FFD900]" : "text-[#5EFF50]"}`}>
                {pending ? "Pending" : "Confirmed"}{" "}
              </span>
            </div>
            <div className="text-sm opacity-50 text-white flex gap-4 ml-8">
              {/* <span>{date}</span>
              <span>{hour}</span> */}
            </div>
          </div>
          <div className="text-sm opacity-50 text-white flex flex-col items-end justify-between">
            <span>Estimated time of arrival</span>
            <span className="font-bold">~{getTimeLeftMin()} minutes</span>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-gray-200">
          <div className="text-sm font-bold flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Image src={inputNetworkSuccess ? successSVG : inputNetwork?.logo} alt={"network"} />
              <div className="opacity-50">
                <span>Swapping via {inputNetwork?.name}</span>
                <div>
                  {inputTokens.map(({ name, address, amount }) => (
                    <span key={address}>{`${amount} ${name}`}</span>
                  ))}
                </div>
              </div>
              <a target="_blank" href={inputTxLink}>
                <Image src={linkSVG} alt="link" className={`w-4 ${!inputNetworkSuccess && "opacity-20 cursor-wait"}`} />
              </a>
            </div>

            <Image src={arrowSVG} alt="arrow" className="ml-1" />

            <div className="flex items-center gap-3">
              <Image src={zetaNetworkSuccess ? successSVG : dustSVG} alt={"network"} />
              <div className="opacity-80">
                <span>Transaction on Zetachain</span>
                <progress className="progress progress-success w-56" value={percentageComplete} max="100"></progress>
              </div>
              {/* <a href="">
                <Image src={linkSVG} alt="link" className={`w-4 ${!zetaNetworkSuccess && "opacity-20 cursor-wait"}`} />
              </a> */}
            </div>

            <Image src={arrowSVG} alt="arrow" className="ml-1" />

            <div className="flex items-center gap-3">
              <Image src={outputNetworkSuccess ? successSVG : outputNetwork?.logo} alt={"network"} />
              <div className="opacity-50">
                <span>Swapping via {outputNetwork?.name}</span>
                <div>
                  <span>{`[ESTIMATED AMOUNT PLACEHOLDER] ${outputToken?.name}`}</span>
                </div>
              </div>
              <a href="">
                <Image
                  src={linkSVG}
                  alt="link"
                  className={`w-4 ${!outputNetworkSuccess && "opacity-20 cursor-wait"}`}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full text-sm opacity-50 text-white font-bold flex justify-center">
          <span>Works with Zetachain Cross-Chain engine</span>
        </div>
      </div>
    </dialog>
  );
};

export default WaitingModal;
