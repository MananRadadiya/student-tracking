import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addStream, deleteStream } from '../../store/slices/usersSlice';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { HiPlus, HiTrash, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';

const ICONS = ['🌐', '📊', '🎨', '📱', '☁️', '🔒', '🤖', '💡', '🎮', '🧬'];
const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444', '#22c55e', '#3b82f6', '#f97316'];

export default function AdminStreams() {
  const { streams } = useSelector((s) => s.users);
  const { submissions } = useSelector((s) => s.submissions);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', icon: '🌐', color: '#6366f1' });

  const handleAdd = () => {
    if (!form.name) { toast.error('Enter stream name'); return; }
    dispatch(addStream({ id: 'str' + Date.now(), ...form }));
    toast.success('Stream added!');
    setShowModal(false);
    setForm({ name: '', icon: '🌐', color: '#6366f1' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Manage Streams</motion.h1>
          <p className="text-dark-400 mt-1">Create and manage learning streams</p>
        </div>
        <motion.button onClick={() => setShowModal(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary-500/20">
          <HiPlus className="w-4 h-4" /> Add Stream
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream, i) => {
          const count = submissions.filter((s) => s.streamId === stream.id).length;
          return (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/5 bg-dark-900/50 backdrop-blur-xl p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${stream.color}15`, border: `1px solid ${stream.color}30` }}>
                  {stream.icon}
                </div>
                <button onClick={() => { dispatch(deleteStream(stream.id)); toast.success('Stream removed'); }} className="p-1.5 rounded-lg hover:bg-red-500/10 text-dark-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-white font-semibold mb-1">{stream.name}</h3>
              <p className="text-xs text-dark-400">{count} submissions</p>
              <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((count / 20) * 100, 100)}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full rounded-full" style={{ background: stream.color }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full max-w-md rounded-2xl bg-dark-900 border border-white/10 p-6 shadow-2xl">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-dark-400 hover:text-white"><HiX className="w-5 h-5" /></button>
              <h3 className="text-lg font-display font-bold text-white mb-6">Add Stream</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Stream Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="e.g. Machine Learning" />
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map((ic) => (
                      <button key={ic} onClick={() => setForm({ ...form, icon: ic })} className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-all ${form.icon === ic ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                      <button key={c} onClick={() => setForm({ ...form, color: c })} className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c ? 'border-white scale-110' : 'border-transparent'}`} style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-dark-300 text-sm hover:bg-white/5 transition-all">Cancel</button>
                <motion.button onClick={handleAdd} whileTap={{ scale: 0.97 }} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold shadow-lg">Create</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
