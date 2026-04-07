import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import LiveBadge from "@/components/ui/LiveBadge";

const regions = ["BR1", "NA1", "EUW1", "KR", "LAS"];
const suggestions = ["Faker", "T1", "ShowMaker"];

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [region, setRegion] = useState("BR1");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Grid pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--text-primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Teal blob */}
        <div
          className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: "hsl(var(--blue-team))", filter: "blur(120px)" }}
        />
        {/* Red blob */}
        <div
          className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: "hsl(var(--red-team))", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-bg-border bg-elevated px-4 py-2"
        >
          <LiveBadge />
          <span className="font-mono text-xs text-text-secondary">— 847 active matches on BR1</span>
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="font-display text-[40px] font-bold leading-tight tracking-tight text-text-primary md:text-7xl" style={{ letterSpacing: "-1px" }}>
            TRACK EVERY KILL.
          </h1>
          <h1
            className="font-display text-[40px] font-bold leading-tight tracking-tight text-gold md:text-7xl"
            style={{ letterSpacing: "-1px", textShadow: "0 0 40px rgba(200,155,60,0.4)" }}
          >
            IN REAL TIME.
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-[540px] font-body text-lg text-text-secondary"
        >
          Monitor live League of Legends matches with professional-grade metrics. KDA, gold, vision, objectives — updated every 5 seconds.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex w-full max-w-[580px]"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Enter summoner name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-[52px] w-full rounded-l border border-bg-border bg-elevated pl-12 pr-4 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all duration-200"
            />
          </div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-[52px] border-y border-r border-bg-border bg-elevated px-3 font-mono text-sm text-text-secondary focus:outline-none"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button className="h-[52px] rounded-r bg-gold px-7 font-display text-[15px] font-bold tracking-widest text-void transition-all duration-200 hover:bg-gold-glow hover:shadow-[0_4px_24px_rgba(200,155,60,0.35)]">
            TRACK LIVE
          </button>
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-center gap-1 font-mono text-xs text-text-muted"
        >
          Try:
          {suggestions.map((name) => (
            <button
              key={name}
              onClick={() => setSearchValue(name)}
              className="text-text-muted transition-colors hover:text-text-secondary"
            >
              {name}
            </button>
          ))}
        </motion.div>

        {/* Mock match card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="mt-16 w-full max-w-[680px] rounded-lg border border-bg-border bg-surface p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              {/* Blue team */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-team">BLUE</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`b${i}`} className="h-10 w-10 rounded-full border-2 border-blue-team bg-elevated" />
                  ))}
                </div>
              </div>
              {/* VS */}
              <div className="pl-12 font-display text-sm font-bold text-text-muted">VS</div>
              {/* Red team */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-red-team">RED&nbsp;</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`r${i}`} className="h-10 w-10 rounded-full border-2 border-red-team bg-elevated" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <LiveBadge />
                <span className="font-mono text-sm text-text-secondary">14:32</span>
              </div>
              <div className="font-mono text-sm">
                <span className="text-blue-team">4</span>
                <span className="text-text-muted"> / </span>
                <span className="text-red-team">2</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
