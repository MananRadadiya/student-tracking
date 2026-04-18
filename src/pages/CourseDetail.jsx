import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCode, HiColorSwatch, HiPencilAlt, HiChartBar, HiDesktopComputer, HiSpeakerphone, HiClock, HiAcademicCap, HiStar, HiUsers, HiArrowLeft } from 'react-icons/hi';
import { courses } from '../data/courses';

const iconMap = { HiCode, HiColorSwatch, HiPencilAlt, HiChartBar, HiDesktopComputer, HiSpeakerphone };

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-primary-400 hover:underline">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[course.icon];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/courses" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 text-sm mb-8 transition-colors">
            <HiArrowLeft /> Back to Courses
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} p-3.5 shrink-0`}>
              {Icon && <Icon className="w-full h-full text-white" />}
            </div>
            <div>
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-dark-400 mb-3">{course.level}</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">{course.title}</h1>
            </div>
          </div>

          <p className="text-dark-300 text-lg leading-relaxed mb-8">{course.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: HiClock, label: 'Duration', value: course.duration },
              { icon: HiAcademicCap, label: 'Modules', value: course.modules },
              { icon: HiStar, label: 'Rating', value: course.rating },
              { icon: HiUsers, label: 'Students', value: course.students.toLocaleString() },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white/5 text-center">
                <item.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                <div className="text-white font-semibold">{item.value}</div>
                <div className="text-dark-500 text-xs">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-500 hover:shadow-lg hover:shadow-primary-500/25 transition-all text-center">
              Enroll Now
            </Link>
            <a href="tel:+919876543210" className="px-8 py-4 rounded-2xl font-semibold text-white border border-white/10 hover:bg-white/5 transition-all text-center">
              Talk to Counselor
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
