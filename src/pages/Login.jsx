import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, clearError } from '../store/slices/authSlice';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiLightningBolt, HiSparkles, HiChartBar, HiShieldCheck, HiLogin } from 'react-icons/hi';

const features = [
  { icon: <HiLightningBolt className="w-5 h-5 text-cyan-400" />, title: 'AI-Powered Insights', desc: 'Instant feedback on your submissions.' },
  { icon: <HiChartBar className="w-5 h-5 text-purple-400" />, title: 'Dynamic Streaks', desc: 'Build momentum and earn exclusive badges.' },
  { icon: <HiShieldCheck className="w-5 h-5 text-emerald-400" />, title: 'Smart Analytics', desc: 'Track progress with real-time dashboards.' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((s) => s.auth);

  if (isAuthenticated && user) {
    const route = user.role === 'admin' ? '/dashboard/admin' : user.role === 'faculty' ? '/dashboard/faculty' : '/dashboard/student';
    return <Navigate to={route} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const quickLogin = (role) => {
    const emails = { admin: 'admin@edutrack.com', faculty: 'faculty@edutrack.com', student: 'student@edutrack.com' };
    setEmail(emails[role]);
    setPassword('123456');
    dispatch(loginUser({ email: emails[role], password: '123456' }));
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-dark-950">
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

      {/* Main Card — Split Layout */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-4xl mx-4"
      >
        {/* Outer glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/15 via-purple-500/15 to-cyan-500/15 blur-xl opacity-50" />

        <div className="relative rounded-3xl border border-white/[0.08] bg-dark-900/70 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ─── LEFT PANEL: Branding & Features ─── */}
            <div className="relative p-8 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.04] via-transparent to-cyan-500/[0.03]" />

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] mb-6"
                >
                  <HiSparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-medium text-purple-300">Welcome to the Future</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-display font-bold text-white leading-tight mb-3"
                >
                  Track Your{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-primary-400 to-cyan-400 bg-clip-text text-transparent">
                    Brilliance.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-dark-400 text-sm leading-relaxed mb-8 max-w-sm"
                >
                  EduTrack AI seamlessly syncs your daily work with intelligent, gamified progression.
                </motion.p>

                {/* Feature List */}
                <div className="space-y-4">
                  {features.map((feat, i) => (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
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

            {/* ─── RIGHT PANEL: Login Form ─── */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-7"
              >
                <h2 className="text-xl font-display font-bold text-white mb-1">Welcome Back</h2>
                <p className="text-dark-500 text-sm">Log in to your account to continue</p>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-dark-400 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary-400' : 'text-dark-600'}`}>
                      <HiMail className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); dispatch(clearError()); }}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="student@edutrack.com"
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
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); dispatch(clearError()); }}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      required
                      className={`w-full pl-11 pr-11 py-3 rounded-xl bg-white/[0.03] border text-white placeholder-dark-600 text-sm transition-all duration-300 outline-none ${
                        focusedField === 'password' ? 'border-primary-500/40 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'border-white/[0.08] hover:border-white/15'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-600 hover:text-white transition-colors"
                    >
                      {showPassword ? <HiEyeOff className="w-4.5 h-4.5" /> : <HiEye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-cyan-600 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Signing in...
                      </>
                    ) : (
                      <><HiLogin className="w-4 h-4" /> Sign In</>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <span className="text-[10px] text-dark-600 uppercase tracking-widest">Quick Access</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              </div>

              {/* Quick Login Buttons */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { role: 'admin', label: 'Admin', color: 'from-red-500/15 to-orange-500/15', border: 'border-red-500/15 hover:border-red-500/30', text: 'text-red-400', icon: '👑' },
                  { role: 'faculty', label: 'Faculty', color: 'from-blue-500/15 to-cyan-500/15', border: 'border-blue-500/15 hover:border-blue-500/30', text: 'text-blue-400', icon: '🎓' },
                  { role: 'student', label: 'Student', color: 'from-green-500/15 to-emerald-500/15', border: 'border-green-500/15 hover:border-green-500/30', text: 'text-green-400', icon: '📚' },
                ].map(({ role, label, color, border, text, icon }) => (
                  <motion.button
                    key={role}
                    type="button"
                    onClick={() => quickLogin(role)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl bg-gradient-to-br ${color} border ${border} transition-all duration-300`}
                  >
                    <span className="text-base">{icon}</span>
                    <span className={`text-[11px] font-medium ${text}`}>{label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="text-center mt-5 space-y-2">
                <p className="text-[11px] text-dark-600">
                  Demo: any role email with password <span className="text-dark-400 font-mono">123456</span>
                </p>
                <p className="text-sm text-dark-400">
                  Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold ml-1">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
