import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBell, HiCheckCircle, HiChatAlt2, HiFire, HiExclamation, HiLightningBolt } from 'react-icons/hi';
import { fetchNotifications, markAllNotificationsRead } from '../../store/slices/notificationSlice';

const TYPE_ICONS = {
  feedback: { icon: <HiChatAlt2 className="w-4 h-4" />, color: 'text-blue-400 bg-blue-500/10' },
  approval: { icon: <HiCheckCircle className="w-4 h-4" />, color: 'text-emerald-400 bg-emerald-500/10' },
  streak: { icon: <HiFire className="w-4 h-4" />, color: 'text-amber-400 bg-amber-500/10' },
  alert: { icon: <HiExclamation className="w-4 h-4" />, color: 'text-red-400 bg-red-500/10' },
  system: { icon: <HiLightningBolt className="w-4 h-4" />, color: 'text-purple-400 bg-purple-500/10' },
};

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { notifications } = useSelector((s) => s.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
      >
        <HiBell className="w-5 h-5 text-dark-400 hover:text-white transition-colors" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-red-500 text-[10px] text-white font-bold flex items-center justify-center ring-2 ring-dark-900"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-white/[0.08] bg-dark-900/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-[11px] text-primary-400 hover:text-primary-300 font-medium">
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const typeStyle = TYPE_ICONS[n.type] || TYPE_ICONS.system;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${!n.read ? 'bg-primary-500/[0.03]' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${typeStyle.color}`}>
                        {typeStyle.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${!n.read ? 'text-white' : 'text-dark-300'}`}>{n.title}</p>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />}
                        </div>
                        <p className="text-xs text-dark-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-dark-600 mt-1">{n.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/5 text-center">
                <button className="text-xs text-primary-400 hover:text-primary-300 font-medium">View All Notifications</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
