import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader, StatusBadge } from '../../components/dashboard/SharedUI';

export default function StudentHistory() {
  const { user } = useSelector((s) => s.auth);
  const { submissions, feedback } = useSelector((s) => s.submissions);
  const { students, streams } = useSelector((s) => s.users);

  const student = students.find((s) => s.userId === user?.id || s.id === user?.studentId);
  const mySubs = submissions.filter((s) => s.studentId === (student?.id || 's1')).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Submission History</motion.h1>
        <p className="text-dark-400 mt-1">View all your past submissions</p>
      </div>

      <div className="space-y-4">
        {mySubs.map((sub, i) => {
          const stream = streams.find((s) => s.id === sub.streamId);
          const subFeedback = feedback.filter((f) => f.submissionId === sub.id);

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${stream?.color}15`, border: `1px solid ${stream?.color}30` }}>
                      {stream?.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{stream?.name}</p>
                      <p className="text-xs text-dark-500">{sub.date}</p>
                    </div>
                  </div>
                  <StatusBadge status={sub.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs text-primary-400 mb-1 font-medium">📖 In Class</p>
                    <p className="text-sm text-dark-200">{sub.learnedInClass}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs text-cyan-400 mb-1 font-medium">🏠 At Home</p>
                    <p className="text-sm text-dark-200">{sub.learnedAtHome}</p>
                  </div>
                </div>

                {subFeedback.length > 0 && (
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <p className="text-xs text-dark-400 font-medium">💬 Faculty Feedback</p>
                    {subFeedback.map((f) => (
                      <div key={f.id} className="p-3 rounded-xl bg-primary-500/5 border border-primary-500/10 text-sm text-dark-200">
                        {f.comment}
                        <span className="block text-xs text-amber-400 mt-1">{'⭐'.repeat(f.rating)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}

        {mySubs.length === 0 && (
          <GlassCard className="text-center py-12">
            <p className="text-4xl mb-4">📝</p>
            <p className="text-white font-medium mb-2">No submissions yet</p>
            <p className="text-dark-400 text-sm">Start by submitting your daily work!</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
