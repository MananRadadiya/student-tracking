import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import NotificationCenter from './NotificationCenter';
import GlobalSearch from './GlobalSearch';
import { Toaster } from 'react-hot-toast';
import { HiLightningBolt } from 'react-icons/hi';

const PageLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-950/80 backdrop-blur-xl"
  >
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-t-2 border-primary-500 border-r-2 border-cyan-500 blur-[2px]"
      />
      <div className="relative w-16 h-16 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
        <HiLightningBolt className="w-8 h-8 text-primary-400" />
      </div>
    </div>
    <div className="mt-6 flex flex-col items-center">
      <p className="text-sm font-semibold text-white tracking-widest uppercase">EduTrack AI</p>
      <div className="flex gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  // Trigger loader on route change inside dashboard
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 600); // Premium brief loading feel
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.04),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (collapsed ? 72 : 260) : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 min-h-screen"
      >
        {/* Top bar with search and notifications */}
        <div className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3 flex justify-between lg:justify-end items-center bg-dark-950/50 backdrop-blur-xl border-b border-white/5">
          {/* spacer for mobile menu button */}
          <div className="w-10 lg:hidden" />
          
          <div className="flex items-center gap-2 sm:gap-4">
            <GlobalSearch />
            <div className="w-px h-6 bg-white/10" />
            <NotificationCenter />
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 pt-0 min-h-[calc(100vh-64px)] relative">
          <AnimatePresence mode="wait">
            {!isNavigating ? (
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            ) : (
              <motion.div key="loader" className="absolute inset-0 flex items-center justify-center">
                {/* Fallback space while loading */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      <AnimatePresence>
        {isNavigating && <PageLoader />}
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}
