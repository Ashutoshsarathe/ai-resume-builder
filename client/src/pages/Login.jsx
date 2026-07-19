import { useState } from 'react'
import { FileText, LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../config'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setIsLoading(true)

        try {
            const response = await fetch(
                // 'http://localhost:5000/api/auth/login',
                `${API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to login.')
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200">
                <Link to="/" className="mb-8 flex items-center justify-center gap-2">
                    <div className="rounded-xl bg-blue-600 p-2 text-white">
                        <FileText size={22} />
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                        AI Resume Builder
                    </span>
                </Link>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
                    <p className="mt-2 text-slate-600">
                        Login to manage your resumes.
                    </p>
                </div>

                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email address
                        </label>

                        <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <Mail size={19} className="text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full py-3 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-700">
                                Password
                            </label>
                            {/* <button
                                type="button"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Forgot password?
                            </button> */}
                            <Link
                                to="/forgot-password"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <LockKeyhole size={19} className="text-slate-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
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
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-600">
                    New to AI Resume Builder?{' '}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Create an account
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Login