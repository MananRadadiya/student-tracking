import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addSubmission } from '../../store/slices/submissionsSlice';
import { GlassCard, SectionHeader } from '../../components/dashboard/SharedUI';
import { HiUpload, HiCheckCircle, HiDocumentText, HiPhotograph, HiCode, HiX, HiCloudUpload } from 'react-icons/hi';
import toast from 'react-hot-toast';

const FILE_ICONS = {
  pdf: { icon: <HiDocumentText className="w-5 h-5" />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  image: { icon: <HiPhotograph className="w-5 h-5" />, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  code: { icon: <HiCode className="w-5 h-5" />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  default: { icon: <HiDocumentText className="w-5 h-5" />, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
};

function getFileType(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'image';
  if (['js', 'jsx', 'ts', 'tsx', 'py', 'html', 'css', 'java', 'cpp', 'c'].includes(ext)) return 'code';
  return 'default';
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

export default function StudentSubmit() {
  const { streams } = useSelector((s) => s.users);
  const { user } = useSelector((s) => s.auth);
  const { students } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ title: '', streamId: streams[0]?.id || '', learnedInClass: '', learnedAtHome: '' });

  const student = students.find((s) => s.userId === user?.id || s.id === user?.studentId);

  const handleFiles = (newFiles) => {
    const fileList = Array.from(newFiles).map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: f.size,
      type: getFileType(f.name),
    }));
    setFiles((prev) => [...prev, ...fileList]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.learnedInClass || !form.learnedAtHome) { toast.error('Please fill all fields'); return; }
    dispatch(addSubmission({
      id: 'sub' + Date.now(),
      studentId: student?.id || 's1',
      streamId: form.streamId,
      title: form.title || 'Daily Submission',
      date: new Date().toISOString().split('T')[0],
      learnedInClass: form.learnedInClass,
      learnedAtHome: form.learnedAtHome,
      files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      status: 'submitted',
      createdAt: new Date().toISOString(),
    }));
    toast.success('Submission uploaded successfully! 🎉');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ title: '', streamId: streams[0]?.id || '', learnedInClass: '', learnedAtHome: '' });
    setFiles([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-display font-bold text-white">Submit Daily Work</motion.h1>
        <p className="text-dark-400 mt-1">Record what you learned today and upload your work</p>
      </div>

      <GlassCard hover={false} className="max-w-2xl">
        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <HiCheckCircle className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h3 className="text-xl font-display font-bold text-white mb-2">Submitted!</h3>
            <p className="text-dark-400">Your daily work has been recorded. Keep up the great work! 🔥</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <SectionHeader title="📝 Today's Submission" subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />

            {/* Title */}
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">Submission Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 placeholder-dark-500"
                placeholder="e.g. React Hooks Practice Project"
              />
            </div>

            {/* Stream */}
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">Stream</label>
              <select value={form.streamId} onChange={(e) => setForm({ ...form, streamId: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 appearance-none cursor-pointer">
                {streams.map((s) => <option key={s.id} value={s.id} className="bg-dark-900">{s.icon} {s.name}</option>)}
              </select>
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">📎 Upload Files (PDF, images, code, etc.)</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
                  isDragOver
                    ? 'border-primary-500/60 bg-primary-500/[0.06]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <motion.div
                  animate={isDragOver ? { scale: 1.05 } : { scale: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isDragOver ? 'bg-primary-500/15 text-primary-400' : 'bg-white/5 text-dark-500'}`}>
                    <HiCloudUpload className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-dark-300">
                    <span className="text-primary-400 font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-dark-600">PDF, PNG, JPG, JS, PY, HTML, CSS (max 10MB each)</p>
                </motion.div>
              </div>

              {/* File list */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 space-y-2">
                    {files.map((file) => {
                      const ft = FILE_ICONS[file.type] || FILE_ICONS.default;
                      return (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${ft.color}`}
                        >
                          {ft.icon}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{file.name}</p>
                            <p className="text-xs text-dark-500">{formatSize(file.size)}</p>
                          </div>
                          <button type="button" onClick={() => removeFile(file.id)} className="p-1 rounded-lg hover:bg-white/10 text-dark-500 hover:text-white transition-all">
                            <HiX className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* What learned */}
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">📖 What I learned in class today</label>
              <textarea
                value={form.learnedInClass}
                onChange={(e) => setForm({ ...form, learnedInClass: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 placeholder-dark-500 resize-none"
                placeholder="Describe what you learned in class today..."
              />
            </div>

            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">🏠 What I learned at home</label>
              <textarea
                value={form.learnedAtHome}
                onChange={(e) => setForm({ ...form, learnedAtHome: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 placeholder-dark-500 resize-none"
                placeholder="Describe additional learning at home..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 via-purple-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
            >
              <HiUpload className="w-5 h-5" /> Submit Today's Work
            </motion.button>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
