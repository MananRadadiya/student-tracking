import { motion } from 'framer-motion';
import { HiLightningBolt, HiUserGroup, HiBriefcase, HiShieldCheck } from 'react-icons/hi';

const features = [
  {
    icon: HiLightningBolt,
    title: 'Hands-On Learning',
    description: 'Work on real-world projects from day one with guidance from industry mentors.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: HiUserGroup,
    title: 'Expert Faculty',
    description: 'Learn from professionals with 10+ years of industry experience in top tech companies.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: HiBriefcase,
    title: 'Guaranteed Placements',
    description: '100% placement assistance with 500+ hiring partners across the tech industry.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: HiShieldCheck,
    title: 'Industry Certification',
    description: 'Earn recognized certifications that validate your skills to top employers.',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6"
            >
              <span className="text-sm text-primary-400 font-medium">Why CDMI</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Why Students Choose{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                CDMI
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-dark-400 text-lg leading-relaxed"
            >
              With over 12 years of excellence, we have built a reputation for delivering industry-relevant education that transforms careers and creates opportunities.
            </motion.p>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-dark-900/50 border border-white/5 hover:border-primary-500/20 transition-all duration-500"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
