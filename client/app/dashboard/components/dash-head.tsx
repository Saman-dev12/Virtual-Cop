"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { Wallet } from "lucide-react";
import type { Connector } from "wagmi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import axios from "axios";
import { toast } from "sonner"


export function DashHead() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      Cookies.set("address", address, { path: "/" });
      router.refresh();
    } else {
      Cookies.remove("address");
    }
  }, [isConnected, address, router]);

  const handleConnect = async (connector: Connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
      console.log(res.data)
      await disconnect();
      toast.success("Logged out successfully")
      Cookies.remove('address');
      router.refresh();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const metaMaskConnector = connectors[0];

  return (
    <header className="w-full px-4 py-3 bg-gray-900 border-b border-gray-800 shadow-sm flex items-center justify-between">
      <div className="text-white text-lg font-semibold flex items-center gap-2">
        <Wallet className="w-5 h-5 text-orange-400" />
      </div>

      <div className="flex items-center space-x-3">
        {address ? (
          <>
            <span className="text-orange-300/80 text-sm hidden sm:block">
              Connected:
            </span>
            <span className="px-2 py-1 rounded text-white bg-blue-950 text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDisconnect}
              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            className="bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white flex items-center gap-2"
            onClick={() => handleConnect(metaMaskConnector)}
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
