'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Lock, ChevronRight, PartyPopper, ArrowLeft, Maximize2, 
  Share2, Heart, Award, PlayCircle, List, Sparkles 
} from 'lucide-react';
import apiClient from '../../../../../lib/apiClient';
import { useVideoStore } from '../../../../../store/videoStore';
import { useSidebarStore } from '../../../../../store/sidebarStore';
import VideoPlayer from '../../../../../components/Video/VideoPlayer';
import VideoMeta from '../../../../../components/Video/VideoMeta';
import VideoProgressBar from '../../../../../components/Video/VideoProgressBar';
import Spinner from '../../../../../components/common/Spinner';
import AppShell from '../../../../../components/Layout/AppShell';

interface VideoData {
  id: number; title: string; description: string; youtube_url: string;
  duration_seconds: number; section_id: number; section_title: string;
  subject_id: number; subject_title: string;
  previous_video_id: number | null; next_video_id: number | null;
  locked: boolean; unlock_reason: string | null;
}

export default function VideoPage() {
  const { subjectId, videoId } = useParams();
  const router = useRouter();
  const [video, setVideo] = useState<VideoData | null>(null);
  const [subjectVideos, setSubjectVideos] = useState<any[]>([]);
  const [startPos, setStartPos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showComplete, setShowComplete] = useState(false);
  
  // Dynamic Video State
  const [ytResults, setYtResults] = useState<any[]>([]);
  const [activeYtId, setActiveYtId] = useState<string>('');
  const [ytLoading, setYtLoading] = useState(false);

  const { setVideo: storeSetVideo, setNavigation, setCompleted } = useVideoStore();
  const { markVideoCompleted } = useSidebarStore();

  useEffect(() => {
    setLoading(true);
    setShowComplete(false);
    
    // Fetch video details and subject's all videos for sidebar
    Promise.all([
      apiClient.get(`/videos/${videoId}`),
      apiClient.get(`/subjects/${subjectId}/videos`).catch(() => ({ data: [] })),
      apiClient.get(`/progress/videos/${videoId}`).catch(() => ({ data: { last_position_seconds: 0 } })),
    ]).then(([vidRes, subVidsRes, progRes]) => {
      const vData = vidRes.data;
      setVideo(vData);
      setSubjectVideos(subVidsRes.data || []);
      setStartPos(progRes.data.last_position_seconds ?? 0);
      storeSetVideo(parseInt(videoId as string), parseInt(subjectId as string));
      setNavigation(vData.previous_video_id, vData.next_video_id);

      // Fetch dynamic alternatives
      setYtLoading(true);
      const query = `${vData.title} ${vData.subject_title}`;

      apiClient.get('/youtube', { params: { q: query } })
        .then(ytRes => {
          const results = ytRes.data.videos || [];
          setYtResults(results);
          if (results.length > 0) {
            setActiveYtId(results[0].videoId);
          } else {
            setActiveYtId(vData.youtube_url);
          }
        })
        .catch(() => {
          setActiveYtId(vData.youtube_url);
        })
        .finally(() => setYtLoading(false));

    }).catch(console.error).finally(() => setLoading(false));
  }, [videoId, subjectId, storeSetVideo, setNavigation]);

  const handleCompleted = useCallback(() => {
    setCompleted(true);
    markVideoCompleted(parseInt(videoId as string));
    setShowComplete(true);
    setTimeout(() => setShowComplete(false), 5000);
  }, [videoId, markVideoCompleted, setCompleted]);

  const goNext = () => {
    if (video?.next_video_id) router.push(`/subjects/${subjectId}/video/${video.next_video_id}`);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <Spinner size={32} />
      <p className="text-xs font-bold uppercase tracking-widest text-text-secondary animate-pulse">Loading Session...</p>
    </div>
  );

  if (!video) return (
    <AppShell>
      <div className="flex items-center justify-center min-h-[60vh] text-text-secondary italic">Video not found.</div>
    </AppShell>
  );

  return (
    <AppShell>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        
        {/* Left Sidebar: Lesson List */}
        <aside className="w-full lg:w-[350px] border-r border-white/5 bg-surface/30 backdrop-blur-xl flex flex-col h-full sticky top-24">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <List size={18} className="text-accent" />
               <h3 className="text-sm font-black uppercase tracking-widest text-white">Curriculum</h3>
            </div>
            <span className="text-[10px] font-bold text-text-secondary bg-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">
               {subjectVideos.length} Lessons
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2">
            {subjectVideos.map((sv, idx) => {
              const isActive = sv.id === parseInt(videoId as string);
              return (
                <button
                  key={sv.id}
                  onClick={() => router.push(`/subjects/${subjectId}/video/${sv.id}`)}
                  className={`w-full group p-4 rounded-2xl flex items-center gap-4 transition-all ${
                    isActive ? 'bg-accent/10 border border-accent/20' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-accent text-background' : 'bg-white/5 text-text-secondary group-hover:bg-white/10 group-hover:text-white'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className={`text-xs font-bold leading-tight line-clamp-2 text-left ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-white'}`}>
                      {sv.title}
                    </span>
                    <div className="flex items-center gap-2 opacity-40">
                       <PlayCircle size={10} />
                       <span className="text-[9px] font-bold uppercase tracking-widest">12:30</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Panel: Video Player & Meta */}
        <main className="flex-1 flex flex-col bg-background relative overflow-y-auto no-scrollbar">
          
          {/* Header/Breadcrumb */}
          <div className="px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-3xl flex items-center justify-between sticky top-0 z-20">
             <button 
               onClick={() => router.push(`/subjects/${subjectId}`)}
               className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors group"
             >
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to Overview</span>
             </button>
             
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary">{video.subject_title}</span>
                      <span className="text-xs font-bold text-white max-w-[200px] truncate">{video.title}</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-0 md:p-8 lg:p-12 space-y-12">
            {/* Video Player Section */}
            <div className="relative group">
               <div className="absolute -inset-1 bg-accent/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
               <div className="relative rounded-none md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl bg-black aspect-video group">
                  <VideoPlayer
                    videoId={video.id}
                    youtubeUrl={activeYtId}
                    startPositionSeconds={startPos}
                    onCompleted={handleCompleted}
                  />
                  <VideoProgressBar />
               </div>
            </div>

            {/* Meta Data */}
            <div className="px-6 md:px-4 max-w-5xl">
               <VideoMeta
                  title={video.title}
                  description={video.description}
                  sectionTitle={video.section_title}
                  subjectTitle={video.subject_title}
                  subjectId={video.subject_id}
                  durationSeconds={video.duration_seconds}
                  isCompleted={false}
                  prevVideoId={video.previous_video_id}
                  nextVideoId={video.next_video_id}
               />
               
               {/* Recommendations */}
               <div className="mt-20 pt-12 border-t border-white/5">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <Sparkles size={20} className="text-accent" />
                        AI Recommended Masterclasses
                     </h3>
                  </div>

                  {ytLoading ? (
                    <div className="py-12 flex flex-col items-center gap-4 text-text-secondary opacity-50">
                       <Spinner size={20} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Curating Intelligence...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {ytResults.slice(0, 3).map((res) => (
                         <button 
                           key={res.videoId}
                           onClick={() => {
                             setActiveYtId(res.videoId);
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                           }}
                           className={`group relative card-premium p-4 text-left border transition-all ${
                             activeYtId === res.videoId ? 'border-accent bg-accent/5 shadow-xl shadow-accent/5' : 'hover:border-accent/30'
                           }`}
                         >
                           <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                              <img src={res.thumbnail} alt={res.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <PlayCircle size={32} className="text-accent" />
                              </div>
                           </div>
                           <h4 className="text-xs font-bold text-white line-clamp-2 leading-relaxed">
                              {res.title}
                           </h4>
                         </button>
                       ))}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </main>

        {/* Completion Toast */}
        {showComplete && (
          <div className="fixed bottom-10 right-10 z-[100] animate-fade-left">
            <div className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-accent text-background shadow-2xl shadow-accent/20 border border-white/20">
               <PartyPopper size={24} className="animate-bounce" />
               <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-widest">Mastery Achieved</span>
                  <span className="text-[10px] font-bold opacity-80">Lesson content synchronized effectively.</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
