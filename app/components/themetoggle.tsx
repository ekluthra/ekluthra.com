'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <label className="relative cursor-pointer" aria-label="Toggle dark mode"
      style={{ display: 'inline-block', width: 52, height: 26 }}>
      <input
        type="checkbox"
        checked={resolvedTheme === 'dark'}
        className="sr-only"
        onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      />
      <span className="theme-slider">
        {/* Sun icon — visible on the LEFT when dark mode (ball is on right) */}
        <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="4"/>
          <line x1="12" y1="3" x2="12" y2="5"/>
          <line x1="12" y1="19" x2="12" y2="21"/>
          <line x1="3" y1="12" x2="5" y2="12"/>
          <line x1="19" y1="12" x2="21" y2="12"/>
          <line x1="5.6" y1="5.6" x2="7" y2="7"/>
          <line x1="17" y1="17" x2="18.4" y2="18.4"/>
          <line x1="5.6" y1="18.4" x2="7" y2="17"/>
          <line x1="17" y1="7" x2="18.4" y2="5.6"/>
        </svg>
        {/* Moon icon — visible on the RIGHT when light mode (ball is on left) */}
        <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
      <style>{`
        .theme-slider {
          position: absolute; inset: 0;
          background: #d4d4d4;
          border-radius: 999px;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5px;
          box-sizing: border-box;
        }
        .theme-slider::before {
          content: '';
          position: absolute;
          width: 20px; height: 20px;
          left: 3px; top: 3px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s;
          z-index: 1;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        input:checked ~ .theme-slider { background: #404040; }
        input:checked ~ .theme-slider::before { transform: translateX(26px); }

        .theme-icon {
          width: 12px; height: 12px;
          flex-shrink: 0;
          transition: opacity 0.2s;
          position: relative; z-index: 0;
        }
        .theme-icon-sun { color: #a3a3a3; opacity: 0; }
        .theme-icon-moon { color: #737373; opacity: 1; }

        input:checked ~ .theme-slider .theme-icon-sun { opacity: 1; color: #fbbf24; }
        input:checked ~ .theme-slider .theme-icon-moon { opacity: 0; }
      `}</style>
    </label>
  )
}