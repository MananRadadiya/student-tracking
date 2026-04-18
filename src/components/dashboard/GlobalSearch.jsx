import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiX, HiUser, HiDocumentText, HiCollection } from 'react-icons/hi';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const { user } = useSelector((s) => s.auth);
  const { students, streams } = useSelector((s) => s.users);
  const { submissions } = useSelector((s) => s.submissions);

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter results based on query and role
  const results = {
    students: [],
    submissions: [],
    streams: [],
  };

  if (query.trim().length > 1) {
    const q = query.toLowerCase();
    
    // Admin can search everything. Faculty can search students and submissions. Student can search their own submissions.
    if (user?.role === 'admin' || user?.role === 'faculty') {
      results.students = students.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
    }
    
    if (user?.role === 'admin') {
      results.streams = streams.filter(s => s.name.toLowerCase().includes(q));
    }

    results.submissions = submissions.filter(s => {
      if (user?.role === 'student' && s.studentId !== user.studentId && s.studentId !== students.find(st => st.userId === user.id)?.id) return false;
      return (s.title && s.title.toLowerCase().includes(q)) || 
             (s.learnedInClass && s.learnedInClass.toLowerCase().includes(q));
    });
  }

  const handleSelect = (type, id) => {
    setIsOpen(false);
    setQuery('');
    // Navigate based on type and role
    if (user?.role === 'admin') {
      if (type === 'student') navigate('/dashboard/admin/students');
      if (type === 'submission') navigate('/dashboard/admin/submissions');
      if (type === 'stream') navigate('/dashboard/admin/streams');
    } else if (user?.role === 'faculty') {
      if (type === 'submission' || type === 'student') navigate('/dashboard/faculty/submissions');
    } else {
      if (type === 'submission') navigate('/dashboard/student/history');
    }
  };

  const totalResults = results.students.length + results.submissions.length + results.streams.length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-dark-400 hover:text-white hover:bg-white/10 transition-all group"
      >
        <HiSearch className="w-4 h-4 group-hover:text-primary-400 transition-colors" />
        <span className="text-xs font-medium hidden sm:block">Search...</span>
        <div className="hidden sm:flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded text-[10px] bg-dark-900 border border-white/10 font-mono text-dark-500">
          <span>⌘</span><span>K</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-dark-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-2xl px-4"
            >
              <div className="rounded-2xl border border-white/10 bg-dark-900 shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[80vh]">
                
                {/* Search Input */}
                <div className="relative flex items-center px-4 border-b border-white/5 bg-white/[0.02]">
                  <HiSearch className="w-6 h-6 text-primary-400 shrink-0" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search students, submissions, streams..."
                    className="w-full flex-1 bg-transparent border-none text-white px-4 py-5 text-lg outline-none placeholder-dark-500"
                  />
                  <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-dark-500 hover:text-white hover:bg-white/10 transition-colors">
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Results Area */}
                <div className="overflow-y-auto flex-1 p-2">
                  {query.length <= 1 ? (
                    <div className="px-4 py-12 text-center">
                      <HiSearch className="w-12 h-12 text-dark-600 mx-auto mb-3 opacity-50" />
                      <p className="text-dark-400 text-sm">Type at least 2 characters to search</p>
                    </div>
                  ) : totalResults === 0 ? (
                    <div className="px-4 py-12 text-center">
                      <p className="text-dark-400">No results found for "<span className="text-white">{query}</span>"</p>
                    </div>
                  ) : (
                    <div className="space-y-4 p-2">
                      {/* Students */}
                      {results.students.length > 0 && (
                        <div>
                          <p className="px-2 text-xs font-semibold text-primary-400 mb-2 uppercase tracking-wider">Students</p>
                          {results.students.map(student => (
                            <button
                              key={student.id}
                              onClick={() => handleSelect('student', student.id)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left focus:bg-white/10 outline-none"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-400 flex items-center justify-center shrink-0">
                                <HiUser className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{student.name}</p>
                                <p className="text-xs text-dark-400">{student.email}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Submissions */}
                      {results.submissions.length > 0 && (
                        <div>
                          <p className="px-2 text-xs font-semibold text-cyan-400 mb-2 mt-2 uppercase tracking-wider">Submissions</p>
                          {results.submissions.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => handleSelect('submission', sub.id)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left focus:bg-white/10 outline-none"
                            >
                              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                                <HiDocumentText className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">{sub.title || 'Daily Submission'}</p>
                                <p className="text-xs text-dark-400 truncate">{sub.learnedInClass}</p>
                              </div>
                              <span className="text-[10px] text-dark-500">{sub.date}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Streams */}
                      {results.streams.length > 0 && (
                        <div>
                          <p className="px-2 text-xs font-semibold text-purple-400 mb-2 mt-2 uppercase tracking-wider">Streams</p>
                          {results.streams.map(stream => (
                            <button
                              key={stream.id}
                              onClick={() => handleSelect('stream', stream.id)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left focus:bg-white/10 outline-none"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                                <HiCollection className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{stream.icon} {stream.name}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/5 bg-dark-900 flex justify-between items-center">
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-dark-800 border border-white/10 font-mono">↑↓</kbd> to navigate</span>
                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-dark-800 border border-white/10 font-mono">↵</kbd> to select</span>
                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-dark-800 border border-white/10 font-mono">ESC</kbd> to close</span>
                  </div>
                  <span className="text-xs text-dark-400">EduTrack AI Search</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
