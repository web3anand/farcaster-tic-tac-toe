'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { GameProvider } from '@/contexts/GameContext'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, base],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'TicTacToe Battle',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains,
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <GameProvider>
          {children}
        </GameProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
