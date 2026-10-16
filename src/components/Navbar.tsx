"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolioConfig } from "@/config/portfolio";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandPalette } from "@/components/CommandPalette";
import { TerminalModal } from "@/components/TerminalModal";
import { 
  Command, 
  Terminal, 
  Menu, 
  X 
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", isRoute: true },
    { label: "About", href: "/#about", isRoute: false },
    { label: "Projects", href: "/projects", isRoute: true },
    { label: "Cybersecurity", href: "/cybersecurity", isRoute: true },
    { label: "Learning Log", href: "/learning", isRoute: true },
    { label: "Notes", href: "/notes", isRoute: true },
    { label: "Ventures", href: "/#ventures", isRoute: false },
    { label: "Contact", href: "/#contact", isRoute: false },
  ];

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? "bg-bg-main/85 backdrop-blur-md border-border-main/80 shadow-xs"
            : "bg-bg-main/50 backdrop-blur-xs border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 px-1.5"
            aria-label="Bond Digital Headquarters Home"
          >
            <span className="font-mono text-base font-bold tracking-widest text-text-primary group-hover:text-accent transition-colors">
              {portfolioConfig.monogram}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors text-xs font-mono uppercase tracking-wider ${
                    active
                      ? "text-accent bg-bg-card border border-border-main"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Command Palette Button */}
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border-main bg-bg-card hover:border-accent text-text-secondary hover:text-text-primary text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open command palette"
              title="Search and commands (Ctrl+K or ⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-[11px] text-text-muted">Search</span>
              <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-bg-secondary border border-border-main text-text-muted">
                ⌘K
              </kbd>
            </button>

            {/* Terminal Trigger */}
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border-main bg-bg-card text-text-secondary hover:text-accent hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open developer terminal"
              title="Developer CLI Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border-main bg-bg-card text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border-main bg-bg-card px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-border-subtle">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandPaletteOpen(true);
                }}
                className="flex items-center justify-center gap-2 p-2 rounded-md border border-border-main bg-bg-secondary text-xs text-text-primary"
              >
                <Command className="w-3.5 h-3.5 text-accent" />
                <span>Command (⌘K)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTerminalOpen(true);
                }}
                className="flex items-center justify-center gap-2 p-2 rounded-md border border-border-main bg-bg-secondary text-xs text-text-primary"
              >
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>CLI Terminal</span>
              </button>
            </div>

            <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isLinkActive(link.href)
                      ? "text-accent bg-bg-secondary font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
