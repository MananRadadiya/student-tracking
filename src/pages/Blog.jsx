import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar } from 'react-icons/hi';

const posts = [
  {
    id: 1,
    title: 'Top 10 Web Development Trends in 2026',
    excerpt: 'Discover the latest web development trends that are shaping the future of the internet and digital experiences.',
    date: 'Mar 10, 2026',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
  },
  {
    id: 2,
    title: 'Why UI/UX Design is the Most In-Demand Skill',
    excerpt: 'Learn why companies are investing heavily in user experience and how you can build a career in UX design.',
    date: 'Mar 5, 2026',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500',
  },
  {
    id: 3,
    title: 'Getting Started with Data Science: A Beginner\'s Guide',
    excerpt: 'A comprehensive roadmap for aspiring data scientists covering essential tools, languages, and frameworks.',
    date: 'Feb 28, 2026',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
  },
  {
    id: 4,
    title: 'How CDMI Students Are Building the Future of Gaming',
    excerpt: 'Meet the CDMI game development alumni who are creating award-winning games and virtual experiences.',
    date: 'Feb 20, 2026',
    category: 'Game Development',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500',
  },
  {
    id: 5,
    title: 'Digital Marketing Strategies That Actually Work',
    excerpt: 'Proven digital marketing strategies from our expert faculty to help you build your brand online.',
    date: 'Feb 15, 2026',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500',
  },
  {
    id: 6,
    title: 'From Student to Software Engineer: Alumni Success Stories',
    excerpt: 'Inspiring stories of CDMI alumni who transitioned from students to successful tech professionals.',
    date: 'Feb 10, 2026',
    category: 'Success Stories',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Blog</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto">
            Insights, tutorials, and news from the world of technology and design.
          </motion.p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl bg-dark-900/50 border border-white/5 hover:border-primary-500/20 overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1 text-dark-500 text-xs"><HiCalendar size={12} />{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <Link to="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary-400 hover:gap-2 transition-all">
                  Read More <HiArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
