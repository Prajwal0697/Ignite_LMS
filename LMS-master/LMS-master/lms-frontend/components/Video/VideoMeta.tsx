'use client';
import { 
  Clock, CheckCircle2, ChevronLeft, ChevronRight, 
  BookOpen, Share2, Info, Layout, Layers, Bookmark 
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  title: string;
  description?: string;
  sectionTitle: string;
  subjectTitle: string;
  subjectId: number;
  durationSeconds?: number;
  isCompleted: boolean;
  prevVideoId: number | null;
  nextVideoId: number | null;
}

function formatDuration(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

export default function VideoMeta({
  title, description, sectionTitle, subjectTitle, subjectId,
  durationSeconds, isCompleted, prevVideoId, nextVideoId
}: Props) {
  return (
    <div className="mt-12 space-y-10 pb-20 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="flex flex-col gap-6 max-w-4xl">
          {/* Breadcrumb / Course Path */}
          <div className="flex items-center flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-text select-none">
            <Link href={`/subjects/${subjectId}`} className="flex items-center gap-1.5 hover:text-white transition-colors group">
              <BookOpen size={11} className="text-gold group-hover:scale-110 transition-transform" />
              {subjectTitle}
            </Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="flex items-center gap-1.5 opacity-80">
               <Layers size={11} className="text-gold" />
               {sectionTitle}
            </span>
          </div>

          {/* Title and Status */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <h1 className="font-serif text-3xl md:text-5xl text-white leading-[1.15] drop-shadow-2xl">{title}</h1>
            {isCompleted && (
              <span className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-jade/10 text-jade border border-jade/20 shadow-lg shadow-jade/10 translate-y-2">
                <CheckCircle2 size={12} />
                Mastered
              </span>
            )}
          </div>

          {/* Meta Meta Meta! */}
          <div className="flex items-center flex-wrap gap-10 pt-4">
             {durationSeconds && (
                <div className="flex flex-col gap-1.5">
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-text">Duration</p>
                   <span className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
                      <Clock size={15} className="text-gold" />
                      {formatDuration(durationSeconds)}
                   </span>
                </div>
             )}
             <div className="flex flex-col gap-1.5">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-text">Course Level</p>
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
                   <Bookmark size={15} className="text-gold" />
                   Premium Member
                </span>
             </div>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3 md:mb-2 translate-y-[-10px]">
           <button title="Share Course" className="p-3 rounded-2xl bg-slate-glass border border-slate-border text-white hover:text-gold hover:border-gold/30 hover:scale-[1.05] active:scale-[0.95] transition-all">
              <Share2 size={18} />
           </button>
           <button title="Course Info" className="p-3 rounded-2xl bg-slate-glass border border-slate-border text-white hover:text-gold hover:border-gold/30 hover:scale-[1.05] active:scale-[0.95] transition-all">
              <Info size={18} />
           </button>
        </div>
      </div>

      {/* Description Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 pt-10 border-t border-slate-border/20">
         <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white">
               <Layout size={18} className="text-gold" />
               <h3 className="font-serif text-xl">Lesson Overview</h3>
            </div>
            {description ? (
              <div className="text-slate-text text-base leading-relaxed max-w-4xl space-y-4">
                 <p>{description}</p>
              </div>
            ) : (
              <p className="text-slate-text italic animate-pulse">Our expert instructors are currently finalizing the detailed notes for this lesson. Check back shortly.</p>
            )}
         </div>
      </div>

      {/* Footer Nav Integration */}
      <div className="flex flex-wrap items-center justify-between gap-6 pt-12 border-t border-slate-border/10">
        {prevVideoId ? (
          <Link href={`/subjects/${subjectId}/video/${prevVideoId}`}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-glass border border-slate-border text-xs font-bold uppercase tracking-widest text-slate-text hover:text-white transition-all shadow-xl hover:shadow-gold/5">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Previous Session
          </Link>
        ) : <div className="hidden md:block" />}

        {nextVideoId && (
          <Link href={`/subjects/${subjectId}/video/${nextVideoId}`}
            className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-2xl shadow-gold/20 scale-105">
            Continue Journey
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
