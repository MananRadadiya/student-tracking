import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCode, HiColorSwatch, HiChartBar, HiDesktopComputer, HiAcademicCap, HiLightningBolt } from 'react-icons/hi';

const floatingIcons = [
  { Icon: HiCode, position: 'top-20 left-[10%]', delay: 0, color: 'from-blue-500 to-cyan-500' },
  { Icon: HiColorSwatch, position: 'top-32 right-[12%]', delay: 0.5, color: 'from-purple-500 to-pink-500' },
  { Icon: HiChartBar, position: 'bottom-40 left-[8%]', delay: 1, color: 'from-green-500 to-emerald-500' },
  { Icon: HiDesktopComputer, position: 'bottom-32 right-[10%]', delay: 1.5, color: 'from-orange-500 to-red-500' },
  { Icon: HiAcademicCap, position: 'top-1/2 left-[5%]', delay: 0.8, color: 'from-sky-500 to-blue-500' },
  { Icon: HiLightningBolt, position: 'top-40 right-[5%]', delay: 1.2, color: 'from-yellow-500 to-orange-500' },
];

const statItems = [
  { label: 'Students', value: '18K+' },
  { label: 'Courses', value: '25+' },
  { label: 'Placed', value: '95%' },
  { label: 'Rating', value: '4.9' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-900/20 to-dark-950" />
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-primary-900/10 via-accent-600/10 to-primary-900/10" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />

      {/* Floating Course Icons */}
      {floatingIcons.map(({ Icon, position, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${position} hidden lg:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay, duration: 0.6, type: 'spring' }}
        >
          <div className={`animate-float${i % 3 === 1 ? '-delayed' : i % 3 === 2 ? '-slow' : ''}`}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} p-3 opacity-20 hover:opacity-40 transition-opacity duration-300 shadow-lg`}>
              <Icon className="w-full h-full text-white" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-dark-300">Admissions Open for 2026 Batch</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Build Your Future</span>
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            in Tech
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Learn Web Development, UI/UX, Data Science, Game Development and more
          with industry experts at Gujarat&apos;s premier IT training institute.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            to="/courses"
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-accent-400" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Courses
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>

          <Link
            to="/contact"
            className="group px-8 py-4 rounded-2xl font-semibold text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Apply Now
              <span className="w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse" />
            </span>
          </Link>
        </motion.div>

        {/* Glassmorphism Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statItems.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  );
}
