import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="bg-gold-50 dark:bg-dark-900 transition-colors duration-300 pt-24 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/about_hero.png" 
            alt="Jewelry Workshop" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Our Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-serif font-bold mb-6 tracking-wide">
            Crafting Timeless <br/> Beauty Since 1995
          </h1>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif text-dark-900 dark:text-white mb-6">The Noira Philosophy</h2>
            <div className="w-16 h-px bg-gold-400 mb-8"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed font-light">
              At Noira, we believe that fine jewelry is more than an accessory—it is an expression of self, a marker of milestones, and an heirloom for generations to come.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-light mb-8">
              Every piece in our collection is meticulously crafted by master artisans who blend traditional techniques with modern design sensibilities. We source only the finest, ethically mined diamonds and precious metals.
            </p>
            <Link to="/shop" className="inline-block border border-dark-900 dark:border-white text-dark-900 dark:text-white px-8 py-3 font-semibold uppercase tracking-widest hover:bg-dark-900 hover:text-white dark:hover:bg-white dark:hover:text-dark-900 transition-colors duration-300">
              Discover Our Work
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="/images/earrings.png" alt="Craftsmanship" className="w-full h-64 object-cover mt-12 shadow-lg" />
            <img src="/images/ring.png" alt="Design" className="w-full h-64 object-cover shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-dark-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-dark-900 dark:text-white">Our Values</h2>
            <div className="w-24 h-px bg-gold-400 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { title: "Ethical Sourcing", desc: "We are committed to conflict-free diamonds and recycled precious metals, ensuring beauty without compromise." },
              { title: "Master Craftsmanship", desc: "Decades of expertise go into every setting, polish, and detail, resulting in unparalleled quality." },
              { title: "Timeless Design", desc: "We create pieces that transcend trends, designed to be loved today and cherished forever." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-50 dark:bg-dark-700 mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gold-400"></div>
                </div>
                <h3 className="text-xl font-serif text-dark-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
