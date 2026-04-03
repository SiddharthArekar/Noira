import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'

export default function Home() {
  const featuredProducts = products.slice(0, 4)

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
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero.png" 
            alt="Luxury Jewelry" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-4xl md:text-6xl text-white font-serif font-bold mb-6 tracking-wide leading-tight">
            Elegance in Every Detail
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 tracking-widest max-w-2xl mx-auto font-light">
            Discover our curated collection of fine jewelry designed for the modern connoisseur.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-white text-dark-900 px-8 py-4 font-semibold uppercase tracking-widest hover:bg-gold-100 transition-colors duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-dark-900 dark:text-white">Curated Collections</h2>
          <div className="w-24 h-px bg-gold-400 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Rings', img: '/images/ring.png' },
            { name: 'Necklaces', img: '/images/necklace.png' },
            { name: 'Earrings', img: '/images/earrings.png' }
          ].map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/5] bg-gray-200 dark:bg-dark-800">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif tracking-widest uppercase shadow-sm">
                  {cat.name}
                </h3>
              </div>
              <Link to={`/shop?category=${cat.name}`} className="absolute inset-0 z-10">
                <span className="sr-only">Browse {cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white dark:bg-dark-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-dark-900 dark:text-white">Featured Pieces</h2>
              <div className="w-16 h-px bg-gold-400 mt-4"></div>
            </div>
            <Link to="/shop" className="hidden border-b border-dark-900 dark:border-gold-50 pb-1 text-sm tracking-widest uppercase md:block hover:text-gold-600 dark:hover:text-gold-400 dark:text-gold-50 transition-colors">
              View All
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div variants={itemVariants} key={product.id} className="group">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-dark-700 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-dark-900 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">${product.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-block border-b border-dark-900 dark:border-gold-50 pb-1 text-sm tracking-widest uppercase hover:text-gold-600 transition-colors dark:text-gold-50">
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
