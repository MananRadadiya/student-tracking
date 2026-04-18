import { motion } from 'framer-motion';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClasses = 'relative overflow-hidden bg-white/[0.03] border border-white/[0.05]';
  const variants = {
    circular: 'rounded-full',
    text: 'rounded-md',
    rectangular: 'rounded-2xl',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {/* Shimmer gradient element */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.2, // Small delay between loops
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <Skeleton className="p-6 h-[104px]" />
  );
}

export function CardSkeleton() {
  return (
    <Skeleton className="p-6 h-[200px]" />
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-[76px] w-full" />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <Skeleton className="h-[300px] w-full" />
  );
}
