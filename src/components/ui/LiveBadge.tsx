interface LiveBadgeProps {
  count?: number;
}

const LiveBadge = ({ count }: LiveBadgeProps) => {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-status-live">
      <span className="live-dot inline-block h-2 w-2 rounded-full bg-status-live" />
      <span>LIVE</span>
      {count !== undefined && <span className="text-text-secondary">{count}</span>}
    </span>
  );
};

export default LiveBadge;
