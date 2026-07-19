import { useState } from 'react'
import { ArrowLeft, FileText, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import API_URL from '../config'


function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setError('')
    setIsLoading(true)


    // 'http://localhost:5000/api/auth/forgot-password',

    try {
      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send reset email.')
      }

      setMessage(data.message)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200">
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        <div className="flex items-center justify-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <FileText size={22} />
          </div>
          <span className="text-xl font-bold text-slate-900">
            AI Resume Builder
          </span>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Forgot Password?
          </h1>
          <p className="mt-3 text-slate-600">
            Enter your registered email address. We will send you a password
            reset link.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <Mail size={19} className="text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full py-3 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default ForgotPassword