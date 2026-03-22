'use client';
import AppShell from '../../components/Layout/AppShell';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <AppShell />
      
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-8">
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="text-xl text-slate-text max-w-2xl mx-auto italic">
            "Your feedback is our compass. Reach out for support, partnerships, or just to say hello."
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Details (Left Side) */}
            <div className="lg:col-span-5 flex flex-col gap-12 animate-fade-right">
              <div className="flex flex-col gap-8">
                <h2 className="font-serif text-3xl text-white">How can we help?</h2>
                <p className="text-slate-text leading-relaxed">
                  Whether you're a student facing technical issues or a business looking for enterprise-grade 
                  training solutions, our team is here to guide you.
                </p>
              </div>

              {/* Methods */}
              <div className="flex flex-col gap-8">
                {[
                  { icon: Mail, label: 'Support Email', value: 'support@auralms.edu', color: 'text-gold' },
                  { icon: Phone, label: 'Primary Contact', value: '+1-800-AURA-LMS', color: 'text-slate-text' },
                  { icon: MapPin, label: 'Aura HQ', value: 'Penthouse Suite, 442 Gold St, San Francisco, CA', color: 'text-slate-text' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-glass border border-slate-border flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                      <item.icon size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-text">{item.label}</p>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-6 pt-8 border-t border-slate-border/30">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-text">Follow us on social</p>
                <div className="flex items-center gap-4">
                  {[Instagram, Twitter, Linkedin, Facebook].map((Social, i) => (
                    <button key={i} className="w-10 h-10 rounded-full bg-slate-glass border border-slate-border flex items-center justify-center text-white hover:text-gold hover:border-gold/30 transition-all">
                      <Social size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form (Right Side) */}
            <div className="lg:col-span-1" />
            
            <div className="lg:col-span-6 animate-fade-left">
              <div className="glass-card p-10 md:p-12 rounded-3xl border border-slate-border/50 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl pointer-events-none" />
                
                <form className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-text ml-1 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Alexander Aura"
                        className="bg-slate-glass border border-slate-border rounded-xl px-4 py-3 text-white placeholder:text-slate-border focus:outline-none focus:border-gold/50 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-text ml-1 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="auratest@domain.com"
                        className="bg-slate-glass border border-slate-border rounded-xl px-4 py-3 text-white placeholder:text-slate-border focus:outline-none focus:border-gold/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-slate-text ml-1 mb-1">Inquiry Type</label>
                    <select className="bg-slate-glass border border-slate-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 appearance-none transition-all">
                      <option>Student Support</option>
                      <option>Instructor Application</option>
                      <option>Business Partnerships</option>
                      <option>General Feedback</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-slate-text ml-1 mb-1">Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="Your message to the Aura team..."
                      className="bg-slate-glass border border-slate-border rounded-xl px-4 py-3 text-white placeholder:text-slate-border focus:outline-none focus:border-gold/50 transition-all resize-none"
                    />
                  </div>

                  <button className="group mt-4 px-10 py-4 bg-gold rounded-2xl text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all flex items-center justify-center gap-3 shadow-2xl shadow-gold/20">
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Sent Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
