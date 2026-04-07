import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PlayerCard from "@/components/ui/PlayerCard";

const mockPlayer = {
  summonerName: "Faker",
  championName: "Azir",
  championId: 268,
  position: "MID" as const,
  team: "blue" as const,
  kills: 8,
  deaths: 2,
  assists: 11,
  cs: 234,
  gold: 14200,
  items: [3157, 3165, 3089, 3285, 3135, 0],
  level: 16,
};

const bullets = [
  "Updates every 5–10 seconds via WebSocket",
  "Supports up to 10 simultaneous tracked games",
  "Zero delay notifications for high-impact events",
];

const LivePreviewSection = () => {
  return (
    <section className="bg-void px-4 py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <span className="font-mono text-[11px] font-medium tracking-[4px] text-gold">REAL-TIME DASHBOARD</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl">
            Every stat. Every second.
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-secondary">
            Watch KDA shift, gold accumulate and objectives fall as the match unfolds. No refreshing — the data comes to you.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 font-body text-sm text-text-secondary">
                <CheckCircle size={16} className="shrink-0 text-gold" />
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/dashboard"
            className="mt-8 inline-block font-body text-sm font-semibold text-gold transition-colors hover:underline"
          >
            Start tracking now →
          </Link>
        </motion.div>

        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-xs"
        >
          <PlayerCard {...mockPlayer} />
        </motion.div>
      </div>
    </section>
  );
};

export default LivePreviewSection;
