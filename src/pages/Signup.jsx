import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { registerUser, clearError } from '../store/slices/authSlice';
import { fetchStreams } from '../store/slices/usersSlice';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiLightningBolt, HiSparkles, HiUser, HiAcademicCap, HiIdentification } from 'react-icons/hi';

const features = [
  { icon: <HiLightningBolt className="w-5 h-5 text-cyan-400" />, title: 'Join the Future', desc: 'Create your account and unlock your potential.' },
  { icon: <HiAcademicCap className="w-5 h-5 text-purple-400" />, title: 'Smart Learning', desc: 'Interactive dashboards for students and faculty.' },
];

const DEPARTMENTS = ['Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cyber Security', 'Mobile Development'];

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    streamId: '',
    department: 'Web Development',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((s) => s.auth);
  const { streams, error: usersError } = useSelector((s) => s.users);

  useEffect(() => {
    console.log("Fetching streams on mount");
    dispatch(fetchStreams()).then((res) => {
      console.log("Fetch streams result:", res);
    });
  }, [dispatch]);

  if (isAuthenticated && user) {
    const route = user.role === 'admin' ? '/dashboard/admin' : user.role === 'faculty' ? '/dashboard/faculty' : '/dashboard/student';
    return <Navigate to={route} replace />;
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-dark-950 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-primary-500/8 blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/6 blur-3xl" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-4xl mx-4"
      >
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/15 via-purple-500/15 to-cyan-500/15 blur-xl opacity-50" />

        <div className="relative rounded-3xl border border-white/[0.08] bg-dark-900/70 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ─── LEFT PANEL ─── */}
            <div className="relative p-8 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.04] via-transparent to-cyan-500/[0.03]" />

              <div className="relative z-10">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] mb-6">
                  <HiSparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-medium text-purple-300">Create Account</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl lg:text-4xl font-display font-bold text-white leading-tight mb-3">
                  Start Your{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-primary-400 to-cyan-400 bg-clip-text text-transparent">
                    Journey.
                  </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-dark-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Join EduTrack AI to manage your academics, track progress, and excel in your learning path.
                </motion.p>

                <div className="space-y-4 hidden lg:block">
                  {features.map((feat, i) => (
                    <motion.div key={feat.title} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-white/15 transition-colors">
                        {feat.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{feat.title}</p>
                        <p className="text-xs text-dark-500">{feat.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── RIGHT PANEL ─── */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
                <h2 className="text-xl font-display font-bold text-white mb-1">Sign Up</h2>
                <p className="text-dark-500 text-sm">Register as a student or faculty member</p>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Role Tabs */}
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 mb-2">
                  <button type="button" onClick={() => handleChange('role', 'student')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${form.role === 'student' ? 'bg-primary-500/20 text-primary-400 shadow-sm' : 'text-dark-400 hover:text-white'}`}>Student</button>
                  <button type="button" onClick={() => handleChange('role', 'faculty')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${form.role === 'faculty' ? 'bg-cyan-500/20 text-cyan-400 shadow-sm' : 'text-dark-400 hover:text-white'}`}>Faculty</button>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-medium text-dark-400 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-primary-400' : 'text-dark-600'}`}>
                      <HiUser className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      required
                      className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border text-white placeholder-dark-600 text-sm transition-all duration-300 outline-none ${
                        focusedField === 'name' ? 'border-primary-500/40 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'border-white/[0.08] hover:border-white/15'
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-dark-400 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary-400' : 'text-dark-600'}`}>
                      <HiMail className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      required
                      className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border text-white placeholder-dark-600 text-sm transition-all duration-300 outline-none ${
                        focusedField === 'email' ? 'border-primary-500/40 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'border-white/[0.08] hover:border-white/15'
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-medium text-dark-400 mb-1.5 block">Password</label>
                  <div className="relative">
                    <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'password' ? 'text-primary-400' : 'text-dark-600'}`}>
                      <HiLockClosed className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      required
                      className={`w-full pl-11 pr-11 py-3 rounded-xl bg-white/[0.03] border text-white placeholder-dark-600 text-sm transition-all duration-300 outline-none ${
                        focusedField === 'password' ? 'border-primary-500/40 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'border-white/[0.08] hover:border-white/15'
                      }`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-600 hover:text-white transition-colors">
                      {showPassword ? <HiEyeOff className="w-4.5 h-4.5" /> : <HiEye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Role-specific field */}
                {form.role === 'student' ? (
                  <div>
                    <label className="text-xs font-medium text-dark-400 mb-1.5 block">Stream</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-600"><HiIdentification className="w-4.5 h-4.5" /></div>
                      <select
                        value={form.streamId}
                        onChange={(e) => handleChange('streamId', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 text-white text-sm transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark-900 text-dark-400">Select your stream</option>
                        {streams.map((s) => (
                          <option key={s.id} value={s.id} className="bg-dark-900 text-white">{s.icon} {s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-medium text-dark-400 mb-1.5 block">Department</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-600"><HiAcademicCap className="w-4.5 h-4.5" /></div>
                      <select
                        value={form.department}
                        onChange={(e) => handleChange('department', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 text-white text-sm transition-all outline-none appearance-none cursor-pointer"
                      >
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d} className="bg-dark-900 text-white">{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="relative w-full py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-cyan-600 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Creating...</>
                    ) : (
                      'Create Account'
                    )}
                  </span>
                </motion.button>
              </form>

              <div className="text-center mt-5 space-y-2">
                <p className="text-sm text-dark-400">
                  Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold ml-1">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
