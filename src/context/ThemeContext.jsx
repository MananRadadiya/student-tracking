import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

function getInitialTheme() {
  const stored = localStorage.getItem('cdmi-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('cdmi-theme', theme);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('cdmi-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
