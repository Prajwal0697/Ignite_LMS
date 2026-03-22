/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        body: ['Inter', 'var(--font-body)', 'sans-serif'],
        mono: ['JetBrains Mono', 'var(--font-mono)', 'monospace'],
      },
      colors: {
        background: '#0f172a',
        surface: '#111827',
        accent: {
          DEFAULT: '#ffffff',
          light: '#e5e7eb',
        },
        'text-primary': '#f9fafb',
        'text-secondary': '#9ca3af',
        gold: {
          DEFAULT: '#ffffff',
          light: '#f3f4f6',
          dim: '#e5e7eb',
          glow: '#f9fafb',
        },
        jade: {
          DEFAULT: '#00c9a7',
          dim: '#009e84',
        },
        crimson: {
          DEFAULT: '#ff4d6d',
          dim: '#cc3d57',
        },
        slate: {
          glass: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
          text: '#8b8fa8',
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'radial-glow': 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseGold: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        slideIn: { from: { transform: 'translateX(-10px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(255,255,255,0.25)',
        'gold-sm': '0 0 10px rgba(255,255,255,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'inner-gold': 'inset 0 1px 0 rgba(255,255,255,0.15)',
      },
    },
  },
  plugins: [],
};
