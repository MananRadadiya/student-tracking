import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { HiUsers, HiCheckCircle, HiXCircle, HiClock } from 'react-icons/hi';
import { StatsCard, GlassCard, SectionHeader, StatusBadge } from '../../components/dashboard/SharedUI';
import { StatsSkeleton, ListSkeleton } from '../../components/ui/Skeleton';

export default function AdminAttendance() {
  const { records, todayRequests } = useSelector((s) => s.attendance);
  const { students, streams } = useSelector((s) => s.users);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get records for selected date
  const dateRecords = records.filter((r) => r.date === selectedDate);
  const pendingToday = todayRequests.filter((r) => r.status === 'pending');
  const presentCount = dateRecords.filter((r) => r.status === 'present').length;
  const absentCount = dateRecords.filter((r) => r.status === 'absent').length;
  const lateCount = dateRecords.filter((r) => r.status === 'late').length;
  const totalToday = dateRecords.length || students.length;
  const attendanceRate = totalToday > 0 ? Math.round((presentCount / totalToday) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-display font-bold text-white">
          Attendance Management
        </motion.h1>
        <p className="text-dark-400 mt-1">Monitor and track student attendance across all streams</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsSkeleton /><StatsSkeleton /><StatsSkeleton /><StatsSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Present" value={presentCount} icon={<HiCheckCircle className="w-5 h-5 text-white" />} color="green" delay={0.1} />
          <StatsCard title="Absent" value={absentCount} icon={<HiXCircle className="w-5 h-5 text-white" />} color="amber" delay={0.15} />
          <StatsCard title="Late" value={lateCount} icon={<HiClock className="w-5 h-5 text-white" />} color="purple" delay={0.2} />
          <StatsCard title="Attendance Rate" value={`${attendanceRate}%`} icon={<HiUsers className="w-5 h-5 text-white" />} color="cyan" delay={0.25} />
        </div>
      )}

      {/* Date Filter */}
      <GlassCard hover={false}>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-xs text-dark-400 mb-1.5 block">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50"
            />
          </div>
          {pendingToday.length > 0 && (
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 text-sm font-medium">{pendingToday.length} pending approvals</span>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Attendance Table */}
      <GlassCard>
        <SectionHeader title="📋 Attendance Records" subtitle={`Showing for ${selectedDate}`} />
        <div className="overflow-x-auto mt-4">
          {loading ? <ListSkeleton count={6} /> : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Student</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Stream</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => {
                  const record = dateRecords.find((r) => r.studentId === student.id);
                  const stream = streams.find((s) => s.id === student.streamId);
                  const status = record?.status || 'no-record';
                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                            <span className="text-xs font-bold text-primary-300">{student.name?.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-dark-300">{stream?.icon} {stream?.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                          status === 'present' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          status === 'late' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                          status === 'absent' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                          'bg-dark-800 border-white/5 text-dark-500'
                        }`}>
                          {status === 'no-record' ? 'No Record' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-dark-400 text-xs">{record?.markedAt || '—'}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
