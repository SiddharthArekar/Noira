import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, User, Sun, Moon } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { cartCount } = useCart()
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
    { name: 'Collections', path: '/shop?category=collections' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gold-50/90 dark:bg-dark-900/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-dark-900 dark:text-gold-50">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-dark-900 dark:text-gold-50 transition-colors uppercase">
              Noira
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  location.pathname === link.path 
                    ? 'text-gold-600 dark:text-gold-400 font-semibold' 
                    : 'text-dark-700 hover:text-gold-600 dark:text-gray-300 dark:hover:text-gold-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6 text-dark-900 dark:text-gold-50 transition-colors">
            <button onClick={toggleTheme} className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors hidden sm:block">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors hidden sm:block">
              <User size={20} />
            </button>
            <Link to="/cart" className="relative hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gold-50 dark:bg-dark-900 absolute w-full shadow-lg border-t border-gold-200 dark:border-dark-800">
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
            <div className="flex items-center justify-between px-3 py-3 mt-4 border-t border-gold-200 dark:border-dark-800">
              <span className="text-dark-900 dark:text-gold-50 uppercase tracking-widest">Theme</span>
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
