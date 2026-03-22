'use client';
import { useVideoStore } from '../../store/videoStore';

export default function VideoProgressBar() {
  const { currentTime, duration } = useVideoStore();
  const pct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div className="mt-3">
      <div className="progress-bar h-0.5">
        <div className="progress-fill h-full transition-all duration-1000" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
