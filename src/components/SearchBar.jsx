import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.material.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered.slice(0, 4)) // Show max 4 products in dropdown
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  const suggestions = [
    `${query}`,
    `${query} rings`,
    `${query} for women`,
    `gold ${query}`,
  ].filter(s => query.trim().length > 0)

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative flex items-center group">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.trim().length > 0) setIsOpen(true) }}
          placeholder="Search for Rings, Necklaces, etc."
          className="w-full bg-white dark:bg-dark-800/80 border border-gray-200 dark:border-dark-700 rounded-full py-3 pl-6 pr-12 text-sm text-dark-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 hover:border-gold-300 dark:hover:border-gold-700 transition-all shadow-sm"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gold-600 dark:text-gray-500 dark:group-hover:text-gold-400 transition-colors">
          <SearchIcon size={20} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 rounded-2xl shadow-2xl overflow-hidden z-50 transform origin-top animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col sm:flex-row">
            
            {/* Suggestions Column */}
            <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-dark-700 p-5 bg-gray-50/50 dark:bg-dark-800/50">
              <h3 className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 font-semibold">Suggestions</h3>
              <ul className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setQuery(suggestion)}
                      className="text-sm font-medium text-dark-900 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-left w-full truncate flex items-center gap-2"
                    >
                      <SearchIcon size={14} className="text-gray-400" />
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Column */}
            <div className="w-full sm:w-2/3 p-5">
              <h3 className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 font-semibold">Top Products</h3>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map(product => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`}
                      onClick={() => { setIsOpen(false); setQuery(''); }}
                      className="flex gap-3 group items-center p-2 -m-2 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="w-14 h-14 bg-gray-100 dark:bg-dark-900 flex-shrink-0 overflow-hidden rounded-lg">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-dark-900 dark:text-white font-medium group-hover:text-gold-600 transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm font-semibold text-dark-900 dark:text-gray-300">₹{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-4 text-center italic">No products found for "{query}"</p>
              )}
            </div>
          </div>

          {/* Footer Search Link */}
          <div className="border-t border-gray-100 dark:border-dark-700 p-4 bg-gray-50 dark:bg-dark-900 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
            <Link 
              to={`/shop?search=${query}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 text-sm text-dark-900 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors"
            >
              See all results for "{query}"
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
