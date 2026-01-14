"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useConnect, useDisconnect, useAccount } from "wagmi"

type WalletKey = "metamask" | "coinbase"

type BasecoinWalletModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BasecoinWalletModal({ open, onOpenChange }: BasecoinWalletModalProps) {
  const { toast } = useToast()
  const { isConnected, address } = useAccount()
  const { connectAsync, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      })
    }
  }, [error, toast])

  const selectWallet = async (key: WalletKey) => {
    try {
      const targetId = key === "metamask" ? "metaMask" : "coinbaseWallet"
      const connector = connectors.find((c) => c.id === targetId)
      if (!connector) {
        const installUrl = key === "metamask"
          ? "https://metamask.io/download/"
          : "https://www.coinbase.com/wallet/downloads"
        window.open(installUrl, "_blank")
        return
      }
      const result = await connectAsync({ connector })
      onOpenChange(false)
      const addr = (result as any)?.accounts?.[0] || address || ""
      toast({
        title: "Wallet connected successfully",
        description: addr ? `Connected to ${addr.slice(0, 6)}…${addr.slice(-4)}` : "Connected",
      })
    } catch (err: any) {
      console.error("Wallet connect error:", err)
      toast({ title: "Connection Failed", description: err?.message || "Unable to connect", variant: "destructive" })
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100000] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[100010] flex items-center justify-center p-4">
          <div className="w-[92vw] max-w-md rounded-xl p-6 border border-border bg-background">
          <div className="flex items-center space-x-2 mb-4">
            <Wallet className="h-5 w-5 text-primary" />
            <Dialog.Title className="font-semibold">Connect Base Wallet</Dialog.Title>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Choose a wallet to connect to the Base network.</p>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => selectWallet("metamask")} 
              className="rounded-lg p-4 hover:bg-muted/50 flex flex-col items-center border border-muted"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mb-2" />
              <span className="mt-2 text-sm">MetaMask</span>
            </button>
            <button 
              onClick={() => selectWallet("coinbase")} 
              className="rounded-lg p-4 hover:bg-muted/50 flex flex-col items-center border border-muted"
            >
              <div className="bg-blue-200 border-2 border-dashed rounded-xl w-12 h-12 mb-2" />
              <span className="mt-2 text-sm">Coinbase Wallet</span>
            </button>
          </div>

          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">Don't have a wallet? We'll open the install page.</p>

          {isConnected && (
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={async () => {
                await disconnect()
                toast({ title: "Wallet disconnected", description: "You are now disconnected from Base network." })
                onOpenChange(false)
              }}
            >
              Disconnect Wallet
            </Button>
          )}

          <Dialog.Close asChild>
            <Button variant="outline" className="mt-4 w-full">Close</Button>
          </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}