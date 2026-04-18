import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { HiDocumentText, HiCheckCircle, HiClock, HiFire, HiTrendingUp } from 'react-icons/hi';
import { StatsCard, GlassCard, SectionHeader, StatusBadge, AnimatedCounter } from '../../components/dashboard/SharedUI';
import { StatsSkeleton, CardSkeleton, ListSkeleton } from '../../components/ui/Skeleton';
import SubmissionHeatmap from '../../components/dashboard/SubmissionHeatmap';

export default function StudentDashboard() {
  const { user } = useSelector((s) => s.auth);
  const { submissions, feedback } = useSelector((s) => s.submissions);
  const { students, streams } = useSelector((s) => s.users);

  const student = students.find((s) => s.userId === user?.id || s.id === user?.studentId);
  const mySubs = submissions.filter((s) => s.studentId === (student?.id || 's1'));
  const myFeedback = feedback.filter((f) => mySubs.some((s) => s.id === f.submissionId));
  const approvedCount = mySubs.filter((s) => s.status === 'approved').length;
  const streak = student?.streak || 0;
  const today = new Date().toISOString().split('T')[0];
  const submittedToday = mySubs.some((s) => s.date === today);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-display font-bold text-white">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </motion.h1>
        <p className="text-dark-400 mt-1">Here's your progress overview</p>
      </div>

      {/* Missing Submission Alert */}
      {!submittedToday && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3"
        >
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-amber-300 font-medium text-sm">Missing Today's Submission!</p>
            <p className="text-amber-400/70 text-xs">Submit your daily work before midnight to keep your streak alive.</p>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Submissions" value={mySubs.length} icon={<HiDocumentText className="w-5 h-5 text-white" />} color="primary" delay={0.1} />
          <StatsCard title="Approved" value={approvedCount} icon={<HiCheckCircle className="w-5 h-5 text-white" />} color="green" delay={0.15} />
          <StatsCard title="Current Streak" value={streak} icon={<HiFire className="w-5 h-5 text-white" />} color="amber" delay={0.2} />
          <StatsCard title="Feedback Received" value={myFeedback.length} icon={<HiTrendingUp className="w-5 h-5 text-white" />} color="purple" delay={0.25} />
        </div>
      )}

      {/* Streak & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Streak Tracker */}
        <GlassCard>
          <SectionHeader title="🔥 Daily Streak" subtitle={`${streak} days and counting!`} />
          <div className="flex gap-2 flex-wrap mt-4">
            {loading ? <CardSkeleton /> : Array.from({ length: 14 }, (_, i) => {
              const isActive = i < streak;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-medium border transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400'
                      : 'bg-white/[0.02] border-white/5 text-dark-600'
                  }`}
                >
                  {isActive ? '🔥' : (i + 1)}
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Progress Bar */}
        <GlassCard>
          <SectionHeader title="📈 Monthly Progress" subtitle="Submission targets" />
          <div className="space-y-4">
            {[
              { label: 'This Month', current: mySubs.length, target: 30, color: 'from-primary-500 to-cyan-500' },
              { label: 'Approved Rate', current: approvedCount, target: mySubs.length || 1, color: 'from-emerald-500 to-green-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-dark-300">{item.label}</span>
                  <span className="text-white font-medium">{item.current}/{item.target}</span>
                </div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Submission Heatmap */}
      <GlassCard>
        <SectionHeader title="📅 Submission Activity" subtitle="Your daily contribution pattern (last 12 weeks)" />
        <div className="mt-4">
          {loading ? <CardSkeleton /> : <SubmissionHeatmap submissions={mySubs} />}
        </div>
      </GlassCard>

      {/* Recent Submissions and Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <GlassCard>
          <SectionHeader title="Recent Submissions" />
          <div className="space-y-3 mt-4">
            {loading ? <ListSkeleton count={4} /> : mySubs.slice(0, 5).map((sub, i) => {
              const stream = streams.find((s) => s.id === sub.streamId);
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div>
                    <p className="text-sm text-dark-200 line-clamp-1">{sub.learnedInClass}</p>
                    <p className="text-xs text-dark-500">{stream?.icon} {stream?.name} · {sub.date}</p>
                  </div>
                  <StatusBadge status={sub.status} />
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Recent Feedback */}
        <GlassCard>
          <SectionHeader title="💬 Feedback" />
          <div className="space-y-3 mt-4">
            {loading ? <ListSkeleton count={3} /> : myFeedback.length > 0 ? myFeedback.slice(0, 5).map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <p className="text-sm text-dark-200">{f.comment}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-dark-500">Faculty</span>
                  <span className="text-xs text-amber-400">{'⭐'.repeat(f.rating)}</span>
                </div>
              </motion.div>
            )) : (
              <p className="text-dark-500 text-sm text-center py-8">No feedback yet</p>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
