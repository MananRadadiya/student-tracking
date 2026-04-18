import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LIVE_EVENTS = [
  { type: 'submit', student: 'Manan Patel', detail: 'Web Middleware', stream: 'Web Dev', icon: '📤' },
  { type: 'approve', faculty: 'Uttam Sir', detail: 'ML Classification', stream: 'Data Science', icon: '✅' },
  { type: 'submit', student: 'Ananya Gupta', detail: 'Pandas DataFrames', stream: 'Data Science', icon: '📤' },
  { type: 'feedback', faculty: 'Uttam Sir', student: 'Rohan Mehta', detail: 'React Components', icon: '💬' },
  { type: 'submit', student: 'Kavya Krishnan', detail: 'Figma Prototyping', stream: 'UI/UX', icon: '📤' },
  { type: 'streak', student: 'Meera Iyer', detail: '20-day streak!', icon: '🔥' },
  { type: 'approve', faculty: 'Ashok Sir', detail: 'Express API Routes', stream: 'Web Dev', icon: '✅' },
  { type: 'submit', student: 'Arjun Singh', detail: 'Flutter Widgets', stream: 'Mobile Dev', icon: '📤' },
  { type: 'submit', student: 'Sneha Reddy', detail: 'Neural Networks Intro', stream: 'Data Science', icon: '📤' },
  { type: 'feedback', faculty: 'Uttam Sir', student: 'Nisha Banerjee', detail: 'CSS Grid Layout', icon: '💬' },
  { type: 'approve', faculty: 'Ashok Sir', detail: 'Cloud Deployment', stream: 'Cloud', icon: '✅' },
  { type: 'submit', student: 'Aditya Joshi', detail: 'Wireframe Design', stream: 'UI/UX', icon: '📤' },
  { type: 'streak', student: 'Kavya Krishnan', detail: '15-day streak!', icon: '🔥' },
  { type: 'submit', student: 'Vikram Thapar', detail: 'AWS Lambda Functions', stream: 'Cloud', icon: '📤' },
  { type: 'approve', faculty: 'Uttam Sir', detail: 'Data Visualization', stream: 'Data Science', icon: '✅' },
];

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}

function generateMessage(event) {
  switch (event.type) {
    case 'submit':
      return `${event.student} submitted: ${event.detail}`;
    case 'approve':
      return `${event.faculty} approved: ${event.detail}`;
    case 'feedback':
      return `${event.faculty} gave feedback to ${event.student}`;
    case 'streak':
      return `${event.student} hit a ${event.detail}`;
    default:
      return event.detail;
  }
}

function getTypeColor(type) {
  switch (type) {
    case 'submit': return 'text-cyan-400';
    case 'approve': return 'text-emerald-400';
    case 'feedback': return 'text-purple-400';
    case 'streak': return 'text-amber-400';
    default: return 'text-dark-300';
  }
}

export default function LiveActivityFeed() {
  const [events, setEvents] = useState([]);
  const scrollRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    // Add initial batch
    const initial = [];
    for (let i = 0; i < 3; i++) {
      const ev = LIVE_EVENTS[i % LIVE_EVENTS.length];
      const time = new Date();
      time.setSeconds(time.getSeconds() - (3 - i) * 8);
      initial.push({ ...ev, id: `init-${i}`, time: formatTime(time), timestamp: time.getTime() });
    }
    setEvents(initial);
    indexRef.current = 3;

    // Add new events every 3-5 seconds
    const interval = setInterval(() => {
      const ev = LIVE_EVENTS[indexRef.current % LIVE_EVENTS.length];
      const now = new Date();
      const newEvent = {
        ...ev,
        id: `live-${Date.now()}`,
        time: formatTime(now),
        timestamp: now.getTime(),
      };
      setEvents((prev) => [...prev.slice(-15), newEvent]);
      indexRef.current++;
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="relative">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-dark-500 font-mono ml-2">live-feed@edutrack ~</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">LIVE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="font-mono text-xs space-y-1 max-h-[260px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <span className="text-dark-600 shrink-0 w-[72px]">{event.time}</span>
              <span className="shrink-0">{event.icon}</span>
              <span className={`${getTypeColor(event.type)} leading-relaxed`}>
                {generateMessage(event)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blinking cursor */}
        <div className="flex items-center gap-2 py-1 px-2">
          <span className="text-dark-600 w-[72px]">{formatTime(new Date())}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="text-emerald-400"
          >
            ▊
          </motion.span>
        </div>
      </div>
    </div>
  );
}
