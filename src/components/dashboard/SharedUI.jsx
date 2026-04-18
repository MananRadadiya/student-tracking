import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function AnimatedCounter({ value, duration = 1.5, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function StatsCard({ title, value, icon, trend, trendValue, color = 'primary', delay = 0 }) {
  const colors = {
    primary: { bg: 'from-primary-500/15 to-primary-500/5', border: 'border-primary-500/20', glow: 'shadow-primary-500/10', text: 'text-primary-400', icon: 'from-primary-500 to-primary-600' },
    cyan: { bg: 'from-cyan-500/15 to-cyan-500/5', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10', text: 'text-cyan-400', icon: 'from-cyan-500 to-cyan-600' },
    purple: { bg: 'from-purple-500/15 to-purple-500/5', border: 'border-purple-500/20', glow: 'shadow-purple-500/10', text: 'text-purple-400', icon: 'from-purple-500 to-purple-600' },
    green: { bg: 'from-emerald-500/15 to-emerald-500/5', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10', text: 'text-emerald-400', icon: 'from-emerald-500 to-emerald-600' },
    amber: { bg: 'from-amber-500/15 to-amber-500/5', border: 'border-amber-500/20', glow: 'shadow-amber-500/10', text: 'text-amber-400', icon: 'from-amber-500 to-amber-600' },
    red: { bg: 'from-red-500/15 to-red-500/5', border: 'border-red-500/20', glow: 'shadow-red-500/10', text: 'text-red-400', icon: 'from-red-500 to-red-600' },
  };
  const c = colors[color] || colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} p-5 shadow-lg ${c.glow} hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.icon} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-display font-bold text-white mb-1">
        <AnimatedCounter value={value} />
      </h3>
      <p className="text-sm text-dark-400">{title}</p>
    </motion.div>
  );
}

export function StatusBadge({ status }) {
  const config = {
    submitted: { label: 'Submitted', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
    reviewed: { label: 'Reviewed', color: 'bg-purple-500/15 text-purple-400 border-purple-500/20' },
    approved: { label: 'Approved', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    needs_improvement: { label: 'Needs Improvement', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  };
  const c = config[status] || config.submitted;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${c.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'approved' ? 'bg-emerald-400' : status === 'reviewed' ? 'bg-purple-400' : status === 'needs_improvement' ? 'bg-amber-400' : 'bg-blue-400'}`} />
      {c.label}
    </span>
  );
}

export function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`rounded-2xl border border-white/5 bg-dark-900/50 backdrop-blur-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-display font-bold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-dark-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-dark-400 text-sm max-w-sm">{description}</p>
    </div>
  );
}
