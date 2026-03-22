import { create } from 'zustand';

interface VideoState {
  currentVideoId: number | null;
  subjectId: number | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isCompleted: boolean;
  nextVideoId: number | null;
  prevVideoId: number | null;

  setVideo: (id: number, subjectId: number) => void;
  setTime: (t: number) => void;
  setDuration: (d: number) => void;
  setPlaying: (v: boolean) => void;
  setCompleted: (v: boolean) => void;
  setNavigation: (prev: number | null, next: number | null) => void;
  reset: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideoId: null,
  subjectId: null,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isCompleted: false,
  nextVideoId: null,
  prevVideoId: null,

  setVideo: (id, subjectId) => set({ currentVideoId: id, subjectId, isCompleted: false, currentTime: 0 }),
  setTime: (t) => set({ currentTime: t }),
  setDuration: (d) => set({ duration: d }),
  setPlaying: (v) => set({ isPlaying: v }),
  setCompleted: (v) => set({ isCompleted: v }),
  setNavigation: (prev, next) => set({ prevVideoId: prev, nextVideoId: next }),
  reset: () => set({ currentVideoId: null, currentTime: 0, duration: 0, isPlaying: false, isCompleted: false }),
}));
