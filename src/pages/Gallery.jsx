import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600', alt: 'Classroom session', category: 'campus' },
  { id: 2, src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', alt: 'Student collaboration', category: 'events' },
  { id: 3, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', alt: 'Workshop', category: 'workshops' },
  { id: 4, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600', alt: 'Hackathon event', category: 'events' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600', alt: 'Campus tour', category: 'campus' },
  { id: 6, src: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600', alt: 'Tech lab', category: 'campus' },
  { id: 7, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', alt: 'Group project', category: 'workshops' },
  { id: 8, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', alt: 'Annual day', category: 'events' },
  { id: 9, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600', alt: 'Computer lab', category: 'campus' },
];

const categories = ['all', 'campus', 'events', 'workshops'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Gallery</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto">
            A glimpse into the vibrant life at CDMI — workshops, events, campus, and more.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white/5 text-dark-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/80 hover:text-white" aria-label="Close">
              <HiX size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
