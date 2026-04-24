import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Sun, Moon, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SearchBar from './SearchBar'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'))
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setIsDark(true)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/shop?category=Collections' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gold-50/95 dark:bg-dark-900/95 backdrop-blur-md shadow-sm' : 'bg-gold-50 dark:bg-dark-900'
    }`}>
      {/* Top Tier: Logo, Search, Icons */}
      <div className="border-b border-gold-200 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-dark-900 dark:text-gold-50">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
              <Link to="/" className="text-3xl font-serif font-bold tracking-widest text-dark-900 dark:text-gold-50 transition-colors uppercase">
                Noira
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-12">
              <SearchBar />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6 text-dark-900 dark:text-gold-50 transition-colors">
              <button onClick={toggleTheme} className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors hidden sm:block">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Link to="/auth" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors hidden sm:block">
                <User size={20} />
              </Link>
              
              <Link to="/wishlist" className="relative hover:text-gold-600 dark:hover:text-gold-400 transition-colors hidden sm:block">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="relative hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Navigation Links (Desktop) */}
      <div className={`hidden lg:block transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-12 opacity-100 border-b border-gold-200 dark:border-dark-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-center space-x-10 items-center h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  location.pathname === link.path && !link.path.includes('?')
                    ? 'text-gold-600 dark:text-gold-400 font-semibold' 
                    : 'text-dark-700 hover:text-gold-600 dark:text-gray-300 dark:hover:text-gold-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gold-50 dark:bg-dark-900 absolute w-full shadow-lg border-b border-gold-200 dark:border-dark-800">
          <div className="px-4 py-4 border-b border-gold-200 dark:border-dark-800">
             <SearchBar />
          </div>
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base uppercase tracking-widest text-dark-900 dark:text-gold-50 hover:bg-gold-100 dark:hover:bg-dark-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 mt-2 border-t border-gold-200 dark:border-dark-800">
              <div className="flex items-center space-x-2 text-dark-900 dark:text-gold-50 uppercase tracking-widest text-base">
                <User size={20} />
                <span>Sign In / Account</span>
              </div>
            </Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 mt-2 border-t border-gold-200 dark:border-dark-800">
              <div className="flex items-center space-x-2 text-dark-900 dark:text-gold-50 uppercase tracking-widest text-base">
                <Heart size={20} />
                <span>Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="bg-gold-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <div className="flex items-center justify-between px-3 py-3 mt-2 border-t border-gold-200 dark:border-dark-800">
              <span className="text-dark-900 dark:text-gold-50 uppercase tracking-widest text-base">Theme</span>
              <button onClick={toggleTheme} className="text-dark-900 dark:text-gold-50">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
