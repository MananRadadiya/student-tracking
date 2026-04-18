import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCode, HiColorSwatch, HiPencilAlt, HiChartBar, HiDesktopComputer, HiSpeakerphone, HiClock, HiArrowRight } from 'react-icons/hi';
import { courses } from '../data/courses';

const iconMap = { HiCode, HiColorSwatch, HiPencilAlt, HiChartBar, HiDesktopComputer, HiSpeakerphone };

const categories = [
  { label: 'All Courses', value: 'all' },
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Courses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            Choose from our wide range of industry-focused programs designed to launch your career in tech.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, index) => {
            const Icon = iconMap[course.icon];
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                layout
              >
                <div className="group relative h-full rounded-2xl bg-dark-900/50 border border-white/5 hover:border-primary-500/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} p-2.5 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {Icon && <Icon className="w-full h-full text-white" />}
                  </div>
                  <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-dark-400 mb-4">{course.level}</div>
                  <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">{course.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-5">{course.description}</p>
                  <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-dark-400 text-sm"><HiClock size={14} />{course.duration}</div>
                    <div className="flex items-center gap-1"><span className="text-yellow-400">★</span><span className="text-sm text-dark-300">{course.rating}</span></div>
                  </div>
                  <Link to={`/courses/${course.slug}`} className="flex items-center justify-between w-full text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors group/btn">
                    <span>View Details</span>
                    <HiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
