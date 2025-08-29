/**
 * Boilerplate Template Notice
 * This Tailwind configuration is a starting point for parameterization.
 * Replace colors, fonts, spacing, and plugins with your brand system.
 * See docs/branding-ux-guidelines.md for guidance.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '1': '0.25rem', /* 4px */
        '2': '0.5rem', /* 8px */
        '3': '0.75rem', /* 12px */
        '4': '1rem', /* 16px */
        '5': '1.25rem', /* 20px */
        '6': '1.5rem', /* 24px */
        '8': '2rem', /* 32px */
        '10': '2.5rem', /* 40px */
        '12': '3rem', /* 48px */
        '16': '4rem', /* 64px */
        '20': '5rem', /* 80px */
        '24': '6rem', /* 96px */
      },
      borderRadius: {
        'sm': '0.125rem', /* 2px */
        'md': '0.375rem', /* 6px */
        'lg': '0.5rem', /* 8px */
        'xl': '0.75rem', /* 12px */
        '2xl': '1rem', /* 16px */
      },
    },
  },
  plugins: [],
};
