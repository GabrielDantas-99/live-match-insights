import { Activity, Users, Bell, Download, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Activity,
    title: "Live Match Metrics",
    description: "KDA, CS, gold income and vision score updated every 5 seconds via Spectator API.",
  },
  {
    icon: Users,
    title: "Full Team Overview",
    description: "Side-by-side blue and red team breakdowns with champion matchups and spell selections.",
  },
  {
    icon: Bell,
    title: "Event Alerts",
    description: "Instant notifications for Baron, Dragon, kills and tower destructions as they happen.",
  },
  {
    icon: Download,
    title: "Session Export",
    description: "Export full match session data as CSV for post-game analysis and content creation.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-surface px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-[11px] font-medium tracking-[4px] text-gold">FEATURES</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary md:text-[42px]">
            BUILT FOR SERIOUS PLAYERS
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-md border border-bg-border bg-elevated p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/15 bg-gold/[0.08]">
                <feat.icon size={20} className="text-gold" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-text-primary">{feat.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
