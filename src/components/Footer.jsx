import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gold-50 pt-16 pb-8 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 inline-block">
              Noira
            </Link>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Elevating everyday elegance with timeless jewelry crafted for the modern individual.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop?category=Rings" className="hover:text-gold-400 transition-colors">Rings</Link></li>
              <li><Link to="/shop?category=Necklaces" className="hover:text-gold-400 transition-colors">Necklaces</Link></li>
              <li><Link to="/shop?category=Earrings" className="hover:text-gold-400 transition-colors">Earrings</Link></li>
              <li><Link to="/shop?category=Bracelets" className="hover:text-gold-400 transition-colors">Bracelets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="#" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-gold-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-gold-400 transition-colors">Ring Sizing</Link></li>
              <li><Link to="#" className="hover:text-gold-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-gray-600 focus-within:border-gold-400 transition-colors pb-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-none w-full text-sm text-white focus:outline-none placeholder-gray-500"
              />
              <button type="submit" className="text-sm uppercase tracking-widest hover:text-gold-400 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Noira Jewelry. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
