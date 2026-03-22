'use client';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, BookOpen, Clock, Users, Star, ArrowRight, Sparkles, Filter 
} from 'lucide-react';
import apiClient from '../lib/apiClient';
import Spinner from '../components/common/Spinner';
import AppShell from '../components/Layout/AppShell';

export default function HomePage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    apiClient.get('/subjects')
      .then(({ data }) => setSubjects(data.subjects || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(subjects.map(s => s.category))];
    return cats;
  }, [subjects]);

  const filteredSubjects = subjects.filter(sub => {
    const matchesSearch = sub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <Spinner size={32} />
      <p className="text-xs font-bold uppercase tracking-widest text-text-secondary animate-pulse">Initializing Academy...</p>
    </div>
  );

  return (
    <AppShell>
      <div className="pb-24 overflow-hidden">
        {/* Cinematic Hero Section */}
        <section className="relative pt-20 pb-32 px-6">
          <div className="bg-glow" />
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8">
                <Sparkles size={12} fill="currentColor" /> The Future of Mastery
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-white">
                Master the<br />
                <span className="text-gradient">Digital Arts.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                Join an elite circle of learners mastering design, engineering, and artificial intelligence through our curated, cinematic curriculum.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/register" className="btn-premium px-10 py-5 text-lg">
                  Start Learning <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link href="#courses" className="btn-outline px-10 py-5 text-lg">
                  Browse Library
                </Link>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="px-6 pt-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Filter & Search Bar */}
            <div className="sticky top-24 z-40 mb-16 px-2">
              <div className="glass rounded-[2.5rem] p-4 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-black/20">
                <div className="relative flex-1 group">
                  <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search across 100+ masterclasses..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:outline-none focus:border-accent/30 focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                  <Filter size={16} className="text-text-secondary ml-2 shrink-0" />
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                        selectedCategory === cat 
                        ? 'bg-accent text-background shadow-lg shadow-accent/20' 
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSubjects.map((sub) => (
                <SubjectCard key={sub.id} subject={sub} />
              ))}
            </div>

            {filteredSubjects.length === 0 && (
              <div className="py-32 text-center animate-fade-in">
                  <div className="inline-flex p-6 rounded-full bg-white/5 border border-white/10 mb-6 font-bold uppercase tracking-widest opacity-20">NO RESULTS</div>
                  <h3 className="text-3xl text-white mb-2">Knowledge Gap Detected</h3>
                  <p className="text-text-secondary">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 pt-40 pb-20">
          <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/15 to-white/5 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
              <div className="relative card-premium p-16 md:p-24 text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">
                    Unlock Your <span className="text-accent underline decoration-accent/30 underline-offset-8">Potential.</span>
                </h2>
                <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed italic">
                    "The beautiful thing about learning is that no one can take it away from you."
                </p>
                <Link href="/auth/register" className="btn-premium px-12 py-5 text-xl tracking-[0.2em]">
                    Join The Global Academy
                </Link>
              </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SubjectCard({ subject }: { subject: any }) {
  return (
    <Link 
      href={`/subjects/${subject.id}`}
      className="group card-premium flex flex-col h-full animate-fade-up shadow-xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={subject.thumbnail_url || `https://img.youtube.com/vi/${subject.slug}/maxresdefault.jpg`} 
          alt={subject.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-background shadow-2xl scale-75 group-hover:scale-100 transition-transform">
              <ArrowRight size={32} />
            </div>
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg glass-dark text-[10px] font-black uppercase tracking-widest text-accent border border-accent/20">
                {subject.category}
            </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 gap-6 relative">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={10} className={i <= 4 ? "text-accent" : "text-white/10"} fill="currentColor" />
              ))}
              <span className="text-[10px] font-black text-white/40 ml-1">4.9</span>
            </div>
            <div className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent/10">
              <Sparkles size={10} fill="currentColor" /> Premium
            </div>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">
          {subject.title}
        </h3>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-text-secondary">
              <Clock size={14} className="text-accent/60" />
              <span className="text-[10px] font-black uppercase tracking-widest">8 Weeks</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Users size={14} className="text-accent/60" />
              <span className="text-[10px] font-black uppercase tracking-widest">2.4k Students</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-accent group-hover:translate-x-1 transition-transform">
              <span className="text-[10px] font-black uppercase tracking-widest">Enrol</span>
              <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
