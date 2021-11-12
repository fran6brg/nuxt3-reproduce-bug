// import { useMetamask } from "./useMetamask";
import { ethers } from "ethers";

import { useEthers } from "./useEthers";
import { MetaMaskProvider } from "~~/types/interfaces/metamask-provider.interface";
import { MetaMaskProviderRpcError } from "~~/types/interfaces/metamask-rpc-error.interface";

export type WalletProvider = MetaMaskProvider;
export type ConnectionState = "none" | "connecting" | "connected";
export type WalletName = "none" | "metamask";
// hooks
export type OnConnectedCallback = (provider: WalletProvider) => void;
export type OnDisconnectCallback = (msg: string) => void;
export type OnAccountsChangedCallback = (accounts: string[]) => void;
export type OnChainChangedCallback = (chainId: number) => void;
// should just use ethers for now
export type UseWalletOptions = { library: "ethers" }; // | "web3"

// ========================= state

const provider = ref<WalletProvider | null>(null);
const status = ref<ConnectionState>("none");
const walletName = ref<WalletName>("none");
const error = ref("");

const onDisconnectCallback = ref<OnDisconnectCallback | null>(null);
const onAccountsChangedCallback = ref<OnAccountsChangedCallback | null>(null);
const onChainChangedCallback = ref<OnChainChangedCallback | null>(null);

// ========================= getters

const isConnected = computed(() => {
	if (status.value === "connected") return true;
	else return false;
});

// ========================= methods

export function useWallet(options: UseWalletOptions = { library: "ethers" }) {
	// const { getProvider } = useMetamask();
	const { activate, deactivate } = useEthers();

	// clear state
	const clear = (): void => {
		provider.value = null;
		status.value = "none";
		walletName.value = "none";
		error.value = "";

		onDisconnectCallback.value = null;
		onAccountsChangedCallback.value = null;
		onChainChangedCallback.value = null;

		if (options.library === "ethers") deactivate();
	};

	const getProvider = async (): Promise<null | MetaMaskProvider> => {
		// get provider
		// const provider = (await detectEthereumProvider()) as MetaMaskProvider;
		let provider = null;
		if ((window as any).ethereum && (window as any).ethereum.isMetaMask) {
			provider = new ethers.providers.Web3Provider(
				(
					window as Window &
						typeof globalThis & { ethereum: MetaMaskProvider }
				).ethereum,
			) as unknown as MetaMaskProvider;
		} else return null;

		// initiate a connection request
		// see https://docs.metamask.io/guide/getting-started.html#basic-considerations
		await provider.request({
			method: "eth_requestAccounts",
			params: [{ eth_accounts: {} }],
		});

		return provider;
	};

	// connect wallet: set provider, set wallet name, set subscribers
	const connect = async (_walletName: WalletName): Promise<void> => {
		console.log("connect to metamask wallet");
		let _provider: WalletProvider | null = null;

		error.value = "";

		try {
			status.value = "connecting";
			switch (_walletName) {
				case "metamask":
					_provider = (await getProvider()) as MetaMaskProvider;
					if (!_provider.isConnected)
						throw new Error("metamask is not connected");
					break;
				default:
					throw new Error("Connect Error: wallet name not found");
			}
		} catch (err: any) {
			clear();
			error.value = `Failed to connect: ${err.message}`;
			return;
		}

		provider.value = markRaw(_provider);
		walletName.value = _walletName;
		status.value = "connected";

		// EIP-1193 subscriber
		subscribeDisconnect();
		subscribeAccountsChanged();
		subscribeChainChanged();

		if (options.library === "ethers")
			await activate(provider.value as WalletProvider);
		console.log("connected to metamask wallet");
	};

	// clear then set state
	const disconnect = (): void => {
		clear();
		if (onDisconnectCallback.value)
			onDisconnectCallback.value("Disconnect from Dapp");
	};

	// ========================= EIP-1193 subscribers

	// listen disconnect event
	function subscribeDisconnect() {
		switch (walletName.value) {
			// only handle metamask
			case "metamask":
				(provider.value as MetaMaskProvider).on(
					// event
					"disconnect",
					// callback
					(err: MetaMaskProviderRpcError) => {
						clear();
						onDisconnectCallback.value &&
							onDisconnectCallback.value(err.message);
					},
				);
				break;
		}
	}

	// listen accounts change event
	function subscribeAccountsChanged() {
		switch (walletName.value) {
			// only handle metamask
			case "metamask":
				(provider.value as MetaMaskProvider).on(
					// event
					"accountsChanged",
					// callback
					async (accounts: string[]) => {
						options.library === "ethers" &&
							(await activate(provider.value as WalletProvider));
						onAccountsChangedCallback.value &&
							onAccountsChangedCallback.value(accounts);
					},
				);
				break;
		}
	}

	// listen network change event
	function subscribeChainChanged() {
		switch (walletName.value) {
			// only handle metamask
			case "metamask":
				(provider.value as MetaMaskProvider).on(
					// event
					"chainChanged",
					// callback
					async (hexChainId: string) => {
						const chainId = parseInt(hexChainId, 16);
						options.library === "ethers" &&
							(await activate(provider.value as WalletProvider));
						onChainChangedCallback.value &&
							onChainChangedCallback.value(chainId);
					},
				);
				break;
		}
	}

	// ========================= callback

	const onDisconnect = (callback: OnDisconnectCallback): void => {
		onDisconnectCallback.value = callback;
	};

	const onAccountsChanged = (callback: OnAccountsChangedCallback): void => {
		onAccountsChangedCallback.value = callback;
	};

	const onChainChanged = (callback: OnChainChangedCallback): void => {
		onChainChangedCallback.value = callback;
	};

	return {
		// state
		provider,
		status,
		walletName,
		error,

		// getters
		isConnected,

		// methods
		connect,
		disconnect,

		// callback
		onDisconnect,
		onAccountsChanged,
		onChainChanged,
	};
}
