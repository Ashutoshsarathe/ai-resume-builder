import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import API_URL from '../config'

function PublicResume() {
    const { publicId } = useParams()

    const [resume, setResume] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')



    // `http://localhost:5000/api/resumes/public/${publicId}`

    useEffect(() => {
        const fetchPublicResume = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/resumes/public/${publicId}`
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Resume not found.')
                }

                setResume(data.resume)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPublicResume()
    }, [publicId])

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="font-semibold text-slate-600">Loading resume...</p>
            </main>
        )
    }

    if (error || !resume) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
                <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Resume not available
                    </h1>
                    <p className="mt-3 text-slate-600">
                        This resume link is private, invalid, or no longer available.
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Go to Home
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-100 py-8">
            <header className="mx-auto mb-6 flex max-w-4xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2">
                    <div className="rounded-xl bg-blue-600 p-2 text-white">
                        <FileText size={20} />
                    </div>
                    <span className="font-bold text-slate-900">AI Resume Builder</span>
                </Link>

                <p className="text-sm font-medium text-slate-500">Public Resume</p>
            </header>

            <section className="mx-auto max-w-4xl px-4">
                <ResumePreview resume={resume} template={resume.template} />
            </section>
        </main>
    )
}

export default PublicResume