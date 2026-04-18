import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiClock, HiUsers } from 'react-icons/hi';
import { GlassCard, SectionHeader, StatsCard } from '../../components/dashboard/SharedUI';
import { StatsSkeleton, ListSkeleton } from '../../components/ui/Skeleton';
import { approveAttendance, rejectAttendance } from '../../store/slices/attendanceSlice';
import toast from 'react-hot-toast';

export default function FacultyAttendance() {
  const { todayRequests, records } = useSelector((s) => s.attendance);
  const { students, streams } = useSelector((s) => s.users);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const pendingRequests = todayRequests.filter((r) => r.status === 'pending');
  const approvedToday = todayRequests.filter((r) => r.status === 'present');
  const rejectedToday = todayRequests.filter((r) => r.status === 'rejected');

  const handleApprove = (requestId) => {
    dispatch(approveAttendance({ requestId, facultyId: user.id }));
    toast.success('Attendance approved!');
  };

  const handleReject = (requestId) => {
    dispatch(rejectAttendance({ requestId }));
    toast.error('Attendance rejected');
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-display font-bold text-white">
          Attendance Approval
        </motion.h1>
        <p className="text-dark-400 mt-1">Review and approve student attendance requests</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsSkeleton /><StatsSkeleton /><StatsSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="Pending Requests" value={pendingRequests.length} icon={<HiClock className="w-5 h-5 text-white" />} color="amber" delay={0.1} />
          <StatsCard title="Approved Today" value={approvedToday.length} icon={<HiCheckCircle className="w-5 h-5 text-white" />} color="green" delay={0.15} />
          <StatsCard title="Rejected Today" value={rejectedToday.length} icon={<HiXCircle className="w-5 h-5 text-white" />} color="primary" delay={0.2} />
        </div>
      )}

      {/* Pending Requests */}
      <GlassCard>
        <SectionHeader title="⏳ Pending Attendance Requests" subtitle="Approve or reject student check-ins" />
        <div className="mt-4 space-y-3">
          {loading ? <ListSkeleton count={4} /> : pendingRequests.length > 0 ? pendingRequests.map((req, i) => {
            const student = students.find((s) => s.id === req.studentId);
            const stream = streams.find((s) => s.id === student?.streamId);
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                    <span className="text-sm font-bold text-amber-400">{student?.name?.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{student?.name}</p>
                    <p className="text-xs text-dark-500">{stream?.icon} {stream?.name} · Marked at {req.markedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(req.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                  >
                    ✅ Approve
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReject(req.id)}
                    className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                  >
                    ❌ Reject
                  </motion.button>
                </div>
              </motion.div>
            );
          }) : (
            <div className="text-center py-12">
              <span className="text-4xl mb-3 block">📭</span>
              <p className="text-dark-400 text-sm">No pending attendance requests.</p>
              <p className="text-dark-500 text-xs mt-1">New requests will appear here when students mark their attendance.</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Today's Approved/Rejected */}
      {(approvedToday.length > 0 || rejectedToday.length > 0) && (
        <GlassCard>
          <SectionHeader title="✅ Today's Processed Requests" />
          <div className="mt-4 space-y-2">
            {[...approvedToday, ...rejectedToday].map((req, i) => {
              const student = students.find((s) => s.id === req.studentId);
              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <span className="text-sm text-dark-200">{student?.name}</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    req.status === 'present' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    {req.status === 'present' ? '✅ Approved' : '❌ Rejected'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
