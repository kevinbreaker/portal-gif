import { ref } from 'vue'

export default function useWalletConnect() {
  const hasConnection = ref(false)
  const publicKey = ref(null)

  async function isWalletConnected() {
    try {
      const provider = await getProvider()

      const response = await provider.connect({ onlyIfTrusted: true })
      const key = response.publicKey.toString()

      hasConnection.value = true
      publicKey.value = key
    }
    catch (error) {
      hasConnection.value = false
      publicKey.value = null

      console.error(error)
    }
  }

  async function connectWallet() {
    try {
      const provider = await getProvider()
      const response = await provider.connect()

      const key = response.publicKey.toString()

      hasConnection.value = true
      publicKey.value = key
    }
    catch (error) {
      hasConnection.value = false
      publicKey.value = null

      console.error(error)
    }
  }

  return {
    hasConnection,
    publicKey,
    connectWallet,
    isWalletConnected,
  }
}

async function getProvider() {
  if (!window.solana) {
    alert('Objeto Solana não encontrado! Instale a Phantom Wallet 👻')
    window.open('https://phantom.app/', '_blank')
    return Promise.reject(new Error('No has wallet'))
  }

  if ('phantom' in window) {
    const provider = window.phantom!.solana

    return Promise.resolve(provider)
  }

  return Promise.resolve(window.solana)
}
