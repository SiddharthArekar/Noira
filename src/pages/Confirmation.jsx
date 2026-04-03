import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Confirmation() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gold-50 dark:bg-dark-900 flex flex-col items-center justify-center transition-colors duration-300 px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-white dark:bg-dark-800 p-8 md:p-16 max-w-2xl w-full text-center border border-gold-100 dark:border-dark-700 shadow-sm"
      >
        <div className="flex justify-center mb-8">
          <CheckCircle size={64} className="text-gold-600 dark:text-gold-400" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif text-dark-900 dark:text-white mb-4">
          Thank you for your order
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 font-light mb-8 max-w-md mx-auto">
          Your order has been received and is currently being processed. You will receive an email confirmation shortly with tracking information once your item ships.
        </p>

        <div className="bg-gold-50 dark:bg-dark-700/50 p-6 mb-10 inline-block text-left relative">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
          <p className="text-xl font-serif text-dark-900 dark:text-white tracking-wider">
            NOIRA-{Math.floor(100000 + Math.random() * 900000)}
          </p>
        </div>

        <div>
          <Link 
            to="/shop"
            className="inline-block bg-dark-900 text-white dark:bg-gold-50 dark:text-dark-900 px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
