import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PlacementStats from '../components/sections/PlacementStats';
import Testimonials from '../components/sections/Testimonials';

const companies = [
  'Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro',
  'Accenture', 'Deloitte', 'Capgemini', 'HCL', 'Tech Mahindra', 'IBM',
];

export default function Placements() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Placements</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto">
            Our dedicated placement cell ensures every student gets the opportunity to build a rewarding career.
          </motion.p>
        </div>

        {/* Hiring Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-white text-center mb-10">Our Hiring Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {companies.map((company, i) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-dark-900/50 border border-white/5 hover:border-primary-500/20 text-center text-dark-300 text-sm font-medium hover:text-white transition-all duration-300"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <PlacementStats />
      <Testimonials />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Link
          to="/contact"
          className="inline-flex px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-500 hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          Get Placement Assistance
        </Link>
      </div>
    </div>
  );
}
