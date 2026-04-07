const Footer = () => {
  return (
    <footer className="border-t border-bg-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="hsl(var(--gold-dim))" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" stroke="hsl(var(--gold-dim))" strokeWidth="1.5" />
          </svg>
          <span className="font-body text-[13px] text-text-muted">
            LiveMatch Tracker is not affiliated with Riot Games.
          </span>
        </div>
        <div className="flex items-center gap-4">
          {["GitHub", "Docs", "Privacy"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-[13px] text-text-muted transition-colors hover:text-text-secondary"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
