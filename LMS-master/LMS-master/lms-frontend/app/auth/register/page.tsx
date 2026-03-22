'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, BookOpen, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import Alert from '../../../components/common/Alert';
import Spinner from '../../../components/common/Spinner';

const perks = [
  'Unlimited Access to 100+ Masterclasses',
  'Personalized AI Learning Assistant',
  'Verified Industry Certifications',
  'Exclusive Community Access'
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, name);
      router.push('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed. Try a different email.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Column */}
        <div className="hidden lg:flex flex-col gap-10 animate-fade-right">
           <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-accent shadow-xl shadow-accent/20 group-hover:rotate-6 transition-transform">
                <BookOpen size={24} className="text-background" strokeWidth={3} />
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Aura <span className="text-accent underline decoration-accent/30 underline-offset-4">LMS</span>
              </span>
           </Link>

           <div className="flex flex-col gap-6">
              <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
                Unlock your <br /> <span className="text-accent italic text-gradient">digital potential.</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-md font-medium leading-relaxed italic">
                Join the elite Circle of modern learners mastering technology and design with our cinematic curriculum.
              </p>
           </div>

           <div className="flex flex-col gap-5">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-4 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
                  <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-lg shadow-accent/5">
                    <CheckCircle2 size={12} />
                  </div>
                  {p}
                </div>
              ))}
           </div>
        </div>

        {/* Form Column */}
        <div className="w-full max-w-md mx-auto animate-fade-up">
           <div className="card-premium p-10 lg:p-12 shadow-3xl">
              <div className="mb-10 lg:hidden text-center">
                 <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
                 <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Join the Aura Academy</p>
              </div>

              <div className="hidden lg:block mb-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[9px] font-black uppercase tracking-widest text-accent mb-4">
                    <Sparkles size={10} fill="currentColor" /> Premium Access
                 </div>
                 <h2 className="text-3xl font-black text-white tracking-tight">Get Started</h2>
              </div>

              {error && <div className="mb-6"><Alert variant="error" message={error} /></div>}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                  <div className="relative group">
                    <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="input-premium pl-14"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Work Email</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="input-premium pl-14"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Secure Password</label>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                    <input 
                      type={showPass ? 'text' : 'password'} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-premium pl-14 pr-14"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-premium w-full flex items-center justify-center gap-3 py-4.5 mt-4 text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  {isLoading ? <Spinner size={16} /> : (
                    <>
                      Create Academy Account <ArrowRight size={16} strokeWidth={3} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 text-center">
                 <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">
                   Already a member?{' '}
                   <Link href="/auth/login" className="text-accent hover:text-white transition-colors underline underline-offset-4 decoration-accent/30 lowercase">Sign in Here</Link>
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
