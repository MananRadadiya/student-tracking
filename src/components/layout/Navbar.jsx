import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { navLinks } from '../../data/courses';
import { useScrollDirection } from '../../hooks/useAnimations';
import { MegaPanel, MobileCoursesAccordion } from '../ui/MegaDropdown';
import TopBar from './TopBar';
import logo from '../../assets/images/creative-logo.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { scrollY } = useScrollDirection();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const isScrolled = scrollY > 50;

  const dashboardPath = user?.role === 'admin' ? '/dashboard/admin' : user?.role === 'faculty' ? '/dashboard/faculty' : '/dashboard/student';

  const megaTimeout = useRef(null);
  const megaTriggerRef = useRef(null);

  // Close everything on route change
  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const openMega = useCallback(() => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Top utility bar — slides away on scroll */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <TopBar />
      </div>

      {/* Main navbar */}
      <nav
        className={`transition-all duration-500 ${
          isScrolled
            ? 'glass-strong shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative h-12 w-12 flex items-center justify-center rounded-lg overflow-hidden bg-gradient-to-br from-primary-500/10 to-accent-500/10 group-hover:from-primary-500/20 group-hover:to-accent-500/20 border border-primary-500/20 group-hover:border-primary-500/40 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary-500/20">
              <img src={logo} alt="CDMI Logo" className="h-10 w-10 object-contain object-center" loading="eager" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-base leading-tight text-white group-hover:text-primary-300 transition-colors duration-300">CDMI</span>
              <span className="text-xs text-dark-500 group-hover:text-dark-400 transition-colors duration-300">Institute</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasMega ? (
                /* ── Courses with mega dropdown ── */
                <div
                  key={link.name}
                  ref={megaTriggerRef}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <Link
                    to={link.path}
                    className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors duration-300 group"
                  >
                    {link.name}
                    <HiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        megaOpen ? 'rotate-180 text-primary-400' : ''
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300 ${
                        location.pathname.startsWith('/courses')
                          ? 'w-6'
                          : 'w-0 group-hover:w-6'
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {megaOpen && <MegaPanel />}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Regular nav link ── */
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors duration-300 group"
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300 ${
                      location.pathname === link.path ? 'w-6' : 'w-0 group-hover:w-6'
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={dashboardPath}
                  className="relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 transition-all duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Dashboard</span>
                </Link>
                <button
                  onClick={() => { dispatch(logout()); navigate('/'); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white border border-red-500/40 hover:border-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2 text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark-950/95 backdrop-blur-xl" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[calc(100vw-2rem)] bg-dark-900/90 backdrop-blur-2xl border-l border-white/10 pt-24 px-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) =>
                  link.hasMega ? (
                    /* ── Mobile courses accordion ── */
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                          location.pathname.startsWith('/courses')
                            ? 'bg-primary-500/10 text-primary-400'
                            : 'text-dark-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                      <MobileCoursesAccordion
                        onNavigate={() => setIsOpen(false)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                          location.pathname === link.path
                            ? 'bg-primary-500/10 text-primary-400'
                            : 'text-dark-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-3"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to={dashboardPath}
                      className="block w-full py-3 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-500"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { dispatch(logout()); navigate('/'); setIsOpen(false); }}
                      className="block w-full py-3 rounded-xl text-center font-semibold text-white border border-red-500/40 hover:border-red-400 hover:bg-red-500/10 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full py-3 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-500"
                  >
                    Login
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </motion.header>
  );
}
