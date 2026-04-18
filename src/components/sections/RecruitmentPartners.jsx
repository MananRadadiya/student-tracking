import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';

import inspireTechno from '../../assets/images/INSPIRE-TECHNO.png';
import kmSoft from '../../assets/images/KM-SOFT.png';
import knovetor from '../../assets/images/knovetor.png';
import squareInfosoft from '../../assets/images/Square-Infosoft.png';
import surya from '../../assets/images/surya.png';

const partners = [
  { name: 'Inspire Techno', logo: inspireTechno },
  { name: 'KM Soft', logo: kmSoft },
  { name: 'Knovetor', logo: knovetor },
  { name: 'Square Infosoft', logo: squareInfosoft },
  { name: 'Surya', logo: surya },
];

export default function RecruitmentPartners() {
  return (
    <section className="relative py-24 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6"
          >
            <HiBriefcase className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">
              Student Placement
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our Recruitment{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Partners
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-400 max-w-xl mx-auto"
          >
            Our students are hired by leading companies across the tech
            industry, from innovative startups to global enterprises.
          </motion.p>
        </div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="group relative"
            >
              <div className="relative flex items-center justify-center h-28 md:h-32 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden">
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:to-accent-500/5 transition-all duration-500" />

                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="relative h-10 md:h-12 w-auto max-w-[70%] object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-dark-600 text-sm mt-10"
        >
          …and 500+ more companies across India
        </motion.p>
      </div>
    </section>
  );
}
