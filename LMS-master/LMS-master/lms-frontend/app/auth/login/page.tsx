'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import Alert from '../../../components/common/Alert';
import Spinner from '../../../components/common/Spinner';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please attempt synchronization again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-background shadow-lg shadow-accent/20 group-hover:rotate-6 transition-transform">
              <BookOpen size={24} strokeWidth={3} />
            </div>
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-accent transition-colors">Aura <span className="text-accent underline decoration-accent/30 underline-offset-4">LMS</span></span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Identity Verification</h1>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">Secure Access to Curriculum</p>
        </div>

        {/* Form Card */}
        <div className="card-premium p-10 backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl pointer-events-none" />
          
          {error && <div className="mb-6"><Alert variant="error" message={error} /></div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest pl-1">Email Identifier</label>
              <div className="relative">
                <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium pl-14" 
                  placeholder="name@academy.com" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                 <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Secret Key</label>
                 <Link href="#" className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline underline-offset-4">Lost access?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type={showPass ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium pl-14 pr-14" 
                  placeholder="••••••••••••" 
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
              className="btn-premium w-full flex items-center justify-center gap-3 py-4.5 mt-4 text-xs tracking-[0.2em]"
            >
              {isLoading ? <Spinner size={16} /> : <>Commence Learning <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mt-10">
          Not yet enrolled?{' '}
          <Link href="/auth/register" className="text-accent hover:text-white transition-colors decoration-accent/30 underline underline-offset-4">
            Apply for Membership
          </Link>
        </p>
      </div>
    </div>
  );
}
