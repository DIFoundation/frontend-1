"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { CustomButton } from "./ui/CustomButton"
import { useRouter } from 'next/navigation';

export function CustomConnectButton() {
  const { isConnected, address, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleClick = () => {
    if (isConnected && address) {
      disconnect();
      router.refresh();
    } else {
      // Connect to the first available connector (e.g., MetaMask, WalletConnect)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
    }
  };

  return (
    <CustomButton
      onClick={handleClick}
      variant={isConnected ? 'secondary' : 'primary'}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 
       isConnected && address ? 
       `${address.slice(0, 6)}...${address.slice(-4)}` : 
       'Connect Wallet'}
    </CustomButton>
  );
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <CustomButton 
          label="Disconnect"
          onClick={() => disconnect()}
          variant="secondary"
        />
      </div>
    )
  }

  return (
    <RainbowConnectButton.Custom>
      {({ openConnectModal }) => (
        <CustomButton
          label="Connect Wallet"
          onClick={openConnectModal}
          variant="primary"
        />
      )}
    </RainbowConnectButton.Custom>
  )
}
