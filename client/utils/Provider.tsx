"use client"
import { config } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryclient = new QueryClient();

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryclient}>
    {children}
  </QueryClientProvider>
  </WagmiProvider>
  );
}
