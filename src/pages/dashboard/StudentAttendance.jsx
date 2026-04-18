import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiClock, HiLocationMarker } from 'react-icons/hi';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { CardSkeleton, ListSkeleton } from '../../components/ui/Skeleton';
import { markAttendance } from '../../store/slices/attendanceSlice';
import toast from 'react-hot-toast';

export default function StudentAttendance() {
  const { todayRequests, records } = useSelector((s) => s.attendance);
  const { user } = useSelector((s) => s.auth);
  const { students } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const student = students.find((s) => s.userId === user?.id || s.id === user?.studentId);
  const studentId = student?.id || 's1';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const todayRequest = todayRequests.find((r) => r.studentId === studentId && r.date === today);
  const myRecords = records.filter((r) => r.studentId === studentId).sort((a, b) => b.date.localeCompare(a.date));
  const presentDays = myRecords.filter((r) => r.status === 'present').length;
  const totalDays = myRecords.length || 1;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  const handleMarkAttendance = () => {
    dispatch(markAttendance({ studentId, date: today }));
    toast.success('Attendance marked! Waiting for faculty approval.');
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-display font-bold text-white">
          My Attendance
        </motion.h1>
        <p className="text-dark-400 mt-1">Mark your daily attendance and view history</p>
      </div>

      {/* Mark Attendance Card */}
      <GlassCard>
        <div className="text-center py-6 space-y-4">
          {loading ? <CardSkeleton /> : todayRequest ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 ${
                todayRequest.status === 'present' ? 'bg-emerald-500/20 border-emerald-500/40' :
                todayRequest.status === 'rejected' ? 'bg-red-500/20 border-red-500/40' :
                'bg-amber-500/20 border-amber-500/40'
              }`}>
                {todayRequest.status === 'present' ? (
                  <HiCheckCircle className="w-10 h-10 text-emerald-400" />
                ) : todayRequest.status === 'rejected' ? (
                  <span className="text-3xl">❌</span>
                ) : (
                  <HiClock className="w-10 h-10 text-amber-400" />
                )}
              </div>
              <h3 className="text-lg font-display font-bold text-white mt-4">
                {todayRequest.status === 'present' ? 'Attendance Approved!' :
                 todayRequest.status === 'rejected' ? 'Attendance Rejected' :
                 'Attendance Pending Approval'}
              </h3>
              <p className="text-dark-400 text-sm mt-1">
                {todayRequest.status === 'pending' ? `Marked at ${todayRequest.markedAt}. Waiting for faculty approval.` :
                 todayRequest.status === 'present' ? `Your attendance was approved for today.` :
                 'Your attendance request was rejected. Contact your faculty.'}
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-500/20 to-cyan-500/20 border-2 border-primary-500/30 flex items-center justify-center">
                <HiLocationMarker className="w-10 h-10 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">Ready to Mark Today</h3>
                <p className="text-dark-400 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMarkAttendance}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white font-medium shadow-lg shadow-primary-500/20 hover:shadow-xl transition-shadow text-sm"
              >
                📍 Mark Present
              </motion.button>
            </motion.div>
          )}
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">{presentDays}</p>
            <p className="text-xs text-dark-400 mt-1">Present Days</p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{totalDays}</p>
            <p className="text-xs text-dark-400 mt-1">Total Working Days</p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-center">
            <p className={`text-3xl font-bold ${attendancePercentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>{attendancePercentage}%</p>
            <p className="text-xs text-dark-400 mt-1">Attendance Rate</p>
          </div>
        </GlassCard>
      </div>

      {/* Attendance History */}
      <GlassCard>
        <SectionHeader title="📅 Attendance History" subtitle="Your past attendance records" />
        <div className="mt-4 space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {loading ? <ListSkeleton count={5} /> : myRecords.slice(0, 20).map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div>
                <p className="text-sm text-white font-medium">{record.date}</p>
                <p className="text-xs text-dark-500">{record.markedAt ? `Marked at ${record.markedAt}` : 'Not marked'}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                record.status === 'present' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                record.status === 'late' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {record.status === 'present' ? '✅ Present' : record.status === 'late' ? '🕐 Late' : '❌ Absent'}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
