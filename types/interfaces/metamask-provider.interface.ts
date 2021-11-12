// import { ethers } from "ethers";

export interface MetaMaskProvider extends Object {
	isMetaMask: boolean;
	isConnected: () => boolean;
	request: (request: {
		method: string;
		params?: any[] | undefined;
	}) => Promise<any>;
	on: (event: string, callback: (param: any) => void) => void;
}
