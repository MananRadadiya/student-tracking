import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { HiFire, HiTrendingUp, HiStar, HiAcademicCap } from 'react-icons/hi';

const RANK_STYLES = [
  { bg: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/30', badge: '🥇', glow: 'shadow-amber-500/10' },
  { bg: 'from-gray-400/15 to-gray-500/8', border: 'border-gray-400/25', badge: '🥈', glow: '' },
  { bg: 'from-orange-600/15 to-orange-700/8', border: 'border-orange-600/25', badge: '🥉', glow: '' },
];

export default function Leaderboard() {
  const { students, streams } = useSelector((s) => s.users);
  const { submissions } = useSelector((s) => s.submissions);

  const leaderboard = [...students]
    .map((st) => {
      const subs = submissions.filter((s) => s.studentId === st.id);
      const approved = subs.filter((s) => s.status === 'approved').length;
      const score = (st.streak * 10) + (st.totalSubmissions * 2) + (approved * 5);
      return { ...st, approved, score, subsCount: subs.length };
    })
    .sort((a, b) => b.score - a.score);

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-display font-bold text-white">
          🏆 Leaderboard
        </motion.h1>
        <p className="text-dark-400 mt-1">Top students ranked by streaks, submissions, and approvals</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((student, i) => {
          const style = RANK_STYLES[i];
          const stream = streams.find((s) => s.id === student.streamId);
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border ${style.border} bg-gradient-to-br ${style.bg} backdrop-blur-xl p-6 text-center overflow-hidden ${style.glow ? `shadow-lg ${style.glow}` : ''}`}
            >
              {/* Rank badge */}
              <div className="text-4xl mb-3">{style.badge}</div>

              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl mx-auto bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex items-center justify-center border border-white/10 mb-3">
                <span className="text-2xl font-bold text-primary-300">{student.name.charAt(0)}</span>
              </div>

              <h3 className="text-white font-bold text-lg">{student.name}</h3>
              <p className="text-xs text-dark-400 mb-4">{stream?.icon} {stream?.name}</p>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <p className="text-lg font-bold text-amber-400">{student.streak}</p>
                  <p className="text-[10px] text-dark-500">Streak</p>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <p className="text-lg font-bold text-cyan-400">{student.totalSubmissions}</p>
                  <p className="text-[10px] text-dark-500">Total</p>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <p className="text-lg font-bold text-emerald-400">{student.approved}</p>
                  <p className="text-[10px] text-dark-500">Approved</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-dark-400">Score: </span>
                <span className="text-sm font-bold text-white">{student.score}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rest of rankings */}
      <GlassCard>
        <SectionHeader title="Full Rankings" />
        <div className="space-y-2">
          {rest.map((student, i) => {
            const stream = streams.find((s) => s.id === student.streamId);
            const rank = i + 4;
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center">
                  <span className="text-sm font-bold text-dark-400">#{rank}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/15 to-purple-500/15 flex items-center justify-center border border-white/10">
                  <span className="text-sm font-bold text-primary-300">{student.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{student.name}</p>
                  <p className="text-xs text-dark-500">{stream?.icon} {stream?.name}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-amber-400"><HiFire className="w-3.5 h-3.5" />{student.streak}</span>
                  <span className="flex items-center gap-1 text-cyan-400"><HiTrendingUp className="w-3.5 h-3.5" />{student.totalSubmissions}</span>
                  <span className="text-white font-bold">{student.score}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
