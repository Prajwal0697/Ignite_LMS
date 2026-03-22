export default function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
