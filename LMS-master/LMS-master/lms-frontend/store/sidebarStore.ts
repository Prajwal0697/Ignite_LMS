import { create } from 'zustand';

export interface VideoItem {
  id: number;
  title: string;
  order_index: number;
  duration_seconds: number | null;
  is_completed: boolean;
  locked: boolean;
}

export interface SectionItem {
  id: number;
  title: string;
  order_index: number;
  videos: VideoItem[];
}

interface SidebarState {
  subjectTitle: string;
  sections: SectionItem[];
  isLoading: boolean;
  error: string | null;
  setSidebar: (title: string, sections: SectionItem[]) => void;
  markVideoCompleted: (videoId: number) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  subjectTitle: '',
  sections: [],
  isLoading: false,
  error: null,

  setSidebar: (title, sections) => set({ subjectTitle: title, sections, error: null }),

  markVideoCompleted: (videoId) =>
    set((state) => ({
      sections: state.sections.map((sec) => ({
        ...sec,
        videos: sec.videos.map((v) => {
          if (v.id === videoId) return { ...v, is_completed: true };
          // Unlock next video
          const idx = sec.videos.findIndex((x) => x.id === videoId);
          if (sec.videos[idx + 1]?.id === v.id) return { ...v, locked: false };
          return v;
        }),
      })),
    })),

  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
}));
