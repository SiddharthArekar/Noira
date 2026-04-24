import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function Auth() {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  const [step, setStep] = useState('input') // 'input', 'otp', 'success'
  const [identifier, setIdentifier] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (!identifier) return
    if (authMode === 'register' && !name) return
    
    setIsLoading(true)
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
    }, 1000)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (otp.length < 4) return
    setIsLoading(true)
    
    // Simulate API call to verify OTP and complete login/registration
    setTimeout(() => {
      setIsLoading(false)
      setStep('success')
      setTimeout(() => navigate('/'), 2000)
    }, 1000)
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    
    // Simulate opening a Google OAuth popup
    const popup = window.open('', 'GoogleLogin', 'width=500,height=600,left=200,top=200')
    if (popup) {
      popup.document.write('<div style="font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;"><h2>Sign in with Google</h2><p>Connecting...</p></div>')
    }

    setTimeout(() => {
      if (popup) popup.close()
      setIsLoading(false)
      setStep('success')
      setTimeout(() => navigate('/'), 2000)
    }, 1500)
  }

  const GoogleLogo = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login')
    setStep('input')
    setIdentifier('')
    setName('')
    setOtp('')
  }

  return (
    <div className="min-h-screen bg-gold-50 dark:bg-dark-900 transition-colors duration-300 flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="/images/hero_modern.png" 
          alt="Luxury Jewelry" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <h2 className="text-4xl font-serif font-bold mb-6 tracking-wide">Enter the World of Noira</h2>
            <p className="text-lg font-light tracking-wide text-gray-200">
              Create an account or sign in to save your wishlist, track orders, and experience personalized luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative overflow-y-auto">
        <div className="absolute top-8 left-8 sm:left-16 lg:left-24">
          <Link to="/" className="flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gold-50 transition-colors w-fit">
            <ArrowLeft size={16} className="mr-2" /> Back to Shop
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0 mt-16 lg:mt-0">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-serif text-dark-900 dark:text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-light">
              {authMode === 'login' ? 'Sign in to access your account' : 'Join Noira for a personalized experience'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSendOtp} className="space-y-6">
                  {authMode === 'register' && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-900 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jane Doe"
                        className="w-full px-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 focus:outline-none focus:border-gold-500 dark:focus:border-gold-500 text-dark-900 dark:text-white transition-colors"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="identifier" className="block text-sm font-medium text-dark-900 dark:text-gray-300 mb-2">
                      Email or Mobile Number
                    </label>
                    <input
                      id="identifier"
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. hello@noira.com or 9876543210"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 focus:outline-none focus:border-gold-500 dark:focus:border-gold-500 text-dark-900 dark:text-white transition-colors"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !identifier || (authMode === 'register' && !name)}
                    className="w-full bg-dark-900 dark:bg-gold-50 text-white dark:text-dark-900 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {isLoading ? <span className="animate-pulse">Sending OTP...</span> : (authMode === 'login' ? 'Send Login Code' : 'Send Registration Code')}
                  </button>
                </form>

                <div className="mt-8 flex items-center justify-center">
                  <div className="w-full h-px bg-gray-300 dark:bg-dark-700"></div>
                  <span className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-gold-50 dark:bg-dark-900">OR</span>
                  <div className="w-full h-px bg-gray-300 dark:bg-dark-700"></div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); handleGoogleSignIn(); }}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 text-dark-900 dark:text-white py-3.5 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="animate-pulse font-medium">Connecting to Google...</span>
                    ) : (
                      <>
                        <GoogleLogo />
                        <span className="font-medium">{authMode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-10 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      type="button"
                      onClick={toggleAuthMode}
                      className="text-dark-900 dark:text-white font-semibold hover:text-gold-600 dark:hover:text-gold-400 underline transition-colors"
                    >
                      {authMode === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We've sent a 4-digit code to <span className="font-medium text-dark-900 dark:text-white">{identifier}</span>.
                  </p>
                  <button onClick={() => setStep('input')} className="text-gold-600 dark:text-gold-400 text-sm mt-1 hover:underline">
                    Change Email/Number
                  </button>
                </div>
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-dark-900 dark:text-gray-300 mb-2">
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      required
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="• • • •"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 focus:outline-none focus:border-gold-500 dark:focus:border-gold-500 text-dark-900 dark:text-white transition-colors tracking-[1em] text-center text-lg font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || otp.length < 4}
                    className="w-full bg-dark-900 dark:bg-gold-50 text-white dark:text-dark-900 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-600 dark:hover:bg-gold-400 transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {isLoading ? <span className="animate-pulse">Verifying...</span> : 'Verify Code'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
                <h2 className="text-2xl font-serif text-dark-900 dark:text-white mb-2">
                  {authMode === 'login' ? 'Successfully Signed In' : 'Account Created Successfully'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-light">Redirecting you to the store...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
