import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiStar, HiChatAlt2 } from 'react-icons/hi';
import { studentReviews } from '../../data/courses';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % studentReviews.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + studentReviews.length) % studentReviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const student = studentReviews[current];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6"
          >
            <HiChatAlt2 className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">Student Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            What Our Students
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Say About Us
            </span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[340px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="glass rounded-3xl p-8 md:p-12 text-center">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <HiStar key={i} size={20} className="text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-dark-200 leading-relaxed mb-8 italic">
                    &ldquo;{student.review}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-14 h-14 rounded-full ring-2 ring-primary-500/30 object-cover"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {student.name}
                      </div>
                      <div className="text-sm">
                        <span className="text-primary-400">{student.role}</span>
                        <span className="text-dark-500"> @ </span>
                        <span className="text-accent-400">{student.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl glass border border-white/10 hover:border-primary-500/30 flex items-center justify-center text-dark-400 hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {studentReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-primary-500' : 'w-2 bg-dark-700 hover:bg-dark-600'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl glass border border-white/10 hover:border-primary-500/30 flex items-center justify-center text-dark-400 hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
