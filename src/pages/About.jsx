import { motion } from 'framer-motion';
import { HiAcademicCap, HiLightningBolt, HiUserGroup, HiGlobe } from 'react-icons/hi';

const timeline = [
  { year: '2012', title: 'Founded', description: 'CDMI was established with a vision to bridge the gap between education and industry.' },
  { year: '2015', title: 'Expanded Courses', description: 'Added UI/UX, Data Science and Digital Marketing to the curriculum.' },
  { year: '2018', title: 'Placement Milestone', description: 'Crossed 10,000 successful student placements across India.' },
  { year: '2021', title: 'National Recognition', description: 'Recognized as one of Gujarat\'s top IT training institutes.' },
  { year: '2024', title: 'Innovation Lab', description: 'Launched innovation labs with cutting-edge technology and AI integration.' },
];

const values = [
  { icon: HiAcademicCap, title: 'Excellence', description: 'We maintain the highest standards in education and training.', color: 'from-blue-500 to-cyan-500' },
  { icon: HiLightningBolt, title: 'Innovation', description: 'We constantly update our curriculum to stay ahead of industry trends.', color: 'from-yellow-500 to-orange-500' },
  { icon: HiUserGroup, title: 'Community', description: 'We build a supportive learning community for all our students.', color: 'from-purple-500 to-pink-500' },
  { icon: HiGlobe, title: 'Impact', description: 'We aim to create lasting impact through technology education.', color: 'from-green-500 to-emerald-500' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">CDMI</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-2xl mx-auto text-lg">
            Creative Design & Multimedia Institute has been empowering students with industry-relevant skills since 2012. We believe in practical, hands-on education that transforms careers.
          </motion.p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-dark-900/50 border border-white/5 hover:border-primary-500/20 transition-all duration-500 text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} p-2.5 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-full h-full text-white" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-dark-400 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-white text-center mb-12"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/50 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${i % 2 === 0 ? 'right' : 'left'}`}
              >
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="font-display text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">{item.year}</div>
                  <h3 className="font-semibold text-white mt-1">{item.title}</h3>
                  <p className="text-dark-400 text-sm mt-1">{item.description}</p>
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-dark-950 z-10" />

                <div className="flex-1 pl-16 md:pl-0">
                  <div className="md:hidden">
                    <div className="font-display text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">{item.year}</div>
                    <h3 className="font-semibold text-white mt-1">{item.title}</h3>
                    <p className="text-dark-400 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
