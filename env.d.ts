/// <reference types="vite/client" />
/// <reference types="@solana/web3.js"/>
// import { type PublicKey } from '@solana/web3.js'

type ConnectParams = {
  onlyIfTrusted?: boolean
}

interface Solana {
  connect: (params?: ConnectParams) => any
  disconnect: () => any
  isPhantom: boolean
  publicKey: typeof PublicKey | null
  request: (t: any) => any
  signMessage: (t: any) => any
  signTransaction: (t: any) => any
  signAllTransactions: (t: any) => any
  postMessage: (t: any) => any
}

interface Window {
  solana?: Solana
  phantom?: {
    solana: Solana
  }
}
