import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Placements from './pages/Placements';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminStudents from './pages/dashboard/AdminStudents';
import AdminSubmissions from './pages/dashboard/AdminSubmissions';
import AdminStreams from './pages/dashboard/AdminStreams';
import AdminAnalytics from './pages/dashboard/AdminAnalytics';
import AdminAttendance from './pages/dashboard/AdminAttendance';
import AdminFaculty from './pages/dashboard/AdminFaculty';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import FacultySubmissions from './pages/dashboard/FacultySubmissions';
import FacultyTeaching from './pages/dashboard/FacultyTeaching';
import FacultyAI from './pages/dashboard/FacultyAI';
import FacultyAttendance from './pages/dashboard/FacultyAttendance';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import StudentSubmit from './pages/dashboard/StudentSubmit';
import StudentHistory from './pages/dashboard/StudentHistory';
import StudentAI from './pages/dashboard/StudentAI';
import StudentAttendance from './pages/dashboard/StudentAttendance';
import Leaderboard from './pages/dashboard/Leaderboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}

function SplashLoader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 bg-dark-950 flex flex-col items-center justify-center z-[100] gap-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center p-1 rounded-[2rem] shadow-2xl shadow-primary-500/30">
          <div className="w-full h-full bg-dark-900 rounded-[1.7rem] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-cyan-500/10" />
            <span className="text-4xl z-10">⚡</span>
          </div>
        </div>
        {/* Pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-6 bg-primary-500/20 blur-2xl rounded-full -z-10"
        />
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-display font-bold text-white tracking-wide">
          Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">Track</span>
        </h1>
        <p className="text-[11px] text-dark-500 uppercase tracking-[0.3em] mt-1">Smart Tracking System</p>
      </motion.div>

      {/* Bouncing dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence>
        {loading && <SplashLoader />}
      </AnimatePresence>
      <div className={`min-h-screen bg-dark-950 text-dark-100 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Routes>
          {/* Dashboard routes — NO Navbar/Footer, uses DashboardLayout with sidebar */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            {/* Admin */}
            <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="admin/students" element={<ProtectedRoute allowedRoles={['admin']}><AdminStudents /></ProtectedRoute>} />
            <Route path="admin/submissions" element={<ProtectedRoute allowedRoles={['admin']}><AdminSubmissions /></ProtectedRoute>} />
            <Route path="admin/streams" element={<ProtectedRoute allowedRoles={['admin']}><AdminStreams /></ProtectedRoute>} />
            <Route path="admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
            <Route path="admin/attendance" element={<ProtectedRoute allowedRoles={['admin']}><AdminAttendance /></ProtectedRoute>} />
            <Route path="admin/faculty" element={<ProtectedRoute allowedRoles={['admin']}><AdminFaculty /></ProtectedRoute>} />
            <Route path="admin/leaderboard" element={<ProtectedRoute allowedRoles={['admin']}><Leaderboard /></ProtectedRoute>} />
            {/* Faculty */}
            <Route path="faculty" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
            <Route path="faculty/submissions" element={<ProtectedRoute allowedRoles={['faculty']}><FacultySubmissions /></ProtectedRoute>} />
            <Route path="faculty/teaching" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyTeaching /></ProtectedRoute>} />
            <Route path="faculty/attendance" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyAttendance /></ProtectedRoute>} />
            <Route path="faculty/leaderboard" element={<ProtectedRoute allowedRoles={['faculty']}><Leaderboard /></ProtectedRoute>} />
            <Route path="faculty/ai-assistant" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyAI /></ProtectedRoute>} />
            {/* Student */}
            <Route path="student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="student/submit" element={<ProtectedRoute allowedRoles={['student']}><StudentSubmit /></ProtectedRoute>} />
            <Route path="student/history" element={<ProtectedRoute allowedRoles={['student']}><StudentHistory /></ProtectedRoute>} />
            <Route path="student/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendance /></ProtectedRoute>} />
            <Route path="student/leaderboard" element={<ProtectedRoute allowedRoles={['student']}><Leaderboard /></ProtectedRoute>} />
            <Route path="student/ai-assistant" element={<ProtectedRoute allowedRoles={['student']}><StudentAI /></ProtectedRoute>} />
          </Route>

          {/* Public routes — has Navbar/Footer */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </div>
    </Router>
  );
}
