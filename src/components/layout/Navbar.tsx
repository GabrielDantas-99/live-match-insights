import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import LiveBadge from "@/components/ui/LiveBadge";

const navLinks = [
  { label: "Live Games", href: "#" },
  { label: "Champions", href: "#" },
  { label: "Rankings", href: "#" },
  { label: "About", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[60px] w-full border-b border-bg-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="12" cy="12" r="10" stroke="hsl(var(--gold-primary))" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" stroke="hsl(var(--gold-primary))" strokeWidth="1.5" />
            <line x1="12" y1="0" x2="12" y2="6" stroke="hsl(var(--gold-primary))" strokeWidth="1.5" />
            <line x1="12" y1="18" x2="12" y2="24" stroke="hsl(var(--gold-primary))" strokeWidth="1.5" />
            <line x1="0" y1="12" x2="6" y2="12" stroke="hsl(var(--gold-primary))" strokeWidth="1.5" />
            <line x1="18" y1="12" x2="24" y2="12" stroke="hsl(var(--gold-primary))" strokeWidth="1.5" />
          </svg>
          <span className="font-display text-lg font-bold tracking-widest text-gold">LIVEMATCH</span>
          <span className="text-text-muted">·</span>
          <span className="font-display text-lg font-medium tracking-widest text-text-secondary">TRACKER</span>
        </Link>

        {/* Center nav - desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Region badge */}
          <button className="flex items-center gap-1.5 rounded-full border border-bg-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-gold/30">
            🇧🇷 <span>BR1</span> <ChevronDown size={12} />
          </button>

          {/* Enter Dashboard */}
          <Link
            to="/dashboard"
            className="rounded border border-gold px-4 py-1.5 font-body text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold hover:text-void"
          >
            Enter Dashboard
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-b border-bg-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/dashboard"
              className="mt-2 w-full rounded border border-gold py-2 text-center font-body text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold hover:text-void"
              onClick={() => setMobileOpen(false)}
            >
              Enter Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
