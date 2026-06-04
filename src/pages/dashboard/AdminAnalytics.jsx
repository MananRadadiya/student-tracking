import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { fetchMonthlyTrend } from '../../store/slices/analyticsSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

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

export default function AdminAnalytics() {
  const { students, streams } = useSelector((s) => s.users);
  const { submissions } = useSelector((s) => s.submissions);
  const { monthlyTrendData } = useSelector((s) => s.analytics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyTrend());
  }, [dispatch]);

  const streamStats = streams.map((stream) => ({
    name: stream.name,
    students: students.filter((s) => (s.stream_id || s.streamId) === stream.id).length,
    submissions: submissions.filter((s) => (s.stream_id || s.streamId) === stream.id).length,
    color: stream.color,
  }));

  const statusData = [
    { name: 'Submitted', value: submissions.filter((s) => s.status === 'submitted').length, color: '#3b82f6' },
    { name: 'Reviewed', value: submissions.filter((s) => s.status === 'reviewed').length, color: '#8b5cf6' },
    { name: 'Approved', value: submissions.filter((s) => s.status === 'approved').length, color: '#22c55e' },
    { name: 'Needs Improvement', value: submissions.filter((s) => s.status === 'needs_improvement').length, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Analytics</motion.h1>
        <p className="text-dark-400 mt-1">Detailed analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream-wise Comparison */}
        <GlassCard>
          <SectionHeader title="Stream-wise Performance" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={streamStats} layout="vertical" barCategoryGap="25%">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="submissions" fill="url(#streamBar)" radius={[0, 6, 6, 0]} name="Submissions" />
                <defs>
                  <linearGradient id="streamBar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Status Distribution */}
        <GlassCard>
          <SectionHeader title="Submission Status" />
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs text-dark-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Monthly Trend */}
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Submission Trend" subtitle="Monthly submission volume" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="analyticGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="total" stroke="#6366f1" fill="url(#analyticGrad)" strokeWidth={2} name="Total" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
