import detectEthereumProvider from "@metamask/detect-provider";
// const { detectEthereumProvider } = require("@metamask/detect-provider");
import { MetaMaskProvider } from "~~/types/interfaces/metamask-provider.interface";

// Provider Docs: https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
// JSON RPC API: https://metamask.github.io/api-playground/api-documentation

export const useMetamask = () => {
	const getProvider = async (): Promise<null | MetaMaskProvider> => {
		// get provider
		const provider = (await detectEthereumProvider()) as MetaMaskProvider;
		// let provider = null;
		// if ((window as any).ethereum && (window as any).ethereum.isMetaMask) {
		// 	provider = new ethers.providers.Web3Provider(
		// 		(
		// 			window as Window &
		// 				typeof globalThis & { ethereum: MetaMaskProvider }
		// 		).ethereum,
		// 	) as unknown as MetaMaskProvider;
		// } else return null;

		// initiate a connection request
		// see https://docs.metamask.io/guide/getting-started.html#basic-considerations
		await provider.request({
			method: "eth_requestAccounts",
			params: [{ eth_accounts: {} }],
		});

		return provider;
	};

	return {
		getProvider,
	};
};
