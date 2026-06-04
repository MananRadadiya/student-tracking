import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HiUsers, HiDocumentText, HiAcademicCap, HiTrendingUp, HiClock, HiDownload } from 'react-icons/hi';
import { StatsCard, GlassCard, SectionHeader, StatusBadge } from '../../components/dashboard/SharedUI';
import { StatsSkeleton, ChartSkeleton, ListSkeleton, CardSkeleton } from '../../components/ui/Skeleton';
import { fetchWeeklySubmissions, fetchStreamDistribution, fetchMonthlyTrend } from '../../store/slices/analyticsSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import LiveActivityFeed from '../../components/dashboard/LiveActivityFeed';
import ExportReportModal from '../../components/dashboard/ExportReportModal';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-white text-sm font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const { students, streams } = useSelector((s) => s.users);
  const { submissions } = useSelector((s) => s.submissions);
  const { weeklySubmissionData, streamDistributionData, monthlyTrendData } = useSelector((s) => s.analytics);
  const dispatch = useDispatch();

  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const todayCount = submissions.filter((s) => s.date === new Date().toISOString().split('T')[0]).length;
  const missedStudents = students.filter((st) => !submissions.some((sub) => sub.student_id === st.id && sub.date === new Date().toISOString().split('T')[0]));

  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    dispatch(fetchWeeklySubmissions());
    dispatch(fetchStreamDistribution());
    dispatch(fetchMonthlyTrend());
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl sm:text-3xl font-display font-bold text-white"
        >
          Admin Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-dark-400 mt-1"
        >
          Overview of your institution's daily submissions
        </motion.p>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowExport(true)}
          className="mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-0 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary-500/20"
        >
          <HiDownload className="w-4 h-4" />
          Generate Report
        </motion.button>
      </div>

      {/* Stats Row */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Students" value={students.length} icon={<HiUsers className="w-5 h-5 text-white" />} trend="up" trendValue="12%" color="primary" delay={0.1} />
          <StatsCard title="Total Submissions" value={totalSubmissions} icon={<HiDocumentText className="w-5 h-5 text-white" />} trend="up" trendValue="8%" color="cyan" delay={0.15} />
          <StatsCard title="Today's Submissions" value={todayCount} icon={<HiTrendingUp className="w-5 h-5 text-white" />} color="green" delay={0.2} />
          <StatsCard title="Missing Today" value={missedStudents.length} icon={<HiClock className="w-5 h-5 text-white" />} trend="down" trendValue="3%" color="amber" delay={0.25} />
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Submissions */}
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Weekly Submissions" subtitle="Submissions vs Approved this week" />
          <div className="h-64 mt-4">
            {loading ? <ChartSkeleton /> : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySubmissionData} barCategoryGap="20%">
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="submissions" fill="url(#barGradient1)" radius={[6, 6, 0, 0]} name="Submissions" />
                <Bar dataKey="approved" fill="url(#barGradient2)" radius={[6, 6, 0, 0]} name="Approved" />
                <defs>
                  <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </GlassCard>

        {/* Stream Distribution */}
        <GlassCard>
          <SectionHeader title="Stream Distribution" />
          <div className="h-52 mt-4">
            {loading ? <CardSkeleton /> : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={streamDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {streamDistributionData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            )}
          </div>
          {!loading && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {streamDistributionData.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs text-dark-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  {s.name} ({s.value}%)
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Monthly Trend + Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <GlassCard>
          <SectionHeader title="Monthly Trend" subtitle="Submission volume over time" />
          <div className="h-52 mt-4">
            {loading ? <ChartSkeleton /> : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="total" stroke="#8b5cf6" fill="url(#areaGrad)" strokeWidth={2} name="Submissions" />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </GlassCard>

        {/* Live Activity Feed */}
        <GlassCard>
          <SectionHeader title="📡 Live Activity Feed" subtitle="Real-time platform events" />
          <div className="mt-4">
            {loading ? <ListSkeleton count={3} /> : <LiveActivityFeed />}
          </div>
        </GlassCard>
      </div>

      {/* Recent Submissions Table */}
      <GlassCard>
        <SectionHeader title="Recent Submissions" subtitle="Latest submissions from all students" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Student</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Stream</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-dark-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 8).map((sub, i) => {
                const student = students.find((s) => s.id === sub.studentId);
                const stream = streams.find((s) => s.id === sub.streamId);
                return (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                          <span className="text-xs font-bold text-primary-300">{student?.name?.charAt(0)}</span>
                        </div>
                        <span className="text-white font-medium">{student?.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2 text-dark-300">
                        <span>{stream?.icon}</span> {stream?.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-dark-400">{sub.date}</td>
                    <td className="py-3 px-4"><StatusBadge status={sub.status} /></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Export Report Modal */}
      <ExportReportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
}
