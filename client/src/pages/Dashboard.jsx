import { useEffect, useState } from 'react'
import {
    Share2,
    Clock3,
    FilePenLine,
    FileText,
    LayoutDashboard,
    LogOut,
    Plus,
    Sparkles,
    Trash2,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../config'


const templateNames = {
    classic: 'Classic Black',
    modern: 'Modern Blue',
    minimal: 'Minimal Clean',
    professional: 'Professional Sidebar',
}


function Dashboard() {
    const navigate = useNavigate()

    const [resumes, setResumes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const userName = savedUser.name || 'User'

    const userInitials = userName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    useEffect(() => {
        const fetchResumes = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                navigate('/login')
                return
            }

            // fetch('http://localhost:5000/api/resumes',)

            try {
                const response = await fetch(`${API_URL}/api/resumes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Unable to fetch resumes.')
                }

                setResumes(data.resumes)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchResumes()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    const handleDelete = async (resumeId) => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete this resume?'
        )

        if (!shouldDelete) {
            return
        }

        const token = localStorage.getItem('token')

        try {
            const response = await fetch(
                // `http://localhost:5000/api/resumes/${resumeId}`,
                `${API_URL}/api/resumes/${resumeId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to delete resume.')
            }

            setResumes((previousResumes) =>
                previousResumes.filter((resume) => resume._id !== resumeId)
            )
        } catch (error) {
            alert(error.message)
        }
    }
    const handleShare = async (resume) => {
        const token = localStorage.getItem('token')

        try {
            const response = await fetch(
                // `http://localhost:5000/api/resumes/${resume._id}/visibility`,
                `${API_URL}/api/resumes/${resume._id}/visibility`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        isPublic: true,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to create public link.')
            }

            setResumes((previousResumes) =>
                previousResumes.map((item) =>
                    item._id === resume._id ? data.resume : item
                )
            )

            const publicLink = `${window.location.origin}/resume/${data.resume.publicId}`

            try {
                await navigator.clipboard.writeText(publicLink)
                alert('Public resume link copied to clipboard!')
            } catch {
                window.prompt('Copy your public resume link:', publicLink)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const getInitials = (name) => {
        if (!name) {
            return userInitials
        }

        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="rounded-xl bg-blue-600 p-2 text-white">
                            <FileText size={21} />
                        </div>
                        <span className="text-lg font-bold">AI Resume Builder</span>
                    </Link>

                    <nav className="mt-10 space-y-2">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 font-semibold text-blue-600"
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        <Link
                            to="/editor"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-600 hover:bg-slate-100"
                        >
                            <FilePenLine size={20} />
                            Resume Editor
                        </Link>
                    </nav>

                    <div className="mt-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">
                        <Sparkles size={22} />
                        <p className="mt-3 font-bold">AI Resume Assistant</p>
                        <p className="mt-1 text-sm text-blue-100">
                            Improve your resume content with AI.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </aside>

                {/* Main section */}
                <main className="min-h-screen flex-1">
                    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-10">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Welcome back,</p>
                            <h1 className="text-xl font-bold text-slate-900">{userName}</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-semibold">{userName}</p>
                                <p className="text-xs text-slate-500">Free Plan</p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                {userInitials}
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">
                                    My Resumes
                                </h2>
                                <p className="mt-2 text-slate-600">
                                    Create, edit, and manage all your professional resumes.
                                </p>
                            </div>

                            {/* <Link
                                to="/editor"
                                className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                            >
                                <Plus size={20} />
                                Create New Resume
                            </Link> */}

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/upload-resume"
                                    className="flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                                >
                                    <FileText size={20} />
                                    Upload Existing Resume
                                </Link>

                                <Link
                                    to="/editor"
                                    className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                                >
                                    <Plus size={20} />
                                    Create New Resume
                                </Link>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="mt-8 grid gap-5 sm:grid-cols-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-5">
                                <p className="text-sm font-medium text-slate-500">
                                    Total Resumes
                                </p>
                                <p className="mt-2 text-3xl font-bold">{resumes.length}</p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5">
                                <p className="text-sm font-medium text-slate-500">
                                    Public Resumes
                                </p>
                                <p className="mt-2 text-3xl font-bold">
                                    {resumes.filter((resume) => resume.isPublic).length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5">
                                <p className="text-sm font-medium text-slate-500">
                                    Profile Completion
                                </p>
                                <p className="mt-2 text-3xl font-bold text-emerald-600">80%</p>
                            </div>
                        </div>

                        <section className="mt-10">
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Your resumes</h3>
                            </div>

                            {isLoading && (
                                <p className="text-slate-500">Loading your resumes...</p>
                            )}

                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                                    {error}
                                </div>
                            )}

                            {!isLoading && !error && resumes.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                                    <FileText
                                        size={38}
                                        className="mx-auto text-slate-400"
                                    />
                                    <h4 className="mt-4 text-lg font-bold">No resumes yet</h4>
                                    <p className="mt-2 text-slate-500">
                                        Create your first professional resume now.
                                    </p>

                                    <Link
                                        to="/editor"
                                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                    >
                                        <Plus size={19} />
                                        Create Resume
                                    </Link>
                                </div>
                            )}

                            <div className="grid gap-6 lg:grid-cols-2">
                                {resumes.map((resume) => (
                                    <article
                                        key={resume._id}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="flex items-start justify-between border-b border-slate-100 p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                                                    {getInitials(resume.fullName)}
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-slate-900">
                                                        {resume.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {/* {resume.template === 'classic'
                                                            ? 'Classic Black'
                                                            : 'Modern Blue'} */}
                                                        {templateNames[resume.template] || 'Modern Blue'}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(resume._id)}
                                                className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                                title="Delete Resume"
                                            >
                                                <Trash2 size={19} />
                                            </button>
                                        </div>

                                        <div className="p-6">
                                            <div className="rounded-lg bg-slate-100 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-700">
                                                        {getInitials(resume.fullName)}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold">
                                                            {resume.fullName || userName}
                                                        </p>
                                                        <p className="text-sm text-slate-500">
                                                            {resume.jobTitle || 'Professional Resume'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                                                    {resume.summary || 'No summary added yet.'}
                                                </p>
                                            </div>

                                            <div className="mt-5 flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-sm text-slate-500">
                                                    <Clock3 size={16} />
                                                    Updated {formatDate(resume.updatedAt)}
                                                </span>

                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => handleShare(resume)}
                                                        className="flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700"
                                                    >
                                                        <Share2 size={17} />
                                                        Share
                                                    </button>

                                                    <Link
                                                        to={`/editor/${resume._id}`}
                                                        className="font-semibold text-blue-600 hover:text-blue-700"
                                                    >
                                                        Edit Resume
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard