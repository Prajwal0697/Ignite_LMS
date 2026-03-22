'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LogOut, User, Menu, X, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AppShell({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', href: '/' },
    { name: 'AI Assistant', href: '/ai' },
    { name: 'Premium', href: '/premium' },
    { name: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen">
      {/* Premium Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`relative glass rounded-[2rem] px-8 py-3 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'shadow-2xl shadow-black/40 border-white/10' : 'bg-transparent border-transparent'
          }`}>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white to-slate-400 shadow-lg shadow-white/10 group-hover:rotate-6 transition-transform">
                <BookOpen size={20} className="text-background" strokeWidth={3} />
              </div>
              <span className="font-bold text-xl tracking-tight text-text-primary hidden sm:block">
                Ignite <span className="text-accent underline decoration-accent/30 underline-offset-4">LMS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                      isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side: Auth / Profile */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Scholar</span>
                    <span className="text-xs font-bold text-text-primary">{user.email.split('@')[0]}</span>
                  </div>
                  <div className="group relative">
                    <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary group-hover:border-accent/30 group-hover:text-accent transition-all overflow-hidden bg-gradient-to-br from-surface to-background">
                       <User size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className="btn-premium flex items-center gap-2 py-2.5 px-6">
                  Get Started <Sparkles size={14} fill="currentColor" />
                </Link>
              )}

              {/* Mobile Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-2xl animate-fade-in md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-[0.2em] text-text-secondary hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-premium mt-8 text-xl px-12 py-5">
                Join Academy
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 min-h-screen">
        {children}
      </main>
    </div>
  );
}
