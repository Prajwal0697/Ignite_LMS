'use client';
import Link from 'next/link';
import { BookOpen, Github, Twitter, Linkedin, Instagram, Youtube, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Curriculum: [
      { label: 'Masterclasses', href: '/' },
      { label: 'AI Cognitive Center', href: '/ai' },
      { label: 'Premium Tracks', href: '/premium' },
      { label: 'Learning Paths', href: '/paths' },
    ],
    Academy: [
      { label: 'Our Philosophy', href: '/about' },
      { label: 'Elite Mentors', href: '/instructors' },
      { label: 'Certifications', href: '/certs' },
      { label: 'Success Stories', href: '/stories' },
    ],
    Resources: [
      { label: 'Intelligence Base', href: '/help' },
      { label: 'Direct Support', href: '/contact' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ]
  };

  return (
    <footer className="relative bg-background border-t border-white/5 pt-28 pb-12 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-accent/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-accent shadow-xl shadow-accent/20 group-hover:rotate-6 transition-transform">
                <BookOpen size={24} className="text-background" strokeWidth={3} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Ignite <span className="text-accent underline decoration-accent/30 underline-offset-4">LMS</span>
              </span>
            </Link>
            
            <p className="text-text-secondary text-base leading-relaxed max-w-sm font-medium italic">
              "Redefining the boundaries of digital education. Ignite LMS provides 
              the elite tools and cinematic curricula required for modern mastery."
            </p>
            
            <div className="flex items-center gap-5">
              {[Twitter, Github, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all shadow-lg hover:shadow-accent/5">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Structured Navigation */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 pl-1">{title}</h4>
              <nav className="flex flex-col gap-5">
                {links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-sm text-text-secondary hover:text-accent transition-all font-bold hover:translate-x-1 duration-300">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Intelligence Link / Subscription */}
        <div className="py-16 border-y border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
           <div className="flex flex-wrap justify-center lg:justify-start gap-10 md:gap-20">
              <div className="flex items-center gap-4 text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] group">
                 <Mail size={18} className="text-accent group-hover:scale-110 transition-transform" /> 
                 <span className="group-hover:text-white transition-colors">hello@ignitelms.edu</span>
              </div>
              <div className="flex items-center gap-4 text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] group">
                 <MapPin size={18} className="text-accent group-hover:scale-110 transition-transform" /> 
                 <span className="group-hover:text-white transition-colors">Digital HQ, Global</span>
              </div>
              <div className="flex items-center gap-4 text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] group">
                 <Phone size={18} className="text-accent group-hover:scale-110 transition-transform" /> 
                 <span className="group-hover:text-white transition-colors">+1 (800) IGNITE-LMS</span>
              </div>
           </div>
           
           <div className="w-full lg:w-[450px] relative group">
              <input 
                type="email" 
                placeholder="Subscribe to insights..." 
                className="input-premium pl-8 pr-40 h-16 text-xs font-black uppercase tracking-widest"
              />
              <button className="absolute right-2 top-2 bottom-2 px-8 bg-accent rounded-[1.25rem] text-background text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-accent/20">
                Join Circle
              </button>
           </div>
        </div>

        {/* Final Footer Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <Sparkles size={12} className="text-accent/40" />
            © {currentYear} Ignite Learning Systems Global. Engineered for Excellence.
          </p>
          <div className="flex items-center gap-10">
            {['Privacy', 'Terms', 'Sitemap'].map((link) => (
              <Link key={link} href="#" className="text-[9px] text-white/20 hover:text-white transition-colors font-black uppercase tracking-[0.3em]">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
