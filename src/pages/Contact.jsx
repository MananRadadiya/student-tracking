import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';

const contactInfo = [
  { icon: HiLocationMarker, label: 'Visit Us', value: 'CDMI, Satellite Road, Ahmedabad, Gujarat 380015', color: 'from-blue-500 to-cyan-500' },
  { icon: HiPhone, label: 'Call Us', value: '+91 98765 43210', color: 'from-green-500 to-emerald-500' },
  { icon: HiMail, label: 'Email Us', value: 'info@cdmi.in', color: 'from-purple-500 to-pink-500' },
  { icon: HiClock, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM', color: 'from-orange-500 to-red-500' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl bg-dark-900/50 border border-white/5 text-center group hover:border-primary-500/20 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${info.color} p-2.5 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <info.icon className="w-full h-full text-white" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{info.label}</h3>
              <p className="text-dark-400 text-sm">{info.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">Send Us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                Thank you! We&apos;ll get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-dark-300 mb-2" htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-2" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-dark-300 mb-2" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-2" htmlFor="course">Interested Course</label>
                  <select
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                  >
                    <option value="" className="bg-dark-900">Select a course</option>
                    <option value="web" className="bg-dark-900">Web Development</option>
                    <option value="uiux" className="bg-dark-900">UI/UX Design</option>
                    <option value="graphic" className="bg-dark-900">Graphic Design</option>
                    <option value="data" className="bg-dark-900">Data Science</option>
                    <option value="game" className="bg-dark-900">Game Development</option>
                    <option value="marketing" className="bg-dark-900">Digital Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-dark-300 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all resize-none"
                  placeholder="Tell us about your goals..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-500 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
