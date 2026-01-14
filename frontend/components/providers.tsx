"use client"

import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/lib/wagmi"
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'wagmi/chains'
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { Transition } from "framer-motion"

// Set up react-query client
const queryClient = new QueryClient()

// Animation variants for page transitions
const pageVariants = {
  hidden: { opacity: 0, x: -10 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
}

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
}

function PageAnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Use the API key from environment variables
  const okApiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'development-key'
  
  // Disable OnchainKit telemetry/analytics to avoid CORS noise during local dev
  const okConfig = { analytics: false } as const

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider 
          chain={base} 
          apiKey={okApiKey} 
          config={okConfig}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PageAnimationProvider>
              {children}
            </PageAnimationProvider>
          </ThemeProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}