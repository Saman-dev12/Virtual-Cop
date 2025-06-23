"use client"
import { DashHead } from "./components/dash-head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <DashHead/>
     {children}
    </div>
  );
}
