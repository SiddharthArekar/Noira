import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
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
      
      {/* Modern Hero Section */}
      <section className="relative h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero_modern.png" 
            alt="Luxury Jewelry Collection" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-24 sm:mt-20"
        >
          <span className="block text-gold-400 text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-6">
            The New Standard of Luxury
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-serif font-bold mb-6 sm:mb-8 tracking-wide leading-[1.1]">
            Elegance <br className="sm:hidden" /> Refined
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 tracking-wider max-w-2xl mx-auto font-light leading-relaxed">
            Discover our curated collection of fine jewelry. Artisan crafted pieces designed for the modern connoisseur, bringing timeless beauty to everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/shop" 
              className="w-full sm:w-auto inline-block bg-white text-dark-900 px-8 sm:px-10 py-4 font-semibold uppercase tracking-widest hover:bg-gold-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about" 
              className="w-full sm:w-auto inline-block bg-transparent border border-white text-white px-8 sm:px-10 py-4 font-semibold uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </motion.div>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-dark-900 dark:text-white">Curated Collections</h2>
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
                <h3 className="text-white text-xl sm:text-2xl font-serif tracking-widest uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-dark-900 dark:text-white">Featured Pieces</h2>
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
                    <h3 className="text-lg sm:text-xl font-serif text-dark-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
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
