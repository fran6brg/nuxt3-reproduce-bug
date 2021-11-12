export interface MetaMaskProviderRpcError extends Error {
	message: string;
	code: number;
	data?: unknown;
}
