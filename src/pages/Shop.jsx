import { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { products } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

export default function Shop() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'All'

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sortOption, setSortOption] = useState('Featured')
  const { toggleWishlist, isInWishlist } = useWishlist()

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches']

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }

    switch (sortOption) {
      case 'Price: Low to High':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'Price: High to Low':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      default:
        // Featured - default order
        break
    }

    return filtered
  }, [activeCategory, sortOption])

  return (
    <div className="pt-24 pb-24 bg-gold-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-serif text-dark-900 dark:text-white mb-6">
          {activeCategory === 'All' ? 'Our Collection' : activeCategory}
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 font-light">
          Explore our meticulously crafted jewelry, designed to illuminate your everyday glow.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 border-b border-gold-200 dark:border-dark-800 pb-4 text-dark-900 dark:text-white">
              Categories
            </h3>
            <ul className="space-y-4">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`text-sm tracking-wide transition-colors ${
                      activeCategory === category 
                        ? 'text-gold-600 dark:text-gold-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-dark-900 dark:hover:text-gold-200'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 border-b border-gold-200 dark:border-dark-800 pb-4 mt-12 text-dark-900 dark:text-white">
              Sort By
            </h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-gold-50 text-sm py-3 px-4 focus:outline-none focus:border-gold-500 transition-colors"
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-500 dark:text-gray-400">No products found for this category.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group relative"
                >
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-dark-900/80 transition-colors ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-dark-800 mb-4 relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="block w-full bg-white dark:bg-dark-900 text-dark-900 dark:text-white text-center py-3 text-sm uppercase tracking-widest shadow-sm">
                          Quick View
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-serif text-dark-900 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">₹{product.price.toLocaleString()}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  )
}
