"use client"

import { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function BasecoinWalletConnect() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, error, isPending, status } = useConnect()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()
  const [shortAddress, setShortAddress] = useState("")

  useEffect(() => {
    if (address) {
      setShortAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`)
    }
  }, [address])

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

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <span>{shortAddress}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Base Wallet Connected</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start">
            <span className="font-medium">Address</span>
            <span className="text-xs text-gray-500">{shortAddress}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start">
            <span className="font-medium">Connector</span>
            <span className="text-xs text-gray-500">{connector?.name}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => {
              disconnect()
              toast({
                title: "Wallet disconnected",
                description: "You are now disconnected from Base network.",
              })
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Get available connectors
  const availableConnectors = connectors.filter(c => c.ready)
  const coinbaseConnector = connectors.find(c => c.id === "coinbaseWallet")
  const metaMaskConnector = connectors.find(c => c.id === "metaMask")
  const injectedConnector = connectors.find(c => c.id === "injected")
  
  // Use Coinbase connector as primary for Base network, then MetaMask, then injected
  const preferredConnector = coinbaseConnector || metaMaskConnector || injectedConnector || availableConnectors[0]

  return (
    <div className="flex items-center space-x-2">
      {preferredConnector ? (
        <Button
          onClick={() => {
            if (preferredConnector) {
              connect({ connector: preferredConnector })
            } else {
              toast({
                title: "Connection Error",
                description: "No wallet connector available",
                variant: "destructive"
              })
            }
          }}
          variant="outline"
          className="flex items-center space-x-2"
          disabled={isPending}
        >
          <Wallet className="w-4 h-4" />
          <span>{isPending ? "Connecting..." : "Connect Base Wallet"}</span>
        </Button>
      ) : (
        <Button variant="outline" disabled className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>No Wallet Found</span>
        </Button>
      )}
      {error && <div className="text-red-500 text-sm">Error: {error.message}</div>}
    </div>
  )
}