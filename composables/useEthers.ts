import { ethers } from "ethers";
import { WalletProvider } from "./useWallet";

const isActivated = ref(false);
const provider = ref<ethers.providers.Web3Provider | null>(null);
const signer = ref<ethers.Signer | null>(null);
const network = ref<ethers.providers.Network | null>(null);
const address = ref("");
const balance = ref<bigint>(BigInt(0));

const deactivate = () => {
	isActivated.value = false;
	provider.value = null;
	signer.value = null;
	network.value = null;
	address.value = "";
	balance.value = BigInt(0);
};

async function activate(walletProvider: WalletProvider) {
	const _provider = new ethers.providers.Web3Provider(
		walletProvider as ethers.providers.ExternalProvider,
	);
	const _signer = _provider.getSigner();
	const _network = await _provider.getNetwork();
	const _address = await _signer.getAddress();
	const _balance = await _signer.getBalance();

	provider.value = markRaw(_provider);
	signer.value = markRaw(_signer);
	network.value = _network;
	address.value = _address;
	balance.value = _balance.toBigInt();

	isActivated.value = true;
}

export function useEthers() {
	const chainId = computed(() => network.value?.chainId);

	return {
		// state
		isActivated,
		provider,
		signer,
		network,
		address,
		balance,

		// getters
		chainId,

		// methods
		activate,
		deactivate,
	};
}
