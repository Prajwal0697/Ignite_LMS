'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, Lock, PlayCircle, ChevronDown, 
  ChevronRight, Clock, ShieldCheck, List, Layers 
} from 'lucide-react';
import { useSidebarStore } from '../../store/sidebarStore';
import { useVideoStore } from '../../store/videoStore'; // Correct import path
import apiClient from '../../lib/apiClient';
import clsx from 'clsx';

interface Props { subjectId: number; }

function formatDuration(seconds: number | null): string {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function SubjectSidebar({ subjectId }: Props) {
  const { sections, subjectTitle, isLoading, setSidebar, setLoading, setError } = useSidebarStore();
  const { currentVideoId } = useVideoStore();
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/subjects/${subjectId}/tree`)
      .then(({ data }) => setSidebar(data.title, data.sections))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [subjectId, setSidebar, setLoading, setError]);

  const toggleSection = (id: number) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalVideos = sections.reduce((acc, s) => acc + s.videos.length, 0);
  const completedVideos = sections.reduce((acc, s) => acc + s.videos.filter((v) => v.is_completed).length, 0);
  const pct = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  if (isLoading) return (
    <div className="flex-1 p-6 space-y-4 bg-[#0d0d14]">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="shimmer-line h-10 rounded-xl" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0d0d14] select-none border-r border-slate-border/30">
      {/* Subject Header */}
      <div className="px-6 py-8 border-b border-slate-border/20 bg-gradient-to-b from-[#0a0a0f] to-transparent">
        <div className="inline-flex px-2 py-0.5 rounded bg-gold/10 text-gold text-[8px] font-black uppercase tracking-widest mb-3 border border-gold/20">
           Curriculum
        </div>
        <h2 className="font-serif text-xl md:text-2xl text-white leading-tight mb-6 drop-shadow-2xl">{subjectTitle}</h2>
        
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-text mb-2.5">
          <span className="flex items-center gap-1.5"><List size={10} className="text-gold" /> {completedVideos}/{totalVideos} mastered</span>
          <span className="text-gold">{pct}%</span>
        </div>
        <div className="progress-bar h-1.5 shadow-inner">
          <div className="progress-fill h-full rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Section list */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide space-y-2">
        {sections.map((section, idx) => {
          const isOpen = !collapsed[section.id];
          const sectionCompleted = section.videos.every((v) => v.is_completed);

          return (
            <div key={section.id} className="animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all mb-1 border group",
                  isOpen ? "bg-slate-glass/50 border-slate-border/50 text-white" : "bg-transparent border-transparent text-slate-text hover:bg-slate-glass/20 hover:text-white"
                )}>
                <div className={clsx(
                  "w-5 h-5 rounded-lg flex items-center justify-center border transition-colors",
                  sectionCompleted ? "bg-gold text-black border-gold" : "bg-slate-border/20 text-slate-text border-slate-border/50 group-hover:border-gold/30"
                )}>
                   {sectionCompleted ? <ShieldCheck size={12} /> : <Layers size={12} />}
                </div>
                <span className="flex-1 text-left">{section.title}</span>
                {isOpen ? <ChevronDown size={14} className="opacity-50" /> : <ChevronRight size={14} className="opacity-50" />}
              </button>

              {/* Videos */}
              {isOpen && (
                <div className="ml-4 mt-2 mb-4 space-y-1">
                  {section.videos.map((video) => {
                    const isActive = video.id === currentVideoId;
                    return (
                      <Link
                        key={video.id}
                        href={video.locked ? '#' : `/subjects/${subjectId}/video/${video.id}`}
                        onClick={(e) => video.locked && e.preventDefault()}
                        className={clsx(
                          'flex items-center gap-4 px-4 py-3 rounded-xl text-xs transition-all relative group',
                          isActive ? 'bg-gold text-black font-bold shadow-lg shadow-gold/20 scale-[1.02] z-10' : 'text-slate-text hover:bg-slate-glass/30 hover:text-white',
                          video.locked && 'opacity-40 grayscale cursor-not-allowed'
                        )}>
                        
                        {/* Status icon/Visual pointer */}
                        <div className="relative shrink-0 w-4 h-4 flex items-center justify-center">
                          {video.is_completed ? (
                            <CheckCircle2 size={16} className={isActive ? 'text-black' : 'text-jade'} />
                          ) : video.locked ? (
                            <Lock size={14} className="text-slate-text" />
                          ) : isActive ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-border group-hover:border-gold/50 transition-colors" />
                          )}
                        </div>

                        <span className="flex-1 leading-snug line-clamp-2 uppercase tracking-tight font-medium">
                          {video.title}
                        </span>

                        {video.duration_seconds && (
                          <span className={clsx(
                            "shrink-0 flex items-center gap-1 text-[9px] font-bold opacity-70",
                            isActive ? "text-black" : "text-slate-text"
                          )}>
                            <Clock size={10} />
                            {formatDuration(video.duration_seconds)}
                          </span>
                        )}
                        
                        {/* Active Glow */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-xl opacity-30" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      {/* Footer Support/Contact Tip */}
      <div className="px-6 py-6 border-t border-slate-border/20 bg-[#0a0a0f]/50">
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-text text-center opacity-40">
            Aura Premium Courseware
         </p>
      </div>
    </div>
  );
}
