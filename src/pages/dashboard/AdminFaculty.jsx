import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addFaculty, updateFaculty, deleteFaculty } from '../../store/slices/usersSlice';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { HiPlus, HiPencil, HiTrash, HiX, HiSearch, HiPhone, HiMail, HiAcademicCap, HiBadgeCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

const DEPARTMENT_COLORS = {
  'Web Development': 'from-blue-500/20 to-indigo-500/20 border-blue-500/20',
  'Data Science': 'from-purple-500/20 to-violet-500/20 border-purple-500/20',
  'UI/UX Design': 'from-pink-500/20 to-rose-500/20 border-pink-500/20',
  'Cloud Computing': 'from-cyan-500/20 to-teal-500/20 border-cyan-500/20',
  'Cyber Security': 'from-amber-500/20 to-orange-500/20 border-amber-500/20',
  'Mobile Development': 'from-emerald-500/20 to-green-500/20 border-emerald-500/20',
};

const DEPARTMENT_ICONS = {
  'Web Development': '🌐',
  'Data Science': '📊',
  'UI/UX Design': '🎨',
  'Cloud Computing': '☁️',
  'Cyber Security': '🔒',
  'Mobile Development': '📱',
};

export default function AdminFaculty() {
  const { faculty, streams } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editFac, setEditFac] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', department: 'Web Development', specialization: '',
    phone: '', assignedStreams: [], status: 'active',
  });

  const filtered = faculty.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditFac(null);
    setForm({ name: '', email: '', department: 'Web Development', specialization: '', phone: '', assignedStreams: [], status: 'active' });
    setShowModal(true);
  };

  const openEdit = (f) => {
    setEditFac(f);
    setForm({ name: f.name, email: f.email, department: f.department, specialization: f.specialization, phone: f.phone, assignedStreams: f.assignedStreams, status: f.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error('Please fill all required fields'); return; }
    if (editFac) {
      dispatch(updateFaculty({ ...editFac, ...form }));
      toast.success('Faculty updated!');
    } else {
      dispatch(addFaculty({
        id: 'f' + Date.now(), userId: null, ...form,
        joinDate: new Date().toISOString().split('T')[0],
      }));
      toast.success('Faculty added!');
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    dispatch(deleteFaculty(id));
    toast.success(`${name} removed`);
  };

  const toggleStream = (streamId) => {
    setForm((prev) => ({
      ...prev,
      assignedStreams: prev.assignedStreams.includes(streamId)
        ? prev.assignedStreams.filter((s) => s !== streamId)
        : [...prev.assignedStreams, streamId],
    }));
  };

  const activeCount = faculty.filter((f) => f.status === 'active').length;
  const departments = [...new Set(faculty.map((f) => f.department))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Manage Faculty</motion.h1>
          <p className="text-dark-400 mt-1">Add, edit, and manage faculty members</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="text-dark-400">Total: <span className="text-white font-bold">{faculty.length}</span></span>
            <span className="text-dark-400">Active: <span className="text-emerald-400 font-bold">{activeCount}</span></span>
            <span className="text-dark-400">Depts: <span className="text-cyan-400 font-bold">{departments.length}</span></span>
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty by name, email, or department..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 text-sm outline-none focus:border-primary-500/50 transition-all"
          />
        </div>
        <motion.button
          onClick={openAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary-500/20"
        >
          <HiPlus className="w-4 h-4" /> Add Faculty
        </motion.button>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((fac, i) => {
          const colorClass = DEPARTMENT_COLORS[fac.department] || 'from-primary-500/20 to-purple-500/20 border-primary-500/20';
          const deptIcon = DEPARTMENT_ICONS[fac.department] || '📚';
          const assignedStreamNames = fac.assignedStreams.map((sid) => streams.find((s) => s.id === sid)?.name).filter(Boolean);

          return (
            <motion.div
              key={fac.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/5 bg-dark-900/50 backdrop-blur-xl p-5 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center border`}>
                    <span className="text-lg font-bold">{deptIcon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-sm">{fac.name}</p>
                      {fac.status === 'active' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                      )}
                    </div>
                    <p className="text-xs text-dark-500">{fac.department}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(fac)} className="p-1.5 rounded-lg hover:bg-white/10 text-dark-400 hover:text-primary-400 transition-all"><HiPencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(fac.id, fac.name)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400 transition-all"><HiTrash className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-dark-400">
                  <HiAcademicCap className="w-3.5 h-3.5" />
                  <span className="text-dark-300">{fac.specialization}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-400">
                  <HiMail className="w-3.5 h-3.5" />
                  <span>{fac.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-400">
                  <HiPhone className="w-3.5 h-3.5" />
                  <span>{fac.phone}</span>
                </div>
              </div>

              {/* Assigned Streams */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {assignedStreamNames.map((name) => (
                  <span key={name} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-dark-300">
                    {name}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-[10px] text-dark-500">Joined {fac.joinDate}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                  fac.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}>
                  {fac.status === 'active' ? '● Active' : '◎ On Leave'}
                </span>
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
              className="relative w-full max-w-lg rounded-2xl bg-dark-900 border border-white/10 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-dark-400 hover:text-white"><HiX className="w-5 h-5" /></button>
              <h3 className="text-lg font-display font-bold text-white mb-6">{editFac ? 'Edit' : 'Add'} Faculty</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-dark-400 mb-1.5 block">Full Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 mb-1.5 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="Enter email" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-dark-400 mb-1.5 block">Department</label>
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
                      {Object.keys(DEPARTMENT_COLORS).map((d) => <option key={d} value={d} className="bg-dark-900">{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 mb-1.5 block">Phone</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="+91..." />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Specialization</label>
                  <input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50" placeholder="e.g. React & Node.js" />
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
                    <option value="active" className="bg-dark-900">Active</option>
                    <option value="on-leave" className="bg-dark-900">On Leave</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-dark-400 mb-1.5 block">Assigned Streams</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {streams.map((s) => {
                      const isSelected = form.assignedStreams.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleStream(s.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-primary-500/20 border-primary-500/30 text-primary-300'
                              : 'bg-white/5 border-white/10 text-dark-400 hover:border-white/20'
                          }`}
                        >
                          {s.icon} {s.name}
                        </button>
                      );
                    })}
                  </div>
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
