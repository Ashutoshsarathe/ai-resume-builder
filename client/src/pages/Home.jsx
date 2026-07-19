import {
    ArrowRight,
    CheckCircle2,
    Download,
    Eye,
    FileText,
    FileUp,
    LayoutTemplate,
    ListChecks,
    Share2,
    ShieldCheck,
    Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'


const features = [
    {
        icon: Sparkles,
        title: 'AI Content Improvement',
        description:
            'Improve summary, project descriptions, achievements, and certifications with Gemini AI.',
    },
    {
        icon: FileUp,
        title: 'PDF & DOCX Upload',
        description:
            'Upload an existing resume, extract its text, and organize the content using AI.',
    },
    {
        icon: LayoutTemplate,
        title: '4 Professional Templates',
        description:
            'Choose from ATS Classic, Modern Blue, Minimal Clean, and Professional Sidebar templates.',
    },
    {
        icon: Eye,
        title: 'Live Resume Preview',
        description:
            'Every change in the editor appears instantly in the selected resume template.',
    },
    {
        icon: Share2,
        title: 'Public Share Link',
        description:
            'Create a public resume URL and share it directly with recruiters and employers.',
    },
    {
        icon: ListChecks,
        title: 'Detailed Resume Sections',
        description:
            'Add multiple projects, education entries, skill categories, achievements, and certifications.',
    },
    {
        icon: Download,
        title: 'Download as PDF',
        description:
            'Save your selected resume template as a clean ATS-friendly PDF file.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Dashboard',
        description:
            'Use secure signup, login, JWT authentication, and manage all your resumes in one place.',
    },
]



function Home() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Navbar */}
            <header className="border-b border-slate-200 bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <a href="/" className="flex items-center gap-2">
                        <div className="rounded-xl bg-blue-600 p-2 text-white">
                            <FileText size={22} />
                        </div>
                        <span className="text-xl font-bold">AI Resume Builder</span>
                    </a>

                    <div className="hidden items-center gap-8 md:flex">
                        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                            Features
                        </a>
                        {/* <a href="#templates" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                            Templates
                        </a> */}
                        <Link
                            to="/templates"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600"
                        >
                            Templates
                        </Link>
                        <Link
                            to="/login"
                            className="font-medium text-slate-700 hover:text-blue-600"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero section */}
            <main>
                <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                            <Sparkles size={16} />
                            Build a better career today
                        </div>

                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            Create a resume that
                            <span className="block text-blue-600"> gets you hired.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            Create professional, ATS-friendly resumes in minutes. Use AI to
                            improve your content, select a template, and share your resume
                            with one simple link.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/register"
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                            >
                                Create My Resume
                                <ArrowRight size={19} />
                            </Link>

                            {/* <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">
                                View Templates
                            </button> */}

                            <Link
                                to="/templates"
                                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                            >
                                View Templates
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                No credit card needed
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                Easy to customize
                            </span>
                        </div>
                    </div>


                    {/* Resume preview card */}
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-200 via-indigo-100 to-violet-200 blur-2xl" />

                        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white p-3 shadow-2xl shadow-blue-200/70 sm:p-5">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                                            <FileText size={17} />
                                        </span>

                                        <div>
                                            <p className="text-xs font-semibold text-slate-900">
                                                Live Resume Preview
                                            </p>
                                            <p className="text-[10px] text-slate-500">
                                                Changes saved automatically
                                            </p>
                                        </div>
                                    </div>

                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700">
                                        ATS Ready
                                    </span>
                                </div>

                                <div className="mt-5 rounded-xl bg-white p-5 shadow-sm sm:p-6">
                                    <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                                            AS
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-xl font-bold text-slate-900">
                                                Ashutosh Sarathe
                                            </h2>

                                            <p className="mt-1 text-sm font-semibold text-blue-600">
                                                Full Stack Developer
                                            </p>

                                            <p className="mt-2 text-xs text-slate-500">
                                                Bhopal, India · Open to Work
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                                Professional Summary
                                            </h3>

                                            <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-600">
                                                <Sparkles size={12} />
                                                AI Enhanced
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Full Stack Developer skilled in building scalable web applications
                                            with React, Node.js, MongoDB, and AI-powered features.
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                            Technical Skills
                                        </h3>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                                                React.js
                                            </span>
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                                                Node.js
                                            </span>
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                                                MongoDB
                                            </span>
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                                                Gemini AI
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">
                                                    AI Resume Builder
                                                </p>
                                                <p className="mt-1 text-[10px] text-slate-500">
                                                    React · Node.js · MongoDB · Gemini AI
                                                </p>
                                            </div>

                                            <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between px-1">
                                    <span className="text-[10px] font-medium text-slate-500">
                                        Template: <span className="font-bold text-slate-700">ATS Classic</span>
                                    </span>

                                    <span className="text-[10px] font-bold text-blue-600">
                                        Resume Score: 92%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-5 -left-5 rounded-xl border border-violet-100 bg-white px-4 py-3 shadow-xl shadow-violet-100">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                                    <Sparkles size={17} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-slate-800">AI Improvement</p>
                                    <p className="text-[10px] text-slate-500">
                                        8 suggestions applied
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Features section */}
                <section id="features" className="border-t border-slate-200 bg-white px-6 py-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="font-semibold text-blue-600">WHY USE OUR PLATFORM?</p>
                            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                Everything you need for a strong resume
                            </h2>
                        </div>

                        {/* <div className="mt-12 grid gap-6 md:grid-cols-3"> */}
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {features.map(({ icon: Icon, title, description }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-600">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold">{title}</h3>
                                    <p className="mt-3 leading-7 text-slate-600">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )


}

export default Home