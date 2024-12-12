import { create } from "zustand";
import { Network, OutputToken, SelectedToken, Token } from "~~/lib/types";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  outputNetwork: Network | null;
  setOutputNetwork: (newOutputNetwork: Network) => void;
  outputToken: OutputToken | null;
  setOutputToken: (newOutputToken: Token) => void;
  inputTokens: SelectedToken[];
  setInputTokens: (newInputTokens: SelectedToken[]) => void;
  outputTokensByNetwork?: SelectedToken[];
  setOutputTokensByNetwork: (newOutputTokensByNetwork: SelectedToken[]) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  setNativeCurrencyPrice: (newValue: number): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, price: newValue } })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, isFetching: newValue } })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
  outputNetwork: null,
  setOutputNetwork: (newOutputNetwork: Network) => set(() => ({ outputNetwork: newOutputNetwork })),
  outputToken: null,
  setOutputToken: (newOutputToken: Token) => set(() => ({ outputToken: newOutputToken })),
  inputTokens: [],
  setInputTokens: (newInputTokens: SelectedToken[]) => set(() => ({ inputTokens: newInputTokens })),
  outputTokensByNetwork: [],
  setOutputTokensByNetwork: (newOutputTokensByNetwork: SelectedToken[]) =>
    set(() => ({ outputTokensByNetwork: newOutputTokensByNetwork })),
}));
