import {
  type Commitment,
  Connection,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js'

import type { Provider } from '@project-serum/anchor'

import {
  AnchorProvider,
  type Idl,
  Program,
  web3,
} from '@project-serum/anchor'

import _keys from '../_keypair.json'

import idl from '../idl.json'

interface Opts {
  preflightCommitment: Commitment
}

export function useProvider() {
  const { SystemProgram, Keypair } = web3

  const _secret = new Uint8Array(Object.values(_keys._keypair.secretKey))
  const baseAccount = Keypair.fromSecretKey(_secret)

  const programID = new PublicKey(idl.metadata.address)

  const network = clusterApiUrl('devnet')

  const opts: Opts = {
    preflightCommitment: 'processed',
  }

  function getProvider() {
    const connection = new Connection(network, opts.preflightCommitment)

    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts,
    )

    return provider
  }

  function getProgram(provider: Provider) {
    return new Program(idl as Idl, programID, provider)
  }

  return {
    getProvider,
    getProgram,
    SystemProgram,
    baseAccount,
  }
}
