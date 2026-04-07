import { Swords, Coins } from "lucide-react";
import { motion } from "framer-motion";

interface PlayerCardProps {
  summonerName: string;
  championName: string;
  championId: number;
  position: "TOP" | "JUNGLE" | "MID" | "BOT" | "SUPPORT";
  team: "blue" | "red";
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  gold: number;
  items: number[];
  level: number;
}

const formatGold = (gold: number): string => {
  if (gold >= 1000) return `${(gold / 1000).toFixed(1)}k`;
  return String(gold);
};

const PlayerCard = ({
  summonerName,
  championName,
  position,
  team,
  kills,
  deaths,
  assists,
  cs,
  gold,
  items,
  level,
}: PlayerCardProps) => {
  const teamColor = team === "blue" ? "border-blue-team" : "border-red-team";
  const accentBar = team === "blue" ? "bg-blue-team" : "bg-red-team";
  const kda = ((kills + assists) / Math.max(deaths, 1)).toFixed(2);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="relative flex overflow-hidden rounded-md border border-bg-border bg-surface"
    >
      {/* Left accent bar */}
      <div className={`w-[3px] shrink-0 ${accentBar}`} />

      <div className="flex flex-col gap-3 p-4">
        {/* Top row */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${championName}.png`}
              alt={championName}
              className={`h-12 w-12 rounded-full border-2 ${teamColor} object-cover`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className={`hidden h-12 w-12 rounded-full border-2 ${teamColor} bg-elevated`} />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-void font-mono text-[10px] text-text-primary">
              {level}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-semibold text-text-primary">{summonerName}</span>
            <span className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-text-muted w-fit">
              {position}
            </span>
          </div>
        </div>

        {/* KDA */}
        <div>
          <div className="font-mono text-lg">
            <span className="text-status-live">{kills}</span>
            <span className="text-text-muted"> / </span>
            <span className="text-status-danger">{deaths}</span>
            <span className="text-text-muted"> / </span>
            <span className="text-text-secondary">{assists}</span>
          </div>
          <span className="font-mono text-[11px] text-text-muted">{kda} KDA</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Swords size={12} className="text-text-muted" />
            <span className="font-mono text-[13px] text-text-secondary">{cs}</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins size={12} className="text-gold" />
            <span className="font-mono text-[13px] text-gold">{formatGold(gold)}</span>
          </div>
        </div>

        {/* Items */}
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => {
            const itemId = items[i];
            if (itemId && itemId > 0) {
              return (
                <img
                  key={i}
                  src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/${itemId}.png`}
                  alt={`Item ${itemId}`}
                  className="h-7 w-7 rounded-sm border border-bg-border"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              );
            }
            return (
              <div
                key={i}
                className="h-7 w-7 rounded-sm border border-dashed border-bg-border bg-elevated"
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
