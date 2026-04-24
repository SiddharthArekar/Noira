import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="pt-24 pb-24 bg-gold-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-dark-900 dark:text-white mb-12 text-center pt-8">
          Your Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-dark-800 rounded shadow-sm">
            <h2 className="text-2xl font-serif text-dark-900 dark:text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Explore our collections and find pieces you love.
            </p>
            <Link 
              to="/shop" 
              className="inline-block bg-dark-900 dark:bg-gold-50 text-white dark:text-dark-900 px-8 py-3 uppercase tracking-widest text-sm hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group flex flex-col bg-white dark:bg-dark-800 shadow-sm"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif text-dark-900 dark:text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">₹{product.price.toLocaleString()}</p>
                  
                  <div className="mt-auto flex justify-between gap-2">
                    <button 
                      onClick={() => {
                        addToCart(product)
                        removeFromWishlist(product.id)
                      }}
                      className="flex-1 bg-dark-900 dark:bg-gold-50 text-white dark:text-dark-900 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors"
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-10 bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
