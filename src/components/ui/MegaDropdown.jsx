import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCode,
  HiColorSwatch,
  HiDesktopComputer,
  HiChartBar,
  HiChevronRight,
  HiChevronDown,
} from 'react-icons/hi';
import { megaMenuCategories } from '../../data/courses';

const iconMap = {
  HiCode: HiCode,
  HiColorSwatch: HiColorSwatch,
  HiDesktopComputer: HiDesktopComputer,
  HiChartBar: HiChartBar,
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ─── Desktop Mega Panel ─── */
export function MegaPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(72rem,96vw)] z-50"
    >
      {/* Caret arrow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-dark-900 border-l border-t border-white/10 rounded-sm" />

      <div className="relative rounded-2xl bg-dark-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {megaMenuCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || HiCode;
              return (
                <div key={cat.title} className="space-y-4">
                  {/* Category header */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} shadow-lg`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-white tracking-wide uppercase">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Course list */}
                  <ul className="space-y-0.5">
                    {cat.courses.map((course) => (
                      <li key={course}>
                        <Link
                          to={`/courses/${slugify(course)}`}
                          className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                          <HiChevronRight className="w-3.5 h-3.5 text-dark-600 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                          <span className="leading-snug">{course}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <p className="text-sm text-dark-500">
              Explore 40+ industry-ready courses with placement support
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
            >
              View All Courses
              <HiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Accordion ─── */
export function MobileCoursesAccordion({ onNavigate }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="space-y-1">
      {megaMenuCategories.map((cat, i) => {
        const Icon = iconMap[cat.icon] || HiCode;
        const isOpen = openIndex === i;

        return (
          <div key={cat.title}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-white/5"
            >
              <span className="flex items-center gap-2.5">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${cat.color}`}
                >
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-dark-200">
                  {cat.title}
                </span>
              </span>
              <HiChevronDown
                className={`w-4 h-4 text-dark-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden pl-6"
                >
                  {cat.courses.map((course) => (
                    <li key={course}>
                      <Link
                        to={`/courses/${slugify(course)}`}
                        onClick={onNavigate}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-dark-400 hover:text-primary-400 transition-colors duration-200"
                      >
                        <HiChevronRight className="w-3 h-3 shrink-0" />
                        {course}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* View all link */}
      <Link
        to="/courses"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 mx-4 mt-2 py-2.5 rounded-xl text-sm font-semibold text-primary-400 border border-primary-500/30 hover:bg-primary-500/10 transition-all duration-200"
      >
        View All Courses
        <HiChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
