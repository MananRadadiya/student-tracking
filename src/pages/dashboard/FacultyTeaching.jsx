import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addTeachingLog } from '../../store/slices/submissionsSlice';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { HiUpload } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function FacultyTeaching() {
  const { teachingLogs } = useSelector((s) => s.submissions);
  const { streams } = useSelector((s) => s.users);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ topic: '', streamId: streams[0]?.id || '', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.topic) { toast.error('Enter topic'); return; }
    dispatch(addTeachingLog({
      id: 'tl' + Date.now(),
      facultyId: user.id,
      date: new Date().toISOString().split('T')[0],
      ...form,
    }));
    toast.success('Teaching log uploaded!');
    setForm({ topic: '', streamId: streams[0]?.id || '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Teaching Log</motion.h1>
        <p className="text-dark-400 mt-1">Upload what was taught today</p>
      </div>

      {/* Upload Form */}
      <GlassCard hover={false}>
        <SectionHeader title="What was taught today?" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Topic</label>
            <input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 placeholder-dark-500" placeholder="e.g. React Hooks - useState, useEffect" />
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Stream</label>
            <select value={form.streamId} onChange={(e) => setForm({ ...form, streamId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
              {streams.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.icon} {s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1.5 block">Additional Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 placeholder-dark-500 resize-none" placeholder="Optional notes..." />
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary-500/20">
            <HiUpload className="w-4 h-4" /> Upload Log
          </motion.button>
        </form>
      </GlassCard>

      {/* Previous Logs */}
      <GlassCard>
        <SectionHeader title="Previous Teaching Logs" />
        <div className="space-y-3">
          {teachingLogs.map((log, i) => {
            const stream = streams.find((s) => s.id === log.streamId);
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{log.topic}</h4>
                  <span className="text-xs text-dark-500">{log.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs">{stream?.icon}</span>
                  <span className="text-xs text-dark-400">{stream?.name}</span>
                </div>
                {log.notes && <p className="text-xs text-dark-400">{log.notes}</p>}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
