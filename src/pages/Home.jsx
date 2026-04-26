import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

export default function Home() {
  const featuredProducts = products.slice(0, 4)
  const { toggleWishlist, isInWishlist } = useWishlist()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <div className="bg-gold-50 dark:bg-dark-900 transition-colors duration-300">

      {/* Modern Gen Z Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden glow-mesh">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-accent-pink/20 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-ping"></span>
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/80">
                Dropping Now: SS26 Collection
              </span>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white leading-[0.85] tracking-tighter mb-8 italic">
              OWN THE <br />
              <span className="text-transparent stroke-white stroke-1 font-outline-2" style={{ WebkitTextStroke: '1px white' }}>GLOWtrecrw</span>.
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
              Elevate your everyday with jewelry that speaks louder than words. Artisan crafted for the digital generation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="group relative px-8 py-4 bg-gold-500 text-dark-900 font-display font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:pr-12"
              >
                <span className="relative z-10">Shop Drop</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-display font-bold uppercase tracking-widest rounded-full border border-white/20 transition-all"
              >
                Our Vibe
              </Link>
            </div>

            {/* Social Proof / Stats */}
            <div className="mt-16 flex items-center space-x-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-display font-bold text-white">50k+</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Community</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">4.9</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Visual Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl group">
              <img
                src="/images/hero_modern.png"
                alt="Modern Jewelry"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-8 left-8">
                <p className="text-white font-display font-bold text-xl">The Noira Choker</p>
                <p className="text-gold-400 font-mono text-sm">₹12,499</p>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center rotate-12"
            >
              <ShoppingBag className="text-gold-500" size={40} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 right-6 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-display font-bold rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] -rotate-3 hover:rotate-0 transition-transform cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse"></span>
                NEW ARRIVAL ✨
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 sm:py-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-gold-600 dark:text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
          >
            Explore by Category
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-dark-900 dark:text-white uppercase tracking-tighter">Curated Collections</h2>
          <div className="w-24 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            { name: 'Rings', img: '/images/ring.png' },
            { name: 'Necklaces', img: '/images/necklace.png' },
            { name: 'Earrings', img: '/images/earrings.png' },
            { name: 'Bracelets', img: '/images/bracelets.png' },
            { name: 'Watches', img: '/images/watches.png' },
            { name: 'Bridal', img: '/images/diamond_bracelet.png' },
            { name: 'Fine Gold', img: '/images/gold_hoops.png' },
            { name: 'Gifts', img: '/images/sapphire_ring.png' }
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group overflow-hidden cursor-pointer"
            >
              <div className="aspect-square sm:aspect-[4/5] bg-gray-200 dark:bg-dark-800">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <h3 className="text-white text-xl sm:text-2xl font-display font-bold tracking-tight uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {cat.name}
                </h3>
                <span className="text-gold-400 text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 mt-2">
                  View Collection →
                </span>
              </div>
              <Link to={`/shop?category=${cat.name}`} className="absolute inset-0 z-10">
                <span className="sr-only">Browse {cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 sm:py-32 bg-white dark:bg-dark-800 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 sm:mb-16 gap-6">
            <div className="text-center sm:text-left">
              <span className="text-gold-600 dark:text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
                Trending Now
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-dark-900 dark:text-white uppercase tracking-tighter">Featured Pieces</h2>
              <div className="w-16 h-px bg-gold-400 mt-6 mx-auto sm:mx-0"></div>
            </div>
            <Link to="/shop" className="group hidden sm:flex items-center text-sm tracking-widest uppercase hover:text-gold-600 dark:hover:text-gold-400 dark:text-gold-50 transition-colors">
              <span className="border-b border-dark-900 dark:border-gold-50 group-hover:border-gold-600 dark:group-hover:border-gold-400 pb-1 mr-2 transition-colors">
                View All
              </span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          >
            {featuredProducts.map((product) => (
              <motion.div variants={itemVariants} key={product.id} className="group cursor-pointer relative">
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-dark-900/80 transition-colors ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-dark-700 mb-6 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-dark-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center sm:hidden">
            <Link to="/shop" className="inline-block border border-dark-900 dark:border-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-dark-900 hover:text-white dark:hover:bg-white dark:hover:text-dark-900 transition-colors dark:text-white">
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
