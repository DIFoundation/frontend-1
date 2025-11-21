// components/CustomConnectButton.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import { CustomButton } from "./ui/CustomButton"
import { Copy, LogOut, Wallet } from "lucide-react"
import { toast } from "sonner"

export function CustomConnectButton() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { open, disconnect } = useAppKit()
  const { isConnected, address } = useAppKitAccount()

  const handleConnect = () => {
    open({ view: "Connect" })
    setIsOpen(false)
  }

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
  }

  const copyToClipboard = () => {
    if (!address) return
    navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard')
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!isConnected) {
    return (
      <CustomButton
        label="Connect Wallet"
        onClick={handleConnect}
        variant="primary"
        icon={<Wallet className="w-4 h-4 mr-2" />}
      />
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <CustomButton
        label={`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        onClick={() => setIsOpen(!isOpen)}
        variant="primary"
        icon={<Wallet className="w-4 h-4 mr-2" />}
        iconPosition="left"
      />
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="none">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <p className="font-medium">Connected Wallet</p>
              <p className="text-xs text-gray-500 truncate">{address}</p>
            </div>
            
            <button
              onClick={copyToClipboard}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Copy className="w-4 h-4 mr-2 text-gray-500" />
              Copy Address
            </button>
            
            <button
              onClick={handleDisconnect}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              role="menuitem"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
