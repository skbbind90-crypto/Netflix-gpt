import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const validateEmail = (value) => {
    const cleaned = value.trim()

    if (!cleaned) {
      return 'Please enter a valid email or phone number.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10,12}$/

    if (!emailRegex.test(cleaned) && !phoneRegex.test(cleaned.replace(/\D/g, ''))) {
      return 'Please enter a valid email address or phone number.'
    }

    return ''
  }

  const validatePassword = (value) => {
    if (!value) {
      return 'Your password must contain between 4 and 60 characters.'
    }

    if (value.length < 4 || value.length > 60) {
      return 'Your password must contain between 4 and 60 characters.'
    }

    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextEmailError = validateEmail(email)
    const nextPasswordError = validatePassword(password)

    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)

    if (!nextEmailError && !nextPasswordError) {
      setIsSubmitting(true)

      window.setTimeout(() => {
        setIsSubmitting(false)
        setLoginSuccess(true)
      }, 1000)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#020617_100%)]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-950/30 backdrop-blur-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 text-2xl">🔒</div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-300">Sign in to continue</p>
        </div>

        {loginSuccess ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">✓</div>
            <h2 className="text-2xl font-semibold">Signed in successfully</h2>
            <p className="text-slate-300">
              Logged in as <span className="font-semibold text-white">{email}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setLoginSuccess(false)
                setEmail('')
                setPassword('')
                setRememberMe(true)
                setEmailError('')
                setPasswordError('')
              }}
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Sign in with another account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                Email or mobile number
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (emailError) setEmailError('')
                }}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                placeholder="Enter email or phone"
                aria-invalid={Boolean(emailError)}
              />
              {emailError ? <p className="mt-2 text-sm text-red-400">{emailError}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    if (passwordError) setPasswordError('')
                  }}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                  placeholder="Enter password"
                  aria-invalid={Boolean(passwordError)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-300 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {passwordError ? <p className="mt-2 text-sm text-red-400">{passwordError}</p> : null}
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((current) => !current)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
