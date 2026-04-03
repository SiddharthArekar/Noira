import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-gold-50 dark:bg-dark-900 flex flex-col items-center justify-center transition-colors duration-300">
        <h2 className="text-3xl font-serif text-dark-900 dark:text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center font-light">
          It looks like you haven't added any pieces to your collection yet.
        </p>
        <Link 
          to="/shop"
          className="bg-dark-900 text-white dark:bg-gold-50 dark:text-dark-900 px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 bg-gold-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-dark-900 dark:text-white mb-12 border-b border-gold-200 dark:border-dark-800 pb-6">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items */}
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gold-200 dark:border-dark-800 text-sm tracking-widest uppercase text-gray-500 font-semibold mb-6">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={`${item.product.id}-${item.selectedSize}`} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gold-100 dark:border-dark-800 pb-8"
                >
                  <div className="col-span-1 md:col-span-6 flex items-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-24 h-32 object-cover bg-gray-100 dark:bg-dark-800 mr-6"
                    />
                    <div>
                      <Link to={`/product/${item.product.id}`} className="text-lg font-serif text-dark-900 dark:text-white hover:text-gold-600 transition-colors block mb-1">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Size: {item.selectedSize}</p>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center transition-colors"
                      >
                        <Trash2 size={14} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 text-center hidden md:block text-gray-700 dark:text-gray-300">
                    ${item.product.price.toLocaleString()}
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-center mt-4 md:mt-0">
                    <div className="flex items-center border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 text-dark-900 dark:text-white transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center text-sm font-medium text-dark-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 text-dark-900 dark:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-right font-medium text-dark-900 dark:text-white flex justify-between md:block mt-4 md:mt-0">
                    <span className="md:hidden text-gray-500 uppercase text-xs tracking-widest">Total: </span>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-dark-800 p-8 border border-gold-100 dark:border-dark-700 shadow-sm sticky top-32">
              <h3 className="text-lg font-serif text-dark-900 dark:text-white mb-6 uppercase tracking-widest border-b border-gold-100 dark:border-dark-700 pb-4">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gold-100 dark:border-dark-700 pt-4 mb-8">
                <div className="flex justify-between items-center text-lg font-serif text-dark-900 dark:text-white">
                  <span>Estimated Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full block text-center bg-dark-900 text-white dark:bg-gold-50 dark:text-dark-900 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
