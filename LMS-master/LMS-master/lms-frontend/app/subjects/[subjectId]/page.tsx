'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  BookOpen, PlayCircle, Users, Clock, ChevronRight, Star, 
  Monitor, List, ArrowLeft, Share2, Heart, Award, ShieldCheck, Zap, Sparkles
} from 'lucide-react';
import apiClient from '../../../lib/apiClient';
import Spinner from '../../../components/common/Spinner';
import AppShell from '../../../components/Layout/AppShell';

export default function SubjectOverviewPage() {
  const { subjectId } = useParams();
  const router = useRouter();
  const [subject, setSubject] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [ytVideos, setYtVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ytLoading, setYtLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiClient.get(`/subjects/${subjectId}`),
      apiClient.get(`/progress/subjects/${subjectId}`).catch(() => null),
    ]).then(([subRes, progRes]) => {
      setSubject(subRes.data);
      setProgress(progRes?.data ?? null);
      
      // Fetch YouTube videos
      setYtLoading(true);
      apiClient.get('/youtube', { params: { q: subRes.data.title } })
        .then(res => setYtVideos(res.data.videos || []))
        .catch(console.error)
        .finally(() => setYtLoading(false));

    }).finally(() => setLoading(false));
  }, [subjectId]);

  const startLearning = async () => {
    try {
      const { data } = await apiClient.get(`/subjects/${subjectId}/first-video`);
      router.push(`/subjects/${subjectId}/video/${data.id}`);
    } catch {
      router.push('/');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        fill={i < Math.floor(rating) ? "#ffffff" : "transparent"} 
        className={i < Math.floor(rating) ? "text-accent" : "text-white/10"} 
      />
    ));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
       <Spinner size={32} />
       <p className="text-[10px] font-black uppercase tracking-[0.25em] text-text-secondary animate-pulse">Syncing Subject Intelligence...</p>
    </div>
  );

  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20">
        
        {/* Immersive Cinematic Hero */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-accent/5 blur-[150px] rounded-full -z-10" />
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-8 animate-fade-up">
             <button onClick={() => router.push('/')} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-all group">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[11px] font-black uppercase tracking-[0.2em]">Return to Library</span>
             </button>
             
             <div className="flex flex-col gap-6 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-[0.2em] text-accent w-fit">
                   <Sparkles size={12} fill="currentColor" /> Masterclass Series • {subject?.category || 'Expert Course'}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
                  {subject?.title}
                </h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed italic border-l-2 border-accent/20 pl-8">
                  {subject?.description || 'Curating an elite path towards digital mastery. This curriculum has been rigorously structured for high-impact result transfer.'}
                </p>
             </div>
          </div>
        </section>

        {/* Main Interface Grid */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-16">
               <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/5 group animate-fade-in shadow-3xl">
                  <img 
                     src={subject?.thumbnail_url || `https://img.youtube.com/vi/${subject?.slug}/maxresdefault.jpg`} 
                     alt={subject?.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <button onClick={startLearning} className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-background shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <PlayCircle size={48} fill="currentColor" />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="flex flex-col gap-6 p-8 rounded-[2rem] bg-surface/30 border border-white/5 backdrop-blur-xl">
                     <div className="flex items-center gap-3 text-accent transition-transform group-hover:translate-x-1">
                        <Zap size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Syllabus Insights</span>
                     </div>
                     <ul className="flex flex-col gap-5">
                        <li className="flex items-start gap-4 text-sm font-bold text-text-secondary">
                          <ChevronRight size={16} className="text-accent mt-0.5" /> 
                          <span>Elite industry-recognized methodologies for deep mastery.</span>
                        </li>
                        <li className="flex items-start gap-4 text-sm font-bold text-text-secondary">
                          <ChevronRight size={16} className="text-accent mt-0.5" /> 
                          <span>Peer-reviewed curriculum updated for present-day excellence.</span>
                        </li>
                     </ul>
                  </div>

                  <div className="flex flex-col gap-6 p-8 rounded-[2rem] bg-surface/30 border border-white/5 backdrop-blur-xl">
                     <div className="flex items-center gap-3 text-accent">
                        <Award size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Verified Credentials</span>
                     </div>
                     <ul className="flex flex-col gap-5">
                        <li className="flex items-start gap-4 text-sm font-bold text-text-secondary">
                          <ChevronRight size={16} className="text-accent mt-0.5" /> 
                          <span>Verified Academy Badge upon successful completion.</span>
                        </li>
                        <li className="flex items-start gap-4 text-sm font-bold text-text-secondary">
                          <ChevronRight size={16} className="text-accent mt-0.5" /> 
                          <span>Digital Certificate authorized by Ignite Learning Systems.</span>
                        </li>
                     </ul>
                  </div>
               </div>

               {/* Extended Knowledge (YouTube) */}
               <div className="flex flex-col gap-10">
                  <div className="flex items-center justify-between border-b border-white/5 pb-8">
                     <h3 className="text-2xl font-black text-white flex items-center gap-3">
                        <Monitor size={24} className="text-accent" />
                        Extended Intelligence
                     </h3>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-40">Dynamic Resources</span>
                  </div>

                  {ytLoading ? (
                    <div className="flex items-center gap-4 py-12">
                       <Spinner size={16} />
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary animate-pulse">Fetching intelligence streams...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {ytVideos.map((video: any) => (
                          <div key={video.videoId} className="flex flex-col gap-4 group">
                             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-xl group-hover:border-accent/30 transition-all duration-500 bg-black">
                                <iframe
                                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                  src={`https://www.youtube.com/embed/${video.videoId}`}
                                  title={video.title}
                                  frameBorder="0"
                                  allowFullScreen
                                ></iframe>
                             </div>
                             <h4 className="text-xs font-bold text-text-secondary line-clamp-2 leading-relaxed px-2 group-hover:text-white transition-colors">
                                {video.title}
                             </h4>
                          </div>
                       ))}
                    </div>
                  )}
               </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8 animate-fade-left">
               <div className="card-premium p-10 backdrop-blur-3xl sticky top-24 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-[80px] pointer-events-none group-hover:bg-accent/10 transition-colors" />
                  
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 pl-1">Enrollment Data</h4>
                  
                  <div className="flex flex-col gap-10 mb-12">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shadow-xl group-hover:rotate-3 transition-transform">
                           <Monitor size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">Lead Mentor</p>
                           <p className="text-lg font-black text-white">{subject?.instructor_name || 'Ignite Senior Architect'}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shadow-xl group-hover:-rotate-3 transition-transform">
                           <Users size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">Student Body</p>
                           <p className="text-lg font-black text-white">{subject?.students_enrolled || '1.2K'}+ Scholars</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                        <div className="flex flex-col gap-2">
                           <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-2"><Clock size={12} /> Duration</p>
                           <p className="text-sm font-black text-white uppercase tracking-tight">{subject?.duration_weeks || 12} Weeks</p>
                        </div>
                        <div className="flex flex-col gap-2">
                           <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-2"><List size={12} /> Syllabus</p>
                           <p className="text-sm font-black text-white uppercase tracking-tight">{subject?.total_lessons || 24} Sessions</p>
                        </div>
                     </div>
                  </div>

                  {progress && progress.percent_complete > 0 && (
                    <div className="mb-10 p-6 rounded-3xl bg-accent/5 border border-accent/10 backdrop-blur-md animate-fade-in">
                      <div className="flex items-center justify-between mb-4 text-[10px] font-black uppercase tracking-widest">
                         <span className="text-accent flex items-center gap-2"><Zap size={10} fill="currentColor" /> Active Progress</span>
                         <span className="text-white">{progress.percent_complete}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-accent shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-all duration-1000" style={{ width: `${progress.percent_complete}%` }} />
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={startLearning}
                    className="btn-premium w-full py-5 flex items-center justify-center gap-4 text-xs tracking-widest group shadow-2xl"
                  >
                    <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
                    {progress?.last_video_id ? 'Resume Curriculum' : 'Begin Investiture'}
                    <ChevronRight size={18} />
                  </button>
                  
                  <p className="text-center text-[9px] font-black text-text-secondary uppercase tracking-[0.3em] mt-8 opacity-40">
                     Instant Synchronization Guaranteed
                  </p>
               </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
