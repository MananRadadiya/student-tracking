import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../store/slices/authSlice';
import {
  HiViewGrid, HiUsers, HiDocumentText, HiChat, HiCog,
  HiLogout, HiMenuAlt2, HiX, HiAcademicCap,
  HiClipboardList, HiTrendingUp, HiUpload, HiCollection,
  HiLightningBolt, HiBell, HiChevronLeft, HiStar, HiClipboardCheck, HiUserGroup
} from 'react-icons/hi';

const navItems = {
  admin: [
    { path: '/dashboard/admin', label: 'Overview', icon: HiViewGrid },
    { path: '/dashboard/admin/students', label: 'Students', icon: HiUsers },
    { path: '/dashboard/admin/faculty', label: 'Faculty', icon: HiUserGroup },
    { path: '/dashboard/admin/submissions', label: 'Submissions', icon: HiDocumentText },
    { path: '/dashboard/admin/streams', label: 'Streams', icon: HiCollection },
    { path: '/dashboard/admin/analytics', label: 'Analytics', icon: HiTrendingUp },
    { path: '/dashboard/admin/attendance', label: 'Attendance', icon: HiClipboardCheck },
    { path: '/dashboard/admin/leaderboard', label: 'Leaderboard', icon: HiStar },
  ],
  faculty: [
    { path: '/dashboard/faculty', label: 'Overview', icon: HiViewGrid },
    { path: '/dashboard/faculty/submissions', label: 'Submissions', icon: HiDocumentText },
    { path: '/dashboard/faculty/teaching', label: 'Teaching Log', icon: HiUpload },
    { path: '/dashboard/faculty/attendance', label: 'Attendance', icon: HiClipboardCheck },
    { path: '/dashboard/faculty/leaderboard', label: 'Leaderboard', icon: HiStar },
    { path: '/dashboard/faculty/ai-assistant', label: 'AI Assistant', icon: HiChat },
  ],
  student: [
    { path: '/dashboard/student', label: 'Overview', icon: HiViewGrid },
    { path: '/dashboard/student/submit', label: 'Submit Work', icon: HiUpload },
    { path: '/dashboard/student/history', label: 'History', icon: HiClipboardList },
    { path: '/dashboard/student/attendance', label: 'Attendance', icon: HiClipboardCheck },
    { path: '/dashboard/student/leaderboard', label: 'Leaderboard', icon: HiStar },
    { path: '/dashboard/student/ai-assistant', label: 'AI Assistant', icon: HiChat },
  ],
};

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = user?.role || 'student';
  const items = navItems[role] || [];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 shadow-lg shadow-primary-500/20 shrink-0">
          <HiLightningBolt className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {(!collapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h2 className="text-sm font-display font-bold text-white">EduTrack</h2>
              <p className="text-[10px] text-dark-500 uppercase tracking-wider">Smart Tracking</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? 'text-white bg-gradient-to-r from-primary-500/15 to-cyan-500/10 border border-primary-500/20'
                  : 'text-dark-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-primary-500 to-cyan-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary-400' : 'group-hover:text-primary-400'} transition-colors`} />
              <AnimatePresence>
                {(!collapsed || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-white/5">
        {/* User Info */}
        <div className={`flex items-center gap-3 px-3 py-2 mb-2 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500/30 to-purple-500/30 flex items-center justify-center border border-white/10 shrink-0">
            <span className="text-sm font-bold text-primary-300">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-dark-500 capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 ${
            collapsed && !isMobile ? 'justify-center' : ''
          }`}
        >
          <HiLogout className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-dark-900/80 backdrop-blur-2xl border-r border-white/5"
      >
        <SidebarContent />
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center text-dark-400 hover:text-white hover:border-primary-500/40 transition-all duration-300"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
            <HiChevronLeft className="w-3.5 h-3.5" />
          </motion.div>
        </button>
      </motion.aside>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-dark-900/80 backdrop-blur-xl border border-white/10 text-white"
      >
        <HiMenuAlt2 className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-dark-900/95 backdrop-blur-2xl border-r border-white/10"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-dark-400 hover:text-white"
              >
                <HiX className="w-5 h-5" />
              </button>
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
