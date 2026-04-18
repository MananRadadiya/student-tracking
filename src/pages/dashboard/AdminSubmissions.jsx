import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader, StatusBadge } from '../../components/dashboard/SharedUI';

export default function AdminSubmissions() {
  const { submissions } = useSelector((s) => s.submissions);
  const { students, streams } = useSelector((s) => s.users);

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">All Submissions</motion.h1>
        <p className="text-dark-400 mt-1">View all student submissions across streams</p>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Student</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Stream</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Learned in Class</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Learned at Home</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, i) => {
                const student = students.find((s) => s.id === sub.studentId);
                const stream = streams.find((s) => s.id === sub.streamId);
                return (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{student?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 text-dark-300">{stream?.icon} {stream?.name}</td>
                    <td className="py-3 px-4 text-dark-300 max-w-[200px] truncate">{sub.learnedInClass}</td>
                    <td className="py-3 px-4 text-dark-300 max-w-[200px] truncate">{sub.learnedAtHome}</td>
                    <td className="py-3 px-4 text-dark-400">{sub.date}</td>
                    <td className="py-3 px-4"><StatusBadge status={sub.status} /></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
