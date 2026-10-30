/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Poker Brand Colors
        poker: {
          felt: '#0F5132',
          'felt-light': '#1A6B44',
          'felt-dark': '#0A3D26',
          gold: '#D4A843',
          'gold-light': '#E8C56D',
          'gold-dark': '#B8923A',
          red: '#C0392B',
          'red-light': '#E74C3C',
          'red-dark': '#962D22',
          black: '#1A1A1A',
          'black-light': '#2D2D2D',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#27AE60',
          light: '#2ECC71',
          dark: '#1E8A49',
        },
        warning: {
          DEFAULT: '#F39C12',
          light: '#F5B041',
          dark: '#D48B0A',
        },
        error: {
          DEFAULT: '#E74C3C',
          light: '#EC7063',
          dark: '#C0392B',
        },
        info: {
          DEFAULT: '#3498DB',
          light: '#5DADE2',
          dark: '#2980B9',
        },
        // Surface Colors (Light) - bg-bg-* classes
        bg: {
          PRIMARY: '#F8F9FA',
          SECONDARY: '#FFFFFF',
          TERTIARY: '#E9ECEF',
          HOVER: '#DEE2E6',
          ACTIVE: '#CED4DA',
        },
        // Surface Colors (Dark) - bg-bg-* classes
        'dark-bg': {
          PRIMARY: '#121212',
          SECONDARY: '#1E1E1E',
          TERTIARY: '#2D2D2D',
          HOVER: '#3D3D3D',
          ACTIVE: '#4D4D4D',
        },
        // Text Colors (Light) - text-text-* classes
        'text-text': {
          PRIMARY: '#212529',
          SECONDARY: '#495057',
          MUTED: '#6C757D',
          INVERSE: '#F8F9FA',
          LINK: '#0F5132',
          'LINK-HOVER': '#1A6B44',
        },
        // Text Colors (Dark) - text-text-* classes
        'dark-text-text': {
          PRIMARY: '#F8F9FA',
          SECONDARY: '#DEE2E6',
          MUTED: '#ADB5BD',
          INVERSE: '#121212',
          LINK: '#E8C56D',
          'LINK-HOVER': '#F0D58A',
        },
        // Border Colors (Light)
        border: {
          DEFAULT: '#DEE2E6',
          LIGHT: '#E9ECEF',
          DARK: '#CED4DA',
          FOCUS: '#0F5132',
        },
        // Border Colors (Dark)
        'dark-border': {
          DEFAULT: '#495057',
          LIGHT: '#3D3D3D',
          DARK: '#5A5A5A',
          FOCUS: '#E8C56D',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        math: ['KaTeX_Main', 'serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.3' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'tiny': ['0.6875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'poker': '0 4px 24px -4px rgba(15, 81, 50, 0.3), 0 0 0 1px rgba(15, 81, 50, 0.1)',
        'poker-hover': '0 8px 32px -4px rgba(15, 81, 50, 0.4), 0 0 0 1px rgba(15, 81, 50, 0.15)',
        'gold': '0 4px 24px -4px rgba(212, 168, 67, 0.3), 0 0 0 1px rgba(212, 168, 67, 0.1)',
        'gold-hover': '0 8px 32px -4px rgba(212, 168, 67, 0.4), 0 0 0 1px rgba(212, 168, 67, 0.15)',
        'inner-felt': 'inset 0 2px 8px -2px rgba(0, 0, 0, 0.3)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.15s ease-in',
        'spin-slow': 'spin 2s linear infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'progress': 'progress 1s ease-out forwards',
        'count-up': 'countUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        countUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      backgroundImage: {
        'felt-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%231A6B44' fill-opacity='0.05'/%3E%3C/svg%3E\")",
        'gold-gradient': 'linear-gradient(135deg, #D4A843 0%, #E8C56D 50%, #D4A843 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #E8C56D 0%, #F0D58A 50%, #E8C56D 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
      backgroundSize: {
        'shimmer': '200% 100%',
      },
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'modal-backdrop': '300',
        'modal': '400',
        'popover': '500',
        'tooltip': '600',
        'toast': '700',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const bgLight = theme('colors.bg');
      const bgDark = theme('colors.dark-bg');
      const textLight = theme('colors.text-text');
      const textDark = theme('colors.dark-text-text');
      const borderLight = theme('colors.border');
      const borderDark = theme('colors.dark-border');
      const opacities = ['10', '20', '30', '50', '70', '90'];

      const utilities = {
        '.text-balance': { 'text-wrap': 'balance' },
        '.text-pretty': { 'text-wrap': 'pretty' },
        '.animate-in': {
          animation: 'fadeIn 0.3s ease-out, slideUp 0.4s ease-out',
        },
        '.animate-out': {
          animation: 'fadeOut 0.2s ease-in, scaleOut 0.15s ease-in',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme('colors.border.DEFAULT')} transparent`,
          '&::-webkit-scrollbar': { width: '6px', height: '6px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.border.DEFAULT'),
            borderRadius: '3px',
          },
        },
      };

      // Add bg-bg-* with opacity variants
      Object.entries(bgLight).forEach(([key, val]) => {
        utilities[`.bg-bg-${key.toLowerCase()}`] = { 'background-color': val };
        opacities.forEach(op => {
          utilities[`.bg-bg-${key.toLowerCase()}\\/${op}`] = { 'background-color': val, opacity: op / 100 };
        });
      });
      Object.entries(bgDark).forEach(([key, val]) => {
        utilities[`.dark .bg-bg-${key.toLowerCase()}`] = { 'background-color': val };
        opacities.forEach(op => {
          utilities[`.dark .bg-bg-${key.toLowerCase()}\\/${op}`] = { 'background-color': val, opacity: op / 100 };
        });
      });

      // Add text-text-* 
      Object.entries(textLight).forEach(([key, val]) => {
        utilities[`.text-text-${key.toLowerCase()}`] = { color: val };
      });
      Object.entries(textDark).forEach(([key, val]) => {
        utilities[`.dark .text-text-${key.toLowerCase()}`] = { color: val };
      });

      // Add border-border-*
      Object.entries(borderLight).forEach(([key, val]) => {
        utilities[`.border-border-${key.toLowerCase()}`] = { 'border-color': val };
      });
      Object.entries(borderDark).forEach(([key, val]) => {
        utilities[`.dark .border-border-${key.toLowerCase()}`] = { 'border-color': val };
      });

      addUtilities(utilities);
    },
  ],
  safelist: [
    { pattern: /bg-poker-(felt|gold|red|black)/ },
    { pattern: /text-poker-(felt|gold|red|black)/ },
    { pattern: /border-poker-(felt|gold|red|black)/ },
    { pattern: /hover:bg-poker-(felt|gold|red|black)/ },
    { pattern: /hover:text-poker-(felt|gold|red|black)/ },
    { pattern: /dark:bg-dark-surface-(PRIMARY|SECONDARY|TERTIARY)/ },
    { pattern: /dark:text-dark-text-(PRIMARY|SECONDARY|MUTED)/ },
    { pattern: /dark:border-dark-border-(DEFAULT|LIGHT|DARK)/ },
  ],
};