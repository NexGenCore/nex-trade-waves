"use client"

import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

// Configure chains & providers for Base network
export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: 'Nex Trade Waves',
      preference: 'all',
      version: '4',
    }),
  ],
})