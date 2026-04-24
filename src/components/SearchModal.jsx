import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search as SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus input when opened
      setTimeout(() => {
        document.getElementById('searchInput')?.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
      setResults([])
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.material.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 sm:pt-32"
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-3xl bg-gold-50 dark:bg-dark-900 rounded-lg overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-dark-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-6 sm:p-8 border-b border-gold-200 dark:border-dark-800">
              <div className="relative flex items-center">
                <SearchIcon className="absolute left-0 text-gray-400 dark:text-gray-500" size={24} />
                <input 
                  id="searchInput"
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for jewelry, collections, or materials..."
                  className="w-full bg-transparent border-none py-3 pl-10 pr-4 text-xl sm:text-2xl text-dark-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 font-light"
                />
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
              {query.trim().length > 0 ? (
                results.length > 0 ? (
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 font-semibold">
                      Search Results ({results.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {results.map(product => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex gap-4 group"
                        >
                          <div className="w-20 h-20 bg-gray-200 dark:bg-dark-800 flex-shrink-0 overflow-hidden rounded">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <h4 className="text-dark-900 dark:text-white font-serif group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">₹{product.price.toLocaleString()}</p>
                            <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500 mt-2 block">
                              {product.category}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No results found for "{query}"</p>
                    <p className="text-sm text-gray-400 mt-2">Try checking your spelling or use more general terms.</p>
                  </div>
                )
              ) : (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 font-semibold">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['Rings', 'Gold Necklaces', 'Diamond Bracelets', 'Engagement', 'Watches'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-white dark:bg-dark-800 border border-gold-200 dark:border-dark-700 rounded-full text-sm text-dark-900 dark:text-white hover:border-gold-500 dark:hover:border-gold-500 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
