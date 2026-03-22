'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2, Maximize2, Trash2, Cpu, Zap, ChevronRight } from 'lucide-react';
import apiClient from '../../lib/apiClient';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const PRESET_HINTS = [
  "Explain Big O notation in simple terms",
  "How do I build a REST API in Python?",
  "Tips for mastering DSA interview questions"
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am your AI Knowledge Engine. I can help you understand concepts, debug code, or plan your learning path. What is on your mind today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history
    apiClient.get('/ai/history')
      .then(({ data }) => {
        if (data.history?.length > 0) {
          setMessages(data.history.map((h: any) => ({ 
            role: h.role === 'user' ? 'user' : 'ai', 
            text: h.content 
          })));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
       scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, loading]);

  const handleSend = async (customMsg?: string) => {
    const userMsg = (customMsg || input).trim();
    if (!userMsg || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const endpoint = '/chat';
      const { data } = await apiClient.post(endpoint, { message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (err: any) {
      const status = err.response?.status;
      const errorDetail = err.response?.data?.message || err.message;
      
      let errorMsg = "I'm having trouble connecting to my cognitive center. Please check your connection and try again.";
      if (status === 503) {
        errorMsg = "The AI neural net is currently initializing. This usually takes 20-30 seconds. Please try again shortly!";
      } else if (status === 401 || status === 403) {
        errorMsg = "My security clearance is invalid. Please ensure the AI provider key is correctly configured.";
      } else if (status === 500) {
        errorMsg = `Cognitive Center Error: ${errorDetail}`;
      }

      setMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[750px] bg-surface/50 border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden relative group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-accent/5 blur-[120px] opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-3xl flex items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-background shadow-lg shadow-accent/20">
               <Bot size={24} />
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">AI Assistant</h3>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-black uppercase tracking-widest text-accent">Neural Core 3.0</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden sm:flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              <Sparkles size={12} className="text-accent" />
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Premium Mode</span>
           </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 flex flex-col no-scrollbar relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${
                msg.role === 'user' 
                ? 'bg-surface border-white/10 text-white' 
                : 'bg-accent/10 border-accent/20 text-accent'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="flex flex-col gap-2">
                 <div className={`px-6 py-4 rounded-2xl text-[14px] leading-relaxed transition-all ${
                   msg.role === 'user' 
                   ? 'bg-accent text-background font-semibold rounded-tr-none shadow-lg shadow-accent/10' 
                   : 'bg-white/5 border border-white/10 text-text-primary rounded-tl-none backdrop-blur-xl'
                 }`}>
                   {msg.text}
                 </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-fade-in">
             <div className="flex gap-4 max-w-[85%]">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                   <Bot size={14} />
                </div>
                <div className="px-6 py-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 flex items-center gap-3">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-accent rounded-full animate-bounce delay-100" />
                      <div className="w-1 h-1 bg-accent rounded-full animate-bounce delay-200" />
                      <div className="w-1 h-1 bg-accent rounded-full animate-bounce delay-300" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">Processing Neural Signals</span>
                </div>
             </div>
          </div>
        )}
        <div ref={scrollRef} className="h-4" />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && !loading && (
        <div className="px-8 py-4 overflow-x-auto no-scrollbar animate-fade-in relative z-20">
           <div className="flex items-center gap-3 whitespace-nowrap">
              {PRESET_HINTS.map((hint, i) => (
                 <button 
                  key={i}
                  onClick={() => handleSend(hint)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-text-secondary text-xs font-medium hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all"
                 >
                   {hint}
                 </button>
              ))}
           </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-3xl relative z-20">
        <div className="relative group max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-6 pr-16 py-5 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all"
          />
          <button 
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-accent text-background rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-accent/20"
          >
            <Zap size={18} fill="currentColor" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
              <Zap size={10} className="text-accent" />
              <span className="text-[9px] font-black uppercase tracking-widest italic">Fast Response</span>
           </div>
           <div className="flex items-center gap-2">
              <Sparkles size={10} className="text-accent" />
              <span className="text-[9px] font-black uppercase tracking-widest italic">Enhanced Accuracy</span>
           </div>
        </div>
      </div>
    </div>
  );
}
