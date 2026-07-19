import { useState } from 'react'
import {
    ArrowLeft,
    CheckCircle2,
    FileText,
    Sparkles,
    UploadCloud,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../config'

function UploadResume() {
    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState(null)
    const [extractedText, setExtractedText] = useState('')
    const [resumeData, setResumeData] = useState(null)
    const [error, setError] = useState('')
    const [isExtracting, setIsExtracting] = useState(false)
    const [isOptimizing, setIsOptimizing] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        const allowedFileTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]

        if (!allowedFileTypes.includes(file.type)) {
            setError('Please upload only PDF or DOCX resume files.')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5 MB.')
            return
        }

        setSelectedFile(file)
        setExtractedText('')
        setResumeData(null)
        setError('')
    }

    const handleExtractText = async () => {
        if (!selectedFile) {
            setError('Please select a resume file first.')
            return
        }

        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        const formData = new FormData()
        formData.append('resume', selectedFile)

        setIsExtracting(true)
        setError('')

        try {
            const response = await fetch(
                // 'http://localhost:5000/api/resume-upload/parse',
                `${API_URL}/api/resume-upload/parse`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to extract resume text.')
            }

            setExtractedText(data.extractedText)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsExtracting(false)
        }
    }

    const handleOptimizeWithAI = async () => {
        if (!extractedText) {
            setError('Please extract resume text first.')
            return
        }

        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        setIsOptimizing(true)
        setError('')

        try {
            const response = await fetch(
                // 'http://localhost:5000/api/ai/extract-resume',
                `${API_URL}/api/ai/extract-resume`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        extractedText,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to optimize resume with AI.')
            }

            setResumeData(data.resumeData)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsOptimizing(false)
        }
    }

    const handleOpenInEditor = () => {
        localStorage.setItem('uploadedResumeData', JSON.stringify(resumeData))
        navigate('/editor')
    }

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8 flex items-center justify-between">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 font-semibold text-slate-600 hover:text-blue-600"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-600 p-2 text-white">
                            <FileText size={20} />
                        </div>
                        <span className="font-bold text-slate-900">AI Resume Builder</span>
                    </div>
                </header>

                <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                            <UploadCloud size={28} />
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-slate-900">
                            Upload and Optimize Your Resume
                        </h1>

                        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                            Upload your existing PDF or DOCX resume. We will extract its
                            content and use AI to organize it for your new resume.
                        </p>
                    </div>

                    {error && (
                        <div className="mt-7 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                        <input
                            id="resume-file"
                            type="file"
                            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <label
                            htmlFor="resume-file"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            <UploadCloud size={20} />
                            Choose PDF or DOCX File
                        </label>

                        <p className="mt-4 text-sm text-slate-500">
                            Supported formats: PDF and DOCX · Maximum file size: 5 MB
                        </p>

                        {selectedFile && (
                            <div className="mx-auto mt-6 flex max-w-md items-center justify-between rounded-lg bg-white p-4 text-left shadow-sm">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-blue-600" size={22} />
                                    <div>
                                        <p className="max-w-48 truncate font-semibold text-slate-800">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleExtractText}
                                    disabled={isExtracting}
                                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                                >
                                    {isExtracting ? 'Extracting...' : 'Extract Text'}
                                </button>
                            </div>
                        )}
                    </div>

                    {extractedText && (
                        <section className="mt-8">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <h2 className="text-xl font-bold">Extracted Resume Text</h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Review the extracted text before using Gemini AI.
                                    </p>
                                </div>

                                <button
                                    onClick={handleOptimizeWithAI}
                                    disabled={isOptimizing}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
                                >
                                    <Sparkles size={19} />
                                    {isOptimizing
                                        ? 'AI is Optimizing...'
                                        : 'Extract Resume Data with AI'}
                                </button>
                            </div>

                            <textarea
                                value={extractedText}
                                onChange={(event) => setExtractedText(event.target.value)}
                                rows="12"
                                className="mt-4 w-full resize-y rounded-xl border border-slate-300 p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </section>
                    )}

                    {resumeData && (
                        <section className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle2
                                    size={24}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                />

                                <div>
                                    <h2 className="text-xl font-bold text-emerald-900">
                                        Resume Data Extracted Successfully
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-emerald-800">
                                        Gemini AI has organized your resume data. Open it in the
                                        editor to review, modify, select a template, and save it.
                                    </p>

                                    <button
                                        onClick={handleOpenInEditor}
                                        className="mt-5 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                                    >
                                        Open Data in Resume Editor
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </section>
            </div>
        </main>
    )
}

export default UploadResume