import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPaperAirplane, HiLightningBolt } from 'react-icons/hi';
import { aiResponses } from '../../data/mockData';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your EduTrack AI Assistant. Ask me anything about your submissions, progress, or learning tips! 🤖", time: 'Now' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input, time: 'Now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: response, time: 'Now' }]);
      setTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[700px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <HiLightningBolt className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">EduTrack AI</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-dark-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-br-md'
                  : 'bg-white/5 border border-white/10 text-dark-200 rounded-bl-md'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1.5 ${msg.sender === 'user' ? 'text-primary-200' : 'text-dark-500'}`}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary-400"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask AI anything..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 text-sm outline-none focus:border-primary-500/50 transition-all"
          />
          <motion.button
            onClick={sendMessage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white shadow-lg shadow-primary-500/20"
          >
            <HiPaperAirplane className="w-5 h-5 rotate-90" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
