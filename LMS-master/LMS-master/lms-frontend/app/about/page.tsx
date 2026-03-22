'use client';
import AppShell from '../../components/Layout/AppShell';
import { BookOpen, Shield, Globe, Award, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <AppShell />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-8 animate-fade-up">
            Our Vision for the <span className="text-gold">Future of Learning</span>
          </h1>
          <p className="text-xl text-slate-text leading-relaxed mb-12 animate-fade-up delay-100 italic">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="glass-card p-1 items-center rounded-3xl overflow-hidden group">
              <div className="relative aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60" />
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20 w-fit">
                Our Mission
              </div>
              <h2 className="font-serif text-4xl text-white leading-tight">
                Democratizing access to high-quality education through world-class engineering.
              </h2>
              <p className="text-slate-text leading-relaxed">
                AuraLMS was born out of a simple realization: the brightest minds aren't always in the 
                most expensive classrooms. We built this platform to bridge the gap between curiosity 
                and knowledge, providing a premium learning experience for everyone, everywhere.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-white font-bold text-2xl">500K+</h4>
                  <p className="text-xs text-slate-text uppercase tracking-widest">Active Learners</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-white font-bold text-2xl">1,200+</h4>
                  <p className="text-xs text-slate-text uppercase tracking-widest">Expert Mentors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-[#0c0c14]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-white mb-4">The Aura Philosophy</h2>
            <p className="text-slate-text">We are guided by three core principles in everything we do.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Excellence or Nothing', 
                desc: 'We curate every course with surgical precision, ensuring only the highest quality content reaches our platform.' 
              },
              { 
                icon: Globe, 
                title: 'Global Inclusivity', 
                desc: 'Learning has no borders. Our platform is optimized for accessibility across cultures, languages, and bandwidths.' 
              },
              { 
                icon: Zap, 
                title: 'Active Learning', 
                desc: 'We don\'t just stream videos; we build interactive experiences that foster deep comprehension and skill retention.' 
              }
            ].map((value, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border border-slate-border/50 hover:border-gold/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
                  <value.icon size={28} />
                </div>
                <h3 className="text-white font-serif text-2xl mb-4">{value.title}</h3>
                <p className="text-slate-text leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-32 px-6 text-center relative">
        <div className="max-w-3xl mx-auto">
          <Award size={48} className="text-gold mx-auto mb-8 animate-bounce" />
          <h2 className="font-serif text-5xl text-white mb-6">Want to impact millions?</h2>
          <p className="text-slate-text text-lg mb-10 leading-relaxed">
            We are always looking for visionary educators and builders to join our mission 
            of redefining the educational landscape.
          </p>
          <button className="px-10 py-4 bg-gold rounded-2xl text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all shadow-2xl shadow-gold/20">
            Join the movement
          </button>
        </div>
      </section>
    </div>
  );
}
