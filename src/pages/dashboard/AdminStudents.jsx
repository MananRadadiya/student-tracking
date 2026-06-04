import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { createStudentAsync, updateStudentAsync, deleteStudentAsync } from '../../store/slices/usersSlice';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { HiPlus, HiPencil, HiTrash, HiX, HiSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function AdminStudents() {
  const { students, streams } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', streamId: '' });

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStream = streamFilter === 'all' || s.stream_id === streamFilter || s.streamId === streamFilter;
    return matchSearch && matchStream;
  });

  const openAdd = () => { setEditStudent(null); setForm({ name: '', email: '', streamId: streams[0]?.id || '' }); setShowModal(true); };
  const openEdit = (s) => { setEditStudent(s); setForm({ name: s.name, email: s.email, streamId: s.stream_id || s.streamId }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name || !form.email) { toast.error('Please fill all fields'); return; }
    try {
      if (editStudent) {
        await dispatch(updateStudentAsync({ id: editStudent.id, ...form })).unwrap();
        toast.success('Student updated!');
      } else {
        await dispatch(createStudentAsync({ ...form, enrollmentDate: new Date().toISOString().split('T')[0] })).unwrap();
        toast.success('Student added!');
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await dispatch(deleteStudentAsync(id)).unwrap();
      toast.success(`${name} removed`);
    } catch (error) {
      toast.error(error || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Manage Students</motion.h1>
        <p className="text-dark-400 mt-1">Add, edit, and remove students from the system</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 text-sm outline-none focus:border-primary-500/50 transition-all"
          />
        </div>
        <select
          value={streamFilter}
          onChange={(e) => setStreamFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
        >
          <option value="all" className="bg-dark-900">All Streams</option>
          {streams.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.name}</option>)}
        </select>
        <motion.button
          onClick={openAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary-500/20"
        >
          <HiPlus className="w-4 h-4" /> Add Student
        </motion.button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((student, i) => {
          const stream = streams.find((s) => s.id === student.streamId);
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/5 bg-dark-900/50 backdrop-blur-xl p-5 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex items-center justify-center border border-white/10">
                    <span className="text-sm font-bold text-primary-300">{student.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{student.name}</p>
                    <p className="text-xs text-dark-500">{student.email}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(student)} className="p-1.5 rounded-lg hover:bg-white/10 text-dark-400 hover:text-primary-400 transition-all"><HiPencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(student.id, student.name)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400 transition-all"><HiTrash className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{stream?.icon}</span>
                <span className="text-xs text-dark-300">{stream?.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-dark-400">
                <span>🔥 {student.streak} day streak</span>
                <span>📝 {student.totalSubmissions} submissions</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl bg-dark-900 border border-white/10 p-6 shadow-2xl"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-dark-400 hover:text-white"><HiX className="w-5 h-5" /></button>
              <h3 className="text-lg font-display font-bold text-white mb-6">{editStudent ? 'Edit' : 'Add'} Student</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="Enter name" />
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="Enter email" />
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Stream</label>
                  <select value={form.streamId} onChange={(e) => setForm({ ...form, streamId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
                    {streams.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-dark-300 text-sm hover:bg-white/5 transition-all">Cancel</button>
                <motion.button onClick={handleSave} whileTap={{ scale: 0.97 }} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold shadow-lg">Save</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
