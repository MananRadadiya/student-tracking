import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HiDocumentText, HiUsers, HiCheckCircle, HiClock, HiDownload, HiDocumentDuplicate, HiPhotograph, HiCode } from 'react-icons/hi';
import { StatsCard, GlassCard, SectionHeader, StatusBadge } from '../../components/dashboard/SharedUI';
import { StatsSkeleton, ListSkeleton } from '../../components/ui/Skeleton';
import { updateSubmissionStatusAsync, addFeedbackAsync, setFilter } from '../../store/slices/submissionsSlice';
import toast from 'react-hot-toast';

const FILE_ICONS = {
  pdf: { icon: <HiDocumentDuplicate className="w-3.5 h-3.5" />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  image: { icon: <HiPhotograph className="w-3.5 h-3.5" />, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  code: { icon: <HiCode className="w-3.5 h-3.5" />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  default: { icon: <HiDocumentText className="w-3.5 h-3.5" />, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
};

function formatSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

export default function FacultyDashboard() {
  const { submissions, feedback, filters } = useSelector((s) => s.submissions);
  const { students, streams } = useSelector((s) => s.users);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [feedbackText, setFeedbackText] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredSubs = submissions.filter((sub) => {
    if (filters.stream !== 'all' && sub.streamId !== filters.stream) return false;
    if (filters.status !== 'all' && sub.status !== filters.status) return false;
    if (filters.date && sub.date !== filters.date) return false;
    return true;
  });

  const todayCount = submissions.filter((s) => s.date === new Date().toISOString().split('T')[0]).length;
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const pendingCount = submissions.filter((s) => s.status === 'submitted').length;

  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updateSubmissionStatusAsync({ id, status })).unwrap();
      toast.success(`Status updated to ${status.replace('_', ' ')}`);
    } catch (error) {
      toast.error(error || 'Failed to update status');
    }
  };

  const handleFeedback = async (submissionId) => {
    const text = feedbackText[submissionId];
    if (!text?.trim()) { toast.error('Enter feedback'); return; }
    try {
      await dispatch(addFeedbackAsync({ submissionId, comment: text, rating: 4 })).unwrap();
      setFeedbackText({ ...feedbackText, [submissionId]: '' });
      toast.success('Feedback added!');
    } catch (error) {
      toast.error(error || 'Failed to add feedback');
    }
  };

  const handleDownload = (fileName) => {
    toast.success(`Download started: ${fileName}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl sm:text-3xl font-display font-bold text-white">Faculty Dashboard</motion.h1>
        <p className="text-dark-400 mt-1">Review and manage student submissions</p>
      </div>

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
          <StatsCard title="Total Submissions" value={submissions.length} icon={<HiDocumentText className="w-5 h-5 text-white" />} color="primary" delay={0.1} />
          <StatsCard title="Today's Submissions" value={todayCount} icon={<HiClock className="w-5 h-5 text-white" />} color="cyan" delay={0.15} />
          <StatsCard title="Approved" value={approvedCount} icon={<HiCheckCircle className="w-5 h-5 text-white" />} color="green" delay={0.2} />
          <StatsCard title="Pending Review" value={pendingCount} icon={<HiUsers className="w-5 h-5 text-white" />} color="amber" delay={0.25} />
        </div>
      )}

      {/* Filters */}
      <GlassCard hover={false}>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="text-xs text-dark-400 mb-1.5 block">Stream</label>
            <select value={filters.stream} onChange={(e) => dispatch(setFilter({ key: 'stream', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
              <option value="all" className="bg-dark-900">All Streams</option>
              {streams.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.name}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs text-dark-400 mb-1.5 block">Status</label>
            <select value={filters.status} onChange={(e) => dispatch(setFilter({ key: 'status', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
              <option value="all" className="bg-dark-900">All Status</option>
              <option value="submitted" className="bg-dark-900">Submitted</option>
              <option value="reviewed" className="bg-dark-900">Reviewed</option>
              <option value="approved" className="bg-dark-900">Approved</option>
              <option value="needs_improvement" className="bg-dark-900">Needs Improvement</option>
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs text-dark-400 mb-1.5 block">Date</label>
            <input type="date" value={filters.date} onChange={(e) => dispatch(setFilter({ key: 'date', value: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" />
          </div>
        </div>
      </GlassCard>

      {/* Submissions List */}
      <div className="space-y-4">
        {loading ? (
          <ListSkeleton count={4} />
        ) : (
          filteredSubs.map((sub, i) => {
          const student = students.find((s) => s.id === sub.studentId);
          const stream = streams.find((s) => s.id === sub.streamId);
          const subFeedback = feedback.filter((f) => f.submissionId === sub.id);
          const isExpanded = expandedId === sub.id;

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-white/5 bg-dark-900/50 backdrop-blur-xl overflow-hidden"
            >
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : sub.id)}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                      <span className="text-sm font-bold text-primary-300">{student?.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{sub.title || student?.name}</p>
                      <p className="text-xs text-dark-500">{student?.name} · {stream?.icon} {stream?.name} · {sub.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {sub.files?.length > 0 && (
                      <span className="text-[10px] text-dark-500 flex items-center gap-1">
                        <HiDocumentText className="w-3 h-3" /> {sub.files.length} file{sub.files.length > 1 ? 's' : ''}
                      </span>
                    )}
                    <StatusBadge status={sub.status} />
                    <span className="text-dark-500 text-xs">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-xs text-primary-400 mb-2 font-medium">📖 Learned in Class</p>
                      <p className="text-sm text-dark-200">{sub.learnedInClass}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-xs text-cyan-400 mb-2 font-medium">🏠 Learned at Home</p>
                      <p className="text-sm text-dark-200">{sub.learnedAtHome}</p>
                    </div>
                  </div>

                  {/* File Attachments */}
                  {sub.files?.length > 0 && (
                    <div>
                      <p className="text-xs text-dark-400 mb-2 font-medium">📎 Attached Files</p>
                      <div className="flex flex-wrap gap-2">
                        {sub.files.map((file, fi) => {
                          const ft = FILE_ICONS[file.type] || FILE_ICONS.default;
                          return (
                            <motion.button
                              key={fi}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDownload(file.name)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all hover:brightness-125 ${ft.color}`}
                            >
                              {ft.icon}
                              <div>
                                <p className="text-xs text-white truncate max-w-[120px]">{file.name}</p>
                                <p className="text-[10px] text-dark-500">{formatSize(file.size)}</p>
                              </div>
                              <HiDownload className="w-3.5 h-3.5 text-dark-400 ml-1" />
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Status Update */}
                  <div>
                    <p className="text-xs text-dark-400 mb-2 font-medium">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {['submitted', 'reviewed', 'approved', 'needs_improvement'].map((status) => (
                        <button key={status} onClick={() => handleStatusUpdate(sub.id, status)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${sub.status === status ? 'border-primary-500/40 bg-primary-500/10 text-primary-400' : 'border-white/10 text-dark-400 hover:border-white/20 hover:bg-white/5'}`}>
                          {status.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Existing Feedback */}
                  {subFeedback.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-dark-400 font-medium">Previous Feedback</p>
                      {subFeedback.map((f) => (
                        <div key={f.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-dark-300">
                          {f.comment}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Feedback */}
                  <div>
                    <p className="text-xs text-dark-400 mb-2 font-medium">Add Feedback</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={feedbackText[sub.id] || ''}
                        onChange={(e) => setFeedbackText({ ...feedbackText, [sub.id]: e.target.value })}
                        placeholder="Write feedback..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 placeholder-dark-500"
                      />
                      <motion.button onClick={() => handleFeedback(sub.id)} whileTap={{ scale: 0.95 }} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold">
                        Send
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
          })
        )}

        {!loading && filteredSubs.length === 0 && (
          <GlassCard className="text-center py-12">
            <p className="text-dark-400">No submissions match your filters.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
