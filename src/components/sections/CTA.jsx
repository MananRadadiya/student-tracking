import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500" />
          <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-primary-600/50 via-accent-500/50 to-primary-600/50" />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative p-8 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Start Your
              <br />
              Tech Journey?
            </h2>

            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Join thousands of students who have transformed their careers with CDMI.
              Your future in tech starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-2xl font-semibold bg-white text-primary-600 hover:bg-white/90 transition-colors duration-300"
              >
                Browse Courses
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-2xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors duration-300"
              >
                Talk to a Counselor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
