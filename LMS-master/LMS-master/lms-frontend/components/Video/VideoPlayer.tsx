'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { useVideoStore } from '../../store/videoStore';
import { sendProgress, sendProgressImmediate } from '../../lib/progress';

interface Props {
  videoId: number;
  youtubeUrl: string;
  startPositionSeconds?: number;
  onCompleted?: () => void;
  onProgress?: (seconds: number) => void;
}

function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return url; // assume it's already an ID
}

export default function VideoPlayer({ videoId, youtubeUrl, startPositionSeconds = 0, onCompleted, onProgress }: Props) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);
  const { setTime, setDuration, setPlaying, setCompleted } = useVideoStore();

  const [hasError, setHasError] = useState(false);

  const ytId = extractYouTubeId(youtubeUrl);

  const clearTimer = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(async () => {
      if (!playerRef.current) return;
      try {
        const t = await playerRef.current.getCurrentTime();
        const d = await playerRef.current.getDuration();
        setTime(t);
        setDuration(d);
        onProgress?.(t);
        sendProgress(videoId, Math.floor(t), false);
      } catch (err) {
        console.error('Timer error:', err);
      }
    }, 5000);
  }, [videoId, setTime, setDuration, onProgress]);

  useEffect(() => () => { clearTimer(); }, []);

  const onReady = (e: YouTubeEvent) => {
    playerRef.current = e.target;
    if (startPositionSeconds > 0) e.target.seekTo(startPositionSeconds, true);
    setDuration(e.target.getDuration());
    setHasError(false);
  };

  const onPlay = () => { setPlaying(true); startTimer(); };

  const onPause = async () => {
    setPlaying(false);
    clearTimer();
    if (playerRef.current) {
      try {
        const t = await playerRef.current.getCurrentTime();
        sendProgress(videoId, Math.floor(t), false);
      } catch (err) {
        console.error('Pause error:', err);
      }
    }
  };

  const onEnd = async () => {
    setPlaying(false);
    clearTimer();
    if (!completedRef.current) {
      completedRef.current = true;
      try {
        const d = playerRef.current ? await playerRef.current.getDuration() : 0;
        await sendProgressImmediate(videoId, Math.floor(d), true);
        setCompleted(true);
        onCompleted?.();
      } catch (err) {
        console.error('End error:', err);
      }
    }
  };

  const onError = (e: any) => {
    console.error('YouTube Player Error:', e);
    setHasError(true);
    setPlaying(false);
    clearTimer();
  };

  if (hasError) {
    return (
      <div className="yt-iframe-wrap shadow-glass bg-slate-900 flex flex-col items-center justify-center p-12 text-center gap-6" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', minHeight: '400px' }}>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <div>
          <h3 className="text-xl font-serif text-white mb-2">Video Unavailable</h3>
          <p className="text-slate-text max-w-md mx-auto">
            This video content is currently offline or Restricted. Our instructors are already working on a replacement.
          </p>
        </div>
        <button 
          onClick={onCompleted}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
        >
          Skip to Next Session
        </button>
      </div>
    );
  }

  return (
    <div className="yt-iframe-wrap shadow-glass" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
      <YouTube
        videoId={ytId}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: { autoplay: 0, modestbranding: 1, rel: 0, color: 'white' },
        }}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
        onError={onError}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        className="absolute inset-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
}
