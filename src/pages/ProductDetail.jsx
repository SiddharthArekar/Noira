import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { ArrowLeft, Check } from 'lucide-react'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductById(id)

  const [isAdded, setIsAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState('Standard')

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsAdded(false)
  }, [id])

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-gold-50 dark:bg-dark-900">
        <h2 className="text-2xl font-serif text-dark-900 dark:text-white">Product not found.</h2>
        <Link to="/shop" className="text-gold-600 hover:underline mt-4 inline-block">Return to Shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 3000)
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="pt-24 pb-24 bg-gold-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gold-50 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/5] bg-gray-100 dark:bg-dark-800 overflow-hidden sticky top-32"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl md:text-5xl font-serif text-dark-900 dark:text-white mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-light text-gray-700 dark:text-gray-300 mb-8">
              ${product.price.toLocaleString()}
            </p>

            <div className="prose prose-sm text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="mb-8 p-4 bg-white dark:bg-dark-800 shadow-sm border border-gold-100 dark:border-dark-700">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-dark-900 dark:text-gold-50 mb-2">Details</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Material:</span> {product.material}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-medium">Category:</span> {product.category}</p>
            </div>

            <div className="mb-10">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-dark-900 dark:text-gold-50 mb-4">Select Size</h4>
              <div className="flex space-x-4">
                {['Small', 'Standard', 'Large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm uppercase tracking-wider transition-colors ${
                      selectedSize === size 
                        ? 'border-dark-900 bg-dark-900 text-white dark:border-gold-50 dark:bg-gold-50 dark:text-dark-900' 
                        : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-dark-700 dark:text-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`w-full py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300 flex justify-center items-center ${
                isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-dark-900 text-white hover:bg-gold-600 dark:bg-gold-50 dark:text-dark-900 dark:hover:bg-gold-400'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="mr-2" /> Added to Cart
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-gold-200 dark:border-dark-800">
            <h2 className="text-2xl font-serif text-center text-dark-900 dark:text-white mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <div key={p.id} className="group">
                  <Link to={`/product/${p.id}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-dark-800 mb-4">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg font-serif text-dark-900 dark:text-white mb-1 group-hover:text-gold-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">${p.price.toLocaleString()}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
