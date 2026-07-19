import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const templates = [
    {
        id: 'classic',
        name: 'Classic Black',
        description: 'ATS-friendly single-column format for placement and corporate resumes.',
        badge: 'Most Popular',
    },
    {
        id: 'modern',
        name: 'Modern Blue',
        description: 'Modern blue header with a clean professional appearance.',
        badge: 'Modern',
    },
    {
        id: 'minimal',
        name: 'Minimal Clean',
        description: 'Minimal and elegant two-column resume for freshers and developers.',
        badge: 'Clean',
    },
    {
        id: 'professional',
        name: 'Professional Sidebar',
        description: 'Professional sidebar layout for corporate and technical profiles.',
        badge: 'Professional',
    },
]

function TemplateThumbnail({ type }) {
    if (type === 'classic') {
        return (
            <div className="h-72 bg-white p-5 font-serif text-[8px] text-slate-800 shadow-inner">
                <div className="border-b border-slate-500 pb-2 text-center">
                    <p className="text-sm font-bold">ALEX JOHNSON</p>
                    <p className="mt-1 text-[7px] text-slate-500">
                        email@example.com | +91 98765 43210 | Bhopal
                    </p>
                </div>

                <div className="mt-3 space-y-3">
                    <div>
                        <p className="border-b border-slate-400 pb-1 font-bold text-blue-700">
                            SUMMARY
                        </p>
                        <div className="mt-1 h-1.5 rounded bg-slate-200" />
                        <div className="mt-1 h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>

                    <div>
                        <p className="border-b border-slate-400 pb-1 font-bold text-blue-700">
                            TECHNICAL SKILLS
                        </p>
                        <div className="mt-1 h-1.5 rounded bg-slate-200" />
                        <div className="mt-1 h-1.5 w-5/6 rounded bg-slate-200" />
                    </div>

                    <div>
                        <p className="border-b border-slate-400 pb-1 font-bold text-blue-700">
                            PROJECTS
                        </p>
                        <div className="mt-1 h-1.5 w-2/3 rounded bg-slate-300" />
                        <div className="mt-1 h-1.5 rounded bg-slate-200" />
                        <div className="mt-1 h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>
                </div>
            </div>
        )
    }

    if (type === 'modern') {
        return (
            <div className="h-72 overflow-hidden bg-white shadow-inner">
                <div className="bg-blue-600 p-5 text-white">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20" />
                        <div>
                            <div className="h-3 w-20 rounded bg-white/80" />
                            <div className="mt-2 h-2 w-14 rounded bg-white/50" />
                        </div>
                    </div>
                    <div className="mt-4 h-2 w-44 rounded bg-white/40" />
                </div>

                <div className="space-y-4 p-5">
                    <div>
                        <div className="h-2 w-24 rounded bg-blue-600" />
                        <div className="mt-2 h-1.5 rounded bg-slate-200" />
                        <div className="mt-1 h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>

                    <div>
                        <div className="h-2 w-20 rounded bg-blue-600" />
                        <div className="mt-2 flex gap-1">
                            <span className="h-4 w-10 rounded bg-blue-100" />
                            <span className="h-4 w-12 rounded bg-blue-100" />
                            <span className="h-4 w-9 rounded bg-blue-100" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (type === 'minimal') {
        return (
            <div className="h-72 bg-white p-5 shadow-inner">
                <div className="border-b-4 border-blue-600 pb-3">
                    <div className="h-4 w-28 rounded bg-slate-900" />
                    <div className="mt-2 h-2 w-20 rounded bg-blue-600" />
                    <div className="mt-2 h-1.5 w-40 rounded bg-slate-200" />
                </div>

                <div className="mt-4 grid grid-cols-[1.4fr_0.8fr] gap-4">
                    <div className="space-y-4">
                        <div>
                            <div className="h-2 w-16 rounded bg-slate-900" />
                            <div className="mt-2 h-1.5 rounded bg-slate-200" />
                            <div className="mt-1 h-1.5 w-4/5 rounded bg-slate-200" />
                        </div>

                        <div>
                            <div className="h-2 w-20 rounded bg-slate-900" />
                            <div className="mt-2 h-1.5 rounded bg-slate-200" />
                            <div className="mt-1 h-1.5 w-5/6 rounded bg-slate-200" />
                        </div>
                    </div>

                    <div className="space-y-4 border-l border-slate-200 pl-3">
                        <div className="h-2 w-12 rounded bg-slate-900" />
                        <div className="h-1.5 rounded bg-slate-200" />
                        <div className="h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid h-72 grid-cols-[0.75fr_1.4fr] overflow-hidden bg-white shadow-inner">
            <div className="bg-slate-900 p-4">
                <div className="h-9 w-9 rounded-full bg-blue-600" />
                <div className="mt-4 h-2 w-16 rounded bg-white" />
                <div className="mt-2 h-1.5 w-12 rounded bg-blue-300" />

                <div className="mt-6 space-y-3">
                    <div className="h-1.5 rounded bg-slate-600" />
                    <div className="h-1.5 w-4/5 rounded bg-slate-600" />
                    <div className="h-1.5 w-3/4 rounded bg-slate-600" />
                </div>
            </div>

            <div className="p-5">
                <div className="h-2 w-24 rounded bg-blue-600" />
                <div className="mt-3 h-1.5 rounded bg-slate-200" />
                <div className="mt-1 h-1.5 w-4/5 rounded bg-slate-200" />

                <div className="mt-5 h-2 w-20 rounded bg-blue-600" />
                <div className="mt-3 h-1.5 rounded bg-slate-200" />
                <div className="mt-1 h-1.5 w-5/6 rounded bg-slate-200" />
                <div className="mt-1 h-1.5 w-3/4 rounded bg-slate-200" />
            </div>
        </div>
    )
}

function Templates() {
    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8">
            <div className="mx-auto max-w-7xl">
                <header className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-semibold text-slate-600 hover:text-blue-600"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-600 p-2 text-white">
                            <FileText size={20} />
                        </div>
                        <span className="font-bold text-slate-900">AI Resume Builder</span>
                    </div>
                </header>

                <section className="mt-12 text-center">
                    <p className="font-semibold text-blue-600">RESUME TEMPLATES</p>
                    <h1 className="mt-3 text-4xl font-bold text-slate-900">
                        Choose a template that fits your career
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        All templates are professionally designed, responsive, and
                        ATS-friendly.
                    </p>
                </section>

                <section className="mt-12 grid gap-7 md:grid-cols-2">
                    {templates.map((template) => (
                        <article
                            key={template.id}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <TemplateThumbnail type={template.id} />

                            <div className="p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {template.name}
                                    </h2>

                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                        {template.badge}
                                    </span>
                                </div>

                                <p className="mt-3 leading-6 text-slate-600">
                                    {template.description}
                                </p>

                                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-600">
                                    <CheckCircle2 size={17} className="text-emerald-500" />
                                    ATS-friendly layout
                                </div>

                                <Link
                                    to="/register"
                                    className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                >
                                    Use This Template
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    )
}

export default Templates