import { motion } from 'framer-motion';
import { HiAcademicCap, HiOfficeBuilding, HiCalendar, HiBadgeCheck } from 'react-icons/hi';
import { useCountUp } from '../../hooks/useAnimations';

const statsData = [
  { label: 'Students Trained', value: 18000, suffix: '+', Icon: HiAcademicCap, color: 'from-blue-500 to-cyan-500' },
  { label: 'Hiring Companies', value: 500, suffix: '+', Icon: HiOfficeBuilding, color: 'from-purple-500 to-pink-500' },
  { label: 'Years Experience', value: 12, suffix: '+', Icon: HiCalendar, color: 'from-orange-500 to-red-500' },
  { label: 'Placement Assistance', value: 100, suffix: '%', Icon: HiBadgeCheck, color: 'from-green-500 to-emerald-500' },
];

function StatCard({ stat, index }) {
  const { count, ref, isVisible } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 transition-all duration-500 text-center">
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-3 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <stat.Icon className="w-full h-full text-white" />
        </div>

        {/* Value */}
        <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
          {isVisible ? count.toLocaleString() : '0'}
          <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <div className="text-dark-400 text-sm font-medium">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export default function PlacementStats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark background with accent glows */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6"
          >
            <span className="text-sm text-primary-400 font-medium">Our Impact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Numbers That Speak
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              For Themselves
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            Over a decade of excellence in transforming careers and building futures in technology.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
