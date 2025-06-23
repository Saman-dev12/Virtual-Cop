"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldAlert } from "lucide-react";
import { WalletButtons } from "../dashboard/components/wallet-buttons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: "File Complaint", href: "#file" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Legal AI", href: "#legal" },
    { name: "Resources", href: "#resources" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-lg shadow-lg shadow-orange-500/10"
          : "bg-black/80 sm:bg-transparent backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:shadow-orange-600/40 transition-all duration-300 group-hover:scale-105">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-tight">
                VeriFIR
              </span>
              <span className="text-xs text-orange-300/80 -mt-1">
                Secure Reporting System
              </span>
            </div>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-orange-500/10 hover:text-orange-500 font-medium"
                      )}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-muted-foreground hover:text-orange-500 focus:outline-none hover:bg-orange-500/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <WalletButtons variant="desktop" />
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg px-5 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20"
              size="sm"
            >
              Officer Login
            </Button>
            <Button
              className="bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 rounded-lg font-medium shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 transition-all duration-300"
              size="default"
            >
              File FIR
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-orange-500/20 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 space-y-3">
              <WalletButtons variant="mobile" />
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Officer Login
              </Button>
              <Button className="w-full sm:w-auto">File FIR</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
