import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader, StatusBadge } from '../../components/dashboard/SharedUI';
import { setFilter } from '../../store/slices/submissionsSlice';
import { useDispatch } from 'react-redux';

export default function FacultySubmissions() {
  const { submissions, filters } = useSelector((s) => s.submissions);
  const { students, streams } = useSelector((s) => s.users);
  const dispatch = useDispatch();

  const filteredSubs = submissions.filter((sub) => {
    if (filters.stream !== 'all' && sub.streamId !== filters.stream) return false;
    if (filters.status !== 'all' && sub.status !== filters.status) return false;
    if (filters.studentId !== 'all' && sub.studentId !== filters.studentId) return false;
    if (filters.date && sub.date !== filters.date) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">All Submissions</motion.h1>
        <p className="text-dark-400 mt-1">Browse and filter all student submissions</p>
      </div>

      {/* Filters */}
      <GlassCard hover={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Student</label>
            <select value={filters.studentId} onChange={(e) => dispatch(setFilter({ key: 'studentId', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
              <option value="all" className="bg-dark-900">All Students</option>
              {students.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Stream</label>
            <select value={filters.stream} onChange={(e) => dispatch(setFilter({ key: 'stream', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
              <option value="all" className="bg-dark-900">All Streams</option>
              {streams.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Status</label>
            <select value={filters.status} onChange={(e) => dispatch(setFilter({ key: 'status', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
              <option value="all" className="bg-dark-900">All</option>
              <option value="submitted" className="bg-dark-900">Submitted</option>
              <option value="reviewed" className="bg-dark-900">Reviewed</option>
              <option value="approved" className="bg-dark-900">Approved</option>
              <option value="needs_improvement" className="bg-dark-900">Needs Improvement</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Date</label>
            <input type="date" value={filters.date} onChange={(e) => dispatch(setFilter({ key: 'date', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" />
          </div>
        </div>
      </GlassCard>

      {/* Table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Student</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Stream</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium hidden md:table-cell">In Class</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium hidden md:table-cell">At Home</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub, i) => {
                const student = students.find((s) => s.id === sub.studentId);
                const stream = streams.find((s) => s.id === sub.streamId);
                return (
                  <motion.tr key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{student?.name}</td>
                    <td className="py-3 px-4 text-dark-300">{stream?.icon} {stream?.name}</td>
                    <td className="py-3 px-4 text-dark-300 max-w-[180px] truncate hidden md:table-cell">{sub.learnedInClass}</td>
                    <td className="py-3 px-4 text-dark-300 max-w-[180px] truncate hidden md:table-cell">{sub.learnedAtHome}</td>
                    <td className="py-3 px-4 text-dark-400">{sub.date}</td>
                    <td className="py-3 px-4"><StatusBadge status={sub.status} /></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredSubs.length === 0 && <p className="text-center text-dark-400 py-8">No submissions found</p>}
      </GlassCard>
    </div>
  );
}
