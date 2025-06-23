"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import type { Connector } from 'wagmi';
import { Wallet } from "lucide-react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WalletButtonsProps {
  variant?: 'desktop' | 'mobile';
}

export function WalletButtons({ variant = 'desktop' }: WalletButtonsProps) {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();


  useEffect(() => {
    if (isConnected && address) {
      Cookies.set('address', address, { path: '/' });
      router.refresh(); 
    } else {
      Cookies.remove('address');
    }
  }, [isConnected, address, router]);

  const handleConnect = async (connector: Connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      Cookies.remove('address');
      router.refresh();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  if (address) {
    return (
      <div className={`flex ${variant === 'mobile' ? 'flex-col items-start' : 'items-center'} space-x-2`}>
        <span className="text-orange-300/80 text-xs">Connected:</span>
        <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-xs">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDisconnect}
          className={`${variant === 'mobile' ? 'w-full mt-2' : 'ml-2'} bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20`}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  const metaMaskConnector = connectors[0];

  return (
    <Button
      size="sm"
      className={`${variant === 'mobile' ? 'w-full' : ''} bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white flex items-center gap-2`}
      onClick={() => handleConnect(metaMaskConnector)}
    >
      <Wallet className="w-4 h-4" />
      Connect MetaMask
    </Button>
  );
}
