import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCode, HiColorSwatch, HiPencilAlt, HiChartBar, HiDesktopComputer, HiSpeakerphone, HiClock, HiArrowRight } from 'react-icons/hi';
import { courses } from '../../data/courses';

const iconMap = {
  HiCode,
  HiColorSwatch,
  HiPencilAlt,
  HiChartBar,
  HiDesktopComputer,
  HiSpeakerphone,
};

function CourseCard({ course, index }) {
  const Icon = iconMap[course.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group relative h-full rounded-2xl bg-dark-900/50 border border-white/5 hover:border-primary-500/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1">
        {/* Gradient hover glow */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} p-2.5 mb-5 group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon className="w-full h-full text-white" />}
        </div>

        {/* Level Badge */}
        <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-dark-400 mb-4">
          {course.level}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-dark-400 text-sm leading-relaxed mb-5">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/5">
          <div className="flex items-center gap-1.5 text-dark-400 text-sm">
            <HiClock size={14} />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-dark-300">{course.rating}</span>
          </div>
        </div>

        {/* Enroll Button */}
        <Link
          to={`/courses/${course.slug}`}
          className="flex items-center justify-between w-full text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors duration-300 group/btn"
        >
          <span>Enroll Now</span>
          <HiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function PopularCourses() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6"
          >
            <span className="text-sm text-primary-400 font-medium">Popular Courses</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Launch Your Career With
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Industry-Ready Skills
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            Explore our comprehensive courses designed in collaboration with industry experts to make you job-ready.
          </motion.p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-primary-400 border border-primary-500/30 hover:bg-primary-500/10 transition-all duration-300 group"
          >
            View All Courses
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
