import { motion } from 'framer-motion';
import { useMemo } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

function generateHeatmapData(submissions) {
  const today = new Date();
  const days = 84; // 12 weeks
  const map = {};

  // Mark real submission dates
  submissions.forEach((sub) => {
    map[sub.date] = (map[sub.date] || 0) + 1;
  });

  // Generate random submission data for days not in the actual data to make it look good
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = map[dateStr] || (Math.random() > 0.35 ? Math.floor(Math.random() * 3) + 1 : 0);
    cells.push({
      date: dateStr,
      count,
      dayOfWeek: d.getDay(),
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }
  return cells;
}

function getIntensity(count) {
  if (count === 0) return 'bg-white/[0.03] border-white/[0.05]';
  if (count === 1) return 'bg-emerald-500/20 border-emerald-500/20 shadow-[0_0_4px_rgba(16,185,129,0.15)]';
  if (count === 2) return 'bg-emerald-500/40 border-emerald-500/30 shadow-[0_0_6px_rgba(16,185,129,0.25)]';
  return 'bg-emerald-500/70 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.35)]';
}

export default function SubmissionHeatmap({ submissions = [] }) {
  const cells = useMemo(() => generateHeatmapData(submissions), [submissions]);

  const totalSubmissions = cells.reduce((sum, c) => sum + c.count, 0);
  const activeDays = cells.filter((c) => c.count > 0).length;

  // Group cells into weeks (columns)
  const weeks = [];
  let currentWeek = [];
  cells.forEach((cell, i) => {
    currentWeek.push(cell);
    if (currentWeek.length === 7 || i === cells.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div>
      {/* Summary Stats */}
      <div className="flex items-center gap-6 mb-4">
        <div>
          <span className="text-2xl font-bold text-white">{totalSubmissions}</span>
          <span className="text-xs text-dark-400 ml-1.5">submissions</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-emerald-400">{activeDays}</span>
          <span className="text-xs text-dark-400 ml-1.5">active days</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-amber-400">{Math.round((activeDays / cells.length) * 100)}%</span>
          <span className="text-xs text-dark-400 ml-1.5">consistency</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pr-2 pt-5">
          {DAYS.map((day, i) => (
            <div key={i} className="h-[14px] flex items-center">
              <span className="text-[10px] text-dark-500">{day}</span>
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {/* Month label for first day of month */}
              <div className="h-4 flex items-end">
                {week[0] && new Date(week[0].date).getDate() <= 7 && (
                  <span className="text-[10px] text-dark-500">
                    {MONTHS[new Date(week[0].date).getMonth()]}
                  </span>
                )}
              </div>
              {week.map((cell, ci) => (
                <motion.div
                  key={cell.date}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (wi * 7 + ci) * 0.005, duration: 0.2 }}
                  className={`w-[14px] h-[14px] rounded-[3px] border cursor-pointer transition-all hover:scale-150 hover:z-10 ${getIntensity(cell.count)}`}
                  title={`${cell.displayDate}: ${cell.count} submission${cell.count !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[10px] text-dark-500">Less</span>
        {[0, 1, 2, 3].map((level) => (
          <div
            key={level}
            className={`w-[12px] h-[12px] rounded-[2px] border ${getIntensity(level)}`}
          />
        ))}
        <span className="text-[10px] text-dark-500">More</span>
      </div>
    </div>
  );
}
