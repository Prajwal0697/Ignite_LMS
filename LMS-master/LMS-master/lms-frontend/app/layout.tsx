'use client';
import '../styles/globals.css';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import Footer from '../components/Layout/Footer';

// Inline script that runs BEFORE React hydration to strip extension attributes
const EXTENSION_CLEANUP_SCRIPT = `
(function() {
  function clean() {
    document.querySelectorAll('[webcrx]').forEach(function(el) {
      el.removeAttribute('webcrx');
    });
  }
  clean();
  new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type === 'attributes' && m.attributeName === 'webcrx') {
        m.target.removeAttribute('webcrx');
      }
    });
  }).observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['webcrx'] });
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
    fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('No session');
        return res.json();
      })
      .then((data) => {
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        setAuth(data.accessToken, { sub: payload.sub, email: payload.email });
      })
      .catch(() => clearAuth());
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: EXTENSION_CLEANUP_SCRIPT }} />
        <title>Ignite LMS — Fuel Your Future</title>
        <meta name="description" content="A powerful learning management system for the modern era." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="noise min-h-screen flex flex-col" suppressHydrationWarning>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
