/// <reference types="vite/client" />


type ConnectParams = {
  onlyIfTrusted?: boolean 
}

interface Solana  {
  connect: (params?: ConnectParams) => any
  disconnect: () => any;
  isPhantom: boolean;
  publicKey: string | null
  request: (t: any) => any;
  signMessage: (t: any) => any;
  signTransaction: (t: any) => any;
  postMessage: (t: any) => any;
};

interface Window {
  solana?: Solana
  phantom?: {
    solana: Solana
  }
}
