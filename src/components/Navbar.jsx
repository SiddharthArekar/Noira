import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Heart, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SearchBar from './SearchBar'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { 
      name: 'Exclusive Collections', 
      path: '#', 
      subLinks: [
        { name: 'Glow in Motion', path: '/shop?collection=Glow-in-Motion' },
        { name: 'Shakti Collection', path: '/shop?collection=Shakti-Collection' },
        { name: 'Gemstone Collection', path: '/shop?collection=Gemstone-Collection' },
        { name: 'Piercing Collection', path: '/shop?collection=Piercing-Collection' },
        { name: 'DIVA Collection', path: '/shop?collection=DIVA-Collection' },
        { name: 'Cherry Pop Collection', path: '/shop?collection=Cherry-Pop-Collection' },
        { name: 'Sky High', path: '/shop?collection=Sky-High' },
        { name: 'Stackable Collection', path: '/shop?collection=Stackable-Collection' },
        { name: 'Just Arrived', path: '/shop?collection=Just-Arrived' },
      ]
    },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-2xl border-black/5 dark:border-white/10 py-3' 
        : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center gap-8">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center space-x-2">
              <span className="text-2xl font-display font-black tracking-tighter text-dark-900 dark:text-white uppercase">
                Noira
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 group-hover:scale-150 transition-transform"></span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`flex items-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-gold-500 relative group ${
                    location.pathname === link.path && !link.path.includes('?') && !link.subLinks
                      ? 'text-dark-900 dark:text-white' 
                      : 'text-dark-500 dark:text-gray-400'
                  }`}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path && !link.path.includes('?') && !link.subLinks ? 'w-full' : ''
                  }`}></span>
                </Link>
                
                {link.subLinks && (
                  <div className="absolute top-full left-0 pt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-3 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                      {link.subLinks.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-dark-500 dark:text-gray-400 hover:text-gold-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Search Bar (Integrated) */}
          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-dark-900 dark:text-white">

            <Link to="/auth" className="hidden sm:block p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <User size={18} />
            </Link>
            
            <Link to="/wishlist" className="relative p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 bg-gold-500 text-white text-[9px] font-black rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative group flex items-center space-x-2 bg-dark-900 dark:bg-white text-white dark:text-dark-900 px-4 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-gold-500/20 active:scale-95">
              <ShoppingBag size={18} />
              <span className="text-xs font-bold">{cartCount}</span>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'calc(100vh - 80px)' : 0, opacity: isOpen ? 1 : 0 }}
        className="lg:hidden fixed top-[80px] left-0 right-0 overflow-y-auto bg-white dark:bg-dark-900 border-t border-black/5 dark:border-white/5 z-40"
      >
        <div className="px-8 py-12 space-y-8">
           <div className="mb-12">
              <SearchBar />
           </div>
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.name}
              initial={{ x: -20, opacity: 0 }}
              animate={isOpen ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: idx * 0.1 }}
            >
              {link.subLinks ? (
                <div className="space-y-4">
                  <span className="block text-4xl font-display font-black uppercase tracking-tighter text-dark-900 dark:text-white opacity-90">
                    {link.name}
                  </span>
                  <div className="pl-6 space-y-4 border-l-2 border-gold-500/30">
                    {link.subLinks.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-display font-bold uppercase tracking-tight text-dark-500 dark:text-gray-400 hover:text-gold-500 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl font-display font-black uppercase tracking-tighter text-dark-900 dark:text-white hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </motion.div>
          ))}
          
          <div className="pt-12 mt-12 border-t border-black/5 dark:border-white/5 flex flex-col space-y-6">
            <Link to="/auth" onClick={() => setIsOpen(false)} className="flex items-center space-x-4 text-lg font-bold uppercase tracking-widest text-dark-500">
              <User size={24} />
              <span>Your Account</span>
            </Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center space-x-4 text-lg font-bold uppercase tracking-widest text-dark-500">
              <Heart size={24} />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}
