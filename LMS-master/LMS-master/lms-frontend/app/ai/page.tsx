'use client';
import AppShell from '../../components/Layout/AppShell';
import AIChat from '../../components/AI/AIChat';
import { Sparkles, Bot, Zap, Shield, Globe } from 'lucide-react';

export default function AIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] selection:bg-gold/30">
      <AppShell />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-12">
        {/* Simplified Header */}
        <header className="flex flex-col gap-6 animate-fade-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-black uppercase tracking-[0.3em] text-gold w-fit shadow-lg shadow-gold/5">
              <Sparkles size={12} className="animate-pulse" />
              Neural Learning System v2.0
           </div>
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex flex-col gap-4">
                 <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight tracking-tight">
                    Infinite <span className="text-gold italic">Intelligence.</span>
                 </h1>
                 <p className="text-lg text-slate-text max-w-xl leading-relaxed italic opacity-70">
                    Your personal AI tutor, fine-tuned for the digital frontier. Ask questions, solve problems, and master concepts in real-time.
                 </p>
              </div>

              {/* Quick Specs */}
              <div className="flex items-center gap-6 bg-slate-glass border border-slate-border/20 rounded-3xl p-6 backdrop-blur-2xl">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gold/10 text-gold"><Zap size={16} /></div>
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-white uppercase tracking-wider">Fast</span>
                       <span className="text-[10px] text-slate-text/60 font-medium">Inference</span>
                    </div>
                 </div>
                 <div className="w-[1px] h-8 bg-slate-border/20" />
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gold/10 text-gold"><Shield size={16} /></div>
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-white uppercase tracking-wider">Secure</span>
                       <span className="text-[10px] text-slate-text/60 font-medium">End-to-End</span>
                    </div>
                 </div>
                 <div className="w-[1px] h-8 bg-slate-border/20" />
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gold/10 text-gold"><Globe size={16} /></div>
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-white uppercase tracking-wider">Llama-3</span>
                       <span className="text-[10px] text-slate-text/60 font-medium">Core Engine</span>
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Main Interface */}
        <div className="animate-fade-in delay-200">
           <AIChat />
        </div>

        {/* Pro Tip */}
        <section className="bg-gold/[0.02] border border-gold/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-black shadow-2xl shadow-gold/20">
                 <Bot size={32} />
              </div>
              <div className="flex flex-col gap-1">
                 <h3 className="text-xl font-serif text-white uppercase tracking-wider">Expert Guidance</h3>
                 <p className="text-sm text-slate-text italic opacity-60">&quot;Ask me about specific code blocks or complex theories.&quot;</p>
              </div>
           </div>
           
           <div className="flex gap-3">
              <span className="px-5 py-2 rounded-full border border-slate-border/30 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-gold hover:border-gold/30 transition-all cursor-crosshair">Algorithm Analysis</span>
              <span className="px-5 py-2 rounded-full border border-slate-border/30 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-gold hover:border-gold/30 transition-all cursor-crosshair">Logic Debugging</span>
           </div>
        </section>
      </main>
    </div>
  );
}
