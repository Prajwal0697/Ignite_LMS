'use client';
import AppShell from '../../components/Layout/AppShell';
import { 
  Lock, CheckCircle2, Crown, Zap, Gift, Headphones, 
  Smartphone, BarChart, HardDrive, Layout, Code, Search, Award
} from 'lucide-react';

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <AppShell />
      
      {/* Hero Header */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gold/10 blur-[150px] rounded-full -z-10 animate-pulse" />
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-gold/20 text-gold border border-gold/30 mb-8 animate-bounce transition-all">
            <Crown size={14} />
            Elevate Your Learning
          </div>
          <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-tight">
            The <span className="text-gold">Aura Elite</span> Experience
          </h1>
          <p className="text-xl text-slate-text max-w-3xl mx-auto italic leading-relaxed">
            "Unlock 5,000+ premium courses, 1-on-1 mentorship, and enterprise-grade 
            credentials that open doors worldwide."
          </p>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 px-6 bg-[#0c0c14]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Zap, title: 'Ad-Free Learning', desc: 'No interruptions, no distractions. Just you and the expert knowledge.' },
              { icon: HardDrive, title: 'Offline Access', desc: 'Download entire courses and learn on the plane, train, or anywhere without Wi-Fi.' },
              { icon: BarChart, title: 'Advanced Analytics', desc: 'Track your growth with detailed skill mapping and productivity insights.' },
              { icon: Headphones, title: '1-on-1 Mentor Support', desc: 'Get direct access to industry leaders via private live chat and email.' },
              { icon: Award, title: 'Verified Certificates', desc: 'Earn industry-recognized credentials hosted on the Ethereum blockchain.' },
              { icon: Gift, title: 'Exclusive Masterclasses', desc: 'Access invitation-only sessions with Fortune 500 CEOs and world-renowned creators.' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 p-4 group">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-glass border border-slate-border flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-500">
                  <feature.icon size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-text text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="font-serif text-4xl text-white mb-6">Transparent Investing</h2>
            <p className="text-slate-text max-w-xl mx-auto">Choose the plan that fits your growth journey. No hidden costs, cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Free Plan */}
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-border/50 flex flex-col hover:-translate-y-2 transition-transform opacity-60 grayscale hover:grayscale-0 hover:opacity-100 duration-500">
              <h3 className="text-white font-serif text-2xl mb-1">Aura Free</h3>
              <p className="text-slate-text text-xs uppercase tracking-widest font-bold mb-6">The Basics</p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-4xl font-bold text-white tracking-tighter">$0</span>
                <span className="text-slate-text text-sm">/month</span>
              </div>
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {['All Free Courses', 'Standard UI', 'Basic Community Access', 'Profile Tracking'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-text text-sm">
                    <CheckCircle2 size={16} className="text-slate-border/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-slate-glass border border-slate-border text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-border/30 transition-all">
                Current Plan
              </button>
            </div>

            {/* Pro Plan (Bestseller) */}
            <div className="relative glass-card p-10 rounded-[2.5rem] border-2 border-gold/50 flex flex-col hover:-translate-y-2 transition-transform bg-gold/[0.03] scale-105 z-10 shadow-[0_40px_100px_rgba(255,255,255,0.08)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gold text-black text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-xl">
                Most Popular
              </div>
              <h3 className="text-white font-serif text-2xl mb-1">Aura Pro</h3>
              <p className="text-gold text-xs uppercase tracking-widest font-bold mb-6">Ultimate Growth</p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-bold text-white tracking-tighter">$29</span>
                <span className="text-slate-text text-sm">/month</span>
              </div>
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {['5,000+ Premium Courses', 'Unlimited Offline Access', 'Verified Certificates', 'Priority Support', 'Ad-Free Interface'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-sm">
                    <CheckCircle2 size={16} className="text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-light transition-all shadow-xl shadow-gold/20">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-border/50 flex flex-col hover:-translate-y-2 transition-transform">
              <h3 className="text-white font-serif text-2xl mb-1">Aura Teams</h3>
              <p className="text-slate-text text-xs uppercase tracking-widest font-bold mb-6">For Business</p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-4xl font-bold text-white tracking-tighter">Custom</span>
              </div>
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {['Bulk Subscriptions', 'LMS Integration API', 'Dedicated Success Manager', 'SSO/SAML Login', 'Custom Branding'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-text text-sm">
                    <CheckCircle2 size={16} className="text-slate-border/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-slate-glass border border-slate-border text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-border/30 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 px-6 border-t border-slate-border/20 text-center">
        <div className="max-w-3xl mx-auto group">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" 
            alt="Customer" 
            className="w-16 h-16 rounded-full mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
          <p className="text-slate-text italic text-lg leading-relaxed mb-4">
            "Aura Premium isn't just a subscription; it's a commitment to your future self. 
            The quality of instruction here is unparalleled."
          </p>
          <p className="text-white font-bold text-sm tracking-widest">- ELARA VANCE, Senior Design Lead</p>
        </div>
      </section>
    </div>
  );
}
