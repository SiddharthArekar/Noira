import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvc: ''
  })

  // Basic validation state
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (cartItems.length === 0 && !isSubmitting) {
    navigate('/shop')
    return null
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call for checkout
    setTimeout(() => {
      clearCart()
      navigate('/confirmation')
    }, 1500)
  }

  return (
    <div className="pt-32 pb-24 bg-gold-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-dark-900 dark:text-white mb-12 border-b border-gold-200 dark:border-dark-800 pb-6">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Shipping Information */}
              <div>
                <h3 className="text-xl font-serif text-dark-900 dark:text-white mb-6">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Address</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">ZIP Code</label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="pt-8 border-t border-gold-200 dark:border-dark-800">
                <h3 className="text-xl font-serif text-dark-900 dark:text-white mb-6">Payment Method</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">Simulation mode - Do not enter real card details.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Name on Card</label>
                    <input required type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Card Number</label>
                    <input required type="text" name="cardNumber" maxLength="16" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Expiry (MM/YY)</label>
                    <input required type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">CVC</label>
                    <input required type="text" name="cvc" maxLength="3" placeholder="123" value={formData.cvc} onChange={handleChange} className="w-full bg-transparent border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center items-center bg-dark-900 text-white dark:bg-gold-50 dark:text-dark-900 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-dark-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Place Order'}
              </button>

            </form>
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-80 flex-shrink-0 mt-12 lg:mt-0">
            <div className="bg-white dark:bg-dark-800 p-8 border border-gold-100 dark:border-dark-700 shadow-sm sticky top-32">
              <h3 className="text-lg font-serif text-dark-900 dark:text-white mb-6 uppercase tracking-widest border-b border-gold-100 dark:border-dark-700 pb-4">
                In Your Cart
              </h3>
              
              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-100 dark:bg-dark-700 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-serif text-dark-900 dark:text-white truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500 uppercase">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-dark-900 dark:text-white mt-1">${(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold-100 dark:border-dark-700 pt-4 space-y-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Free)</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-lg font-serif text-dark-900 dark:text-white mt-4 pt-4 border-t border-gray-100 dark:border-dark-700">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
