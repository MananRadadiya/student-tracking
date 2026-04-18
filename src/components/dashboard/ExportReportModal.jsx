import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDownload, HiX, HiCheckCircle } from 'react-icons/hi';

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const COMPILE_MESSAGES = [
  'Initializing data pipeline...',
  'Scanning submission records...',
  'Aggregating student metrics...',
  'Computing stream analytics...',
  'Cross-referencing feedback data...',
  'Generating approval matrices...',
  'Building visualization datasets...',
  'Compiling attendance patterns...',
  'Encrypting sensitive fields...',
  'Optimizing report layout...',
  'Finalizing export package...',
  'Report generation complete!',
];

function MatrixRain({ width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const fontSize = 12;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.2;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [width, height]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />;
}

export default function ExportReportModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState('idle'); // idle, compiling, success
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState('');

  const startExport = useCallback(() => {
    setPhase('compiling');
    setProgress(0);
    setCurrentMessage(0);
  }, []);

  // Progress animation
  useEffect(() => {
    if (phase !== 'compiling') return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase('success');
          return 100;
        }
        return prev + 1.2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [phase]);

  // Cycling compile messages
  useEffect(() => {
    if (phase !== 'compiling') return;

    const msgInterval = setInterval(() => {
      setCurrentMessage((prev) => Math.min(prev + 1, COMPILE_MESSAGES.length - 1));
    }, 500);

    return () => clearInterval(msgInterval);
  }, [phase]);

  // Random flashing numbers
  useEffect(() => {
    if (phase !== 'compiling') return;

    const numInterval = setInterval(() => {
      const nums = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join('');
      setRandomNumbers(nums);
    }, 80);

    return () => clearInterval(numInterval);
  }, [phase]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setPhase('idle');
      setProgress(0);
      setCurrentMessage(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={phase === 'success' ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-dark-900/95 backdrop-blur-xl overflow-hidden"
        >
          {/* Matrix Rain Background */}
          {phase === 'compiling' && <MatrixRain width={512} height={400} />}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-dark-500 hover:text-white transition-colors"
          >
            <HiX className="w-5 h-5" />
          </button>

          <div className="relative z-10 p-8">
            {/* IDLE STATE */}
            {phase === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <HiDownload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Generate Monthly Report</h3>
                  <p className="text-dark-400 text-sm mt-2">
                    Compile a comprehensive analytics report including student performance, stream metrics, and submission trends.
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-dark-300 text-sm hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startExport}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-sm font-medium shadow-lg shadow-primary-500/20"
                  >
                    🚀 Generate Report
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* COMPILING STATE */}
            {phase === 'compiling' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-display font-bold text-emerald-400 font-mono">
                    COMPILING DATA...
                  </h3>
                  <div className="text-emerald-500/40 font-mono text-[10px] mt-2 h-4 overflow-hidden tracking-widest">
                    {randomNumbers}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-dark-800 overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400">{Math.min(Math.round(progress), 100)}%</span>
                    <span className="text-dark-500">ETA: {Math.max(0, Math.round((100 - progress) * 0.05))}s</span>
                  </div>
                </div>

                {/* Console Messages */}
                <div className="bg-dark-950/80 rounded-xl border border-white/5 p-4 font-mono text-xs space-y-1.5 max-h-[160px] overflow-hidden">
                  {COMPILE_MESSAGES.slice(0, currentMessage + 1).map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-emerald-500">{'>'}</span>
                      <span className={i === currentMessage ? 'text-emerald-300' : 'text-dark-500'}>{msg}</span>
                      {i === currentMessage && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-emerald-400"
                        >
                          █
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SUCCESS STATE */}
            {phase === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center"
                >
                  <HiCheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Report Generated!</h3>
                  <p className="text-dark-400 text-sm mt-2">
                    Monthly analytics report compiled successfully.
                  </p>
                </div>
                <div className="bg-dark-800/50 rounded-xl border border-white/5 p-4 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">File</span>
                    <span className="text-white font-mono text-xs">edutrack_report_march_2026.pdf</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Size</span>
                    <span className="text-white font-mono text-xs">2.4 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Records</span>
                    <span className="text-white font-mono text-xs">1,247 entries processed</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 w-full"
                >
                  <HiDownload className="w-4 h-4 inline mr-2" />
                  Download Report
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
