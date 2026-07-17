/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))',
        brand: {
          DEFAULT: '#1DB954',
          50: '#e8faf0',
          100: '#c6f2d8',
          200: '#8ee6b3',
          300: '#54d98d',
          400: '#2ec96f',
          500: '#1DB954',
          600: '#16a047',
          700: '#127e39',
          800: '#0f5f2d',
          900: '#0b4321',
        },
        night: '#0F172A',
        mist: '#F8FAFC',
        sky: '#60A5FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.06)',
        card: '0 1px 3px rgba(15,23,42,0.05), 0 10px 30px -10px rgba(15,23,42,0.12)',
        float: '0 8px 30px rgba(15,23,42,0.12), 0 20px 60px -20px rgba(15,23,42,0.25)',
        glow: '0 0 0 1px rgba(29,185,84,0.2), 0 8px 40px -8px rgba(29,185,84,0.5)',
      },
      backgroundImage: {
        'grid-slate':
          'linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gauge-fill': {
          '0%': { strokeDashoffset: 'var(--dash-start)' },
          '100%': { strokeDashoffset: 'var(--dash-end)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 1.6s infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
