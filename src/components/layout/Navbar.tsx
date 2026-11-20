"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Shield,
  BookOpen,
  Globe,
  GitCompare,
  Sparkles,
  Clock,
  Search,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Cybercrime Library", href: "/crimes", icon: BookOpen },
  { name: "Countries", href: "/countries", icon: Globe },
  { name: "Compare Laws", href: "/compare", icon: GitCompare },
  { name: "AI & Emerging", href: "/ai-crimes", icon: Sparkles },
  { name: "Legal Timeline", href: "/timeline", icon: Clock },
  { name: "Research Assistant", href: "/research", icon: Search },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#070d1e]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 group-hover:bg-blue-600/30 transition-all">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              CyberLaw <span className="text-blue-400 font-semibold">Atlas</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase block -mt-1">
              Global Cyber Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5",
                  isActive
                    ? "bg-blue-950/80 text-blue-400 border border-blue-800/60 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                )}
              >
                {link.icon && <link.icon className="h-3.5 w-3.5" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action / Admin Link */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/admin"
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-md border border-slate-800 hover:border-slate-700 bg-slate-900/50 transition-colors"
          >
            <Lock className="h-3 w-3 text-slate-400" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#091124] px-4 pt-2 pb-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-blue-900/50 text-blue-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-md"
            >
              <Lock className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
