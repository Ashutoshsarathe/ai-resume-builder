import { useState } from 'react'
import { FileText, LockKeyhole } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API_URL from '../config'

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setMessage('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsLoading(true)

        // `http://localhost:5000/api/auth/reset-password/${token}`,

        try {
            const response = await fetch(
                `${API_URL}/api/auth/reset-password/${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to reset password.')
            }

            setMessage(data.message)

            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200">
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
                        Create New Password
                    </h1>
                    <p className="mt-3 text-slate-600">
                        Enter a strong new password for your account.
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

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            New Password
                        </label>

                        <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <LockKeyhole size={19} className="text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Minimum 6 characters"
                                className="w-full py-3 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Confirm New Password
                        </label>

                        <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <LockKeyhole size={19} className="text-slate-400" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="Confirm your new password"
                                className="w-full py-3 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {isLoading ? 'Resetting Password...' : 'Reset Password'}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-600">
                    Remember your password?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Login
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default ResetPassword