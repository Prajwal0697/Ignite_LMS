'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, TrendingUp, Clock, ArrowRight, User, Award, ShieldCheck, Zap } from 'lucide-react';
import AppShell from '../../components/Layout/AppShell';
import AuthGuard from '../../components/Auth/AuthGuard';
import { useAuthStore } from '../../store/authStore';
import apiClient from '../../lib/apiClient';
import Spinner from '../../components/common/Spinner';

interface SubjectProgress {
  id: number; title: string; slug: string;
  total_videos: number; completed_videos: number; percent_complete: number;
  last_video_id: number | null;
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/subjects', { params: { pageSize: 50 } })
      .then(async ({ data }) => {
        const progPromises = data.subjects.map(async (s: any) => {
          try {
            const { data: prog } = await apiClient.get(`/progress/subjects/${s.id}`);
            return { ...s, ...prog };
          } catch {
            return { ...s, total_videos: 0, completed_videos: 0, percent_complete: 0, last_video_id: null };
          }
        });
        const results = await Promise.all(progPromises);
        setSubjects(results.filter((s: SubjectProgress) => s.completed_videos > 0 || s.total_videos > 0));
      })
      .finally(() => setLoading(false));
  }, []);

  const totalCompleted = subjects.reduce((a, s) => a + s.completed_videos, 0);
  const totalVideos = subjects.reduce((a, s) => a + s.total_videos, 0);
  const avgProgress = subjects.length > 0
    ? Math.round(subjects.reduce((a, s) => a + s.percent_complete, 0) / subjects.length) : 0;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0a0a0f] pb-20">
        <AppShell />

        <div className="max-w-6xl mx-auto px-6 pt-24">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-up">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-gold to-gold-light rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-serif bg-slate-glass border border-gold/20 text-gold group-hover:scale-105 transition-transform">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-serif text-3xl text-white tracking-tight">Welcome, {user?.email?.split('@')[0]}</h1>
                  <ShieldCheck size={18} className="text-gold" />
                </div>
                <p className="text-slate-text text-sm font-medium opacity-80 uppercase tracking-[0.15em] flex items-center gap-2">
                   {user?.email} • <span className="text-gold">Aura Member</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-5 py-3 rounded-2xl bg-gold/5 border border-gold/10 flex items-center gap-3">
                  <Award size={18} className="text-gold" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Certified Learner</span>
               </div>
            </div>
          </div>

          {/* Core Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-1">
            {[
              { label: 'Courses Enrolled', value: subjects.length, icon: BookOpen, color: '#ffffff' },
              { label: 'Lessons Mastered', value: totalCompleted, icon: CheckCircle2, color: '#00c9a7' },
              { label: 'Global Progress', value: `${avgProgress}%`, icon: Zap, color: '#ffffff' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] border border-slate-border/50 relative group overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors pointer-events-none" />
                <div className="flex flex-col gap-4">
                   <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-glass border border-slate-border text-gold group-hover:scale-110 transition-transform">
                      <stat.icon size={20} />
                   </div>
                   <div>
                      <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-text mt-1">{stat.label}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Courses & Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 px-1">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-white">Your Learning Journey</h2>
                <Link href="/" className="text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-light transition-colors">Browse Marketplace</Link>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 glass-card rounded-3xl border border-slate-border/30">
                  <Spinner size={32} />
                  <p className="text-slate-text animate-pulse uppercase tracking-widest text-[10px]">Syncing Progress...</p>
                </div>
              ) : subjects.length === 0 ? (
                <div className="glass-card p-16 rounded-[2.5rem] border border-slate-border/50 text-center animate-fade-up">
                  <BookOpen size={48} className="text-slate-text mx-auto mb-6 opacity-20" />
                  <p className="text-slate-text mb-8 text-lg font-serif italic">"Every master was once a beginner."</p>
                  <Link href="/" className="px-10 py-4 bg-gold rounded-2xl text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-light transition-all shadow-xl shadow-gold/20">
                    Explore Free Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map((s, i) => (
                    <div key={s.id} className="glass-card p-8 rounded-[2.5rem] border border-slate-border/30 hover:border-gold/30 transition-all group animate-fade-up"
                      style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-glass border border-slate-border text-gold group-hover:scale-110 transition-transform">
                            <BookOpen size={20} />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full ${s.percent_complete === 100 ? 'bg-jade/10 text-jade border border-jade/20' : 'bg-gold/10 text-gold border border-gold/20'}`}>
                            {s.percent_complete === 100 ? 'Mastered' : 'In Progress'}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors truncate">{s.title}</h3>
                          <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-text uppercase">
                            <span>{s.completed_videos} lessons completed</span>
                            <span className="text-white">{s.percent_complete}%</span>
                          </div>
                          <div className="progress-bar h-1.5 mt-1">
                            <div className="progress-fill h-full" style={{ width: `${s.percent_complete}%` }} />
                          </div>
                        </div>

                        <Link href={s.last_video_id ? `/subjects/${s.id}/video/${s.last_video_id}` : `/subjects/${s.id}`}
                          className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-black hover:border-gold transition-all text-center flex items-center justify-center gap-2">
                          {s.percent_complete === 100 ? 'Review Course' : 'Continue Learning'}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
