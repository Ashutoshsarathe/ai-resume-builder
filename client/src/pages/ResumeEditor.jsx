import { useEffect, useRef, useState } from 'react'
import {
    ArrowLeft,
    Check,
    Download,
    FileText,
    LayoutTemplate,
    Save,
    Sparkles,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import API_URL from '../config'

const initialResume = {
    title: 'Frontend Developer Resume',
    fullName: 'Aarav Sharma',
    jobTitle: 'Frontend Developer',
    email: 'aarav@example.com',
    linkedinUrl: '',
    githubProfileUrl: '',
    phone: '+91 98765 43210',
    location: 'Bhopal, Madhya Pradesh',
    summary:
        'Creative frontend developer with experience building fast, responsive, and user-friendly web applications using React and modern JavaScript.',
    role: 'Frontend Developer',
    company: 'Tech Solutions Pvt. Ltd.',
    startDate: 'Jan 2024',
    endDate: 'Present',
    description:
        'Developed responsive web interfaces using React and Tailwind CSS. Collaborated with designers and backend developers to deliver high-quality products.',
    degree: 'Bachelor of Technology in Computer Science',
    institute: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya',
    graduationYear: '2024',
    educationDetails: [
        {
            degree: 'Bachelor of Technology in Computer Science',
            institute: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya',
            year: '2024',
            score: '',
            location: '',
        },
    ],
    skills: 'React, JavaScript, Tailwind CSS, Node.js, MongoDB, Git',
    skillCategories: {
        programmingLanguages: '',
        frontend: 'React.js, JavaScript, HTML5, CSS3, Tailwind CSS',
        backend: 'Node.js, Express.js, REST APIs, JWT',
        database: 'MongoDB, MySQL',
        tools: 'Git, GitHub, Postman, VS Code, Render, Vercel',
        coreSubjects: 'DSA, OOP, DBMS, OS, Computer Networks',
        otherSkills: '',
    },
    projects: '',
    projectDetails: [
        {
            title: '',
            techStack: '',
            description: '',
            githubUrl: '',
            liveUrl: '',
        },
    ],
    achievements: '',
    certifications: '',
}

function InputField({ label, name, value, onChange, placeholder }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </span>

            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
        </label>
    )
}

function ResumeEditor() {
    const navigate = useNavigate()
    const { id } = useParams()
    const previewRef = useRef(null)

    const [resume, setResume] = useState(initialResume)
    // const [template, setTemplate] = useState('modern')
    const [template, setTemplate] = useState('classic')
    const [saved, setSaved] = useState(false)
    const [resumeId, setResumeId] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const [isImproving, setIsImproving] = useState('')

    useEffect(() => {
        const loadResume = async () => {
            if (!id) {
                return
            }

            const token = localStorage.getItem('token')

            if (!token) {
                navigate('/login')
                return
            }

            try {
                const response = await fetch(
                    // `http://localhost:5000/api/resumes/${id}`,
                    `${API_URL}/api/resumes/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Unable to load resume.')
                }

                setResume({
                    ...initialResume,
                    ...data.resume,

                    projectDetails:
                        data.resume.projectDetails?.length > 0
                            ? data.resume.projectDetails
                            : initialResume.projectDetails,

                    educationDetails:
                        data.resume.educationDetails?.length > 0
                            ? data.resume.educationDetails
                            : [
                                {
                                    degree: data.resume.degree || '',
                                    institute: data.resume.institute || '',
                                    year: data.resume.graduationYear || '',
                                    score: '',
                                    location: '',
                                },
                            ],
                })

                // setTemplate(data.resume.template || 'modern')
                setTemplate(data.resume.template || 'classic')
                setResumeId(data.resume._id)
                setSaved(true)
            } catch (error) {
                alert(error.message)
                navigate('/dashboard')
            }
        }

        loadResume()
    }, [id, navigate])


    useEffect(() => {
        if (id) {
            return
        }

        const uploadedResumeData = localStorage.getItem('uploadedResumeData')

        // if (!uploadedResumeData) {
        //     return
        // }
        if (!uploadedResumeData) {
            const savedUser = JSON.parse(localStorage.getItem('user') || '{}')

            setResume({
                ...initialResume,
                title: savedUser.name
                    ? `Resume of ${savedUser.name}`
                    : initialResume.title,
                fullName: savedUser.name || initialResume.fullName,
                email: savedUser.email || initialResume.email,
            })

            return
        }

        try {
            const parsedResumeData = JSON.parse(uploadedResumeData)

            setResume({
                ...initialResume,
                ...parsedResumeData,

                title: parsedResumeData.title || 'Imported Resume',

                projectDetails:
                    parsedResumeData.projectDetails?.length > 0
                        ? parsedResumeData.projectDetails
                        : initialResume.projectDetails,

                educationDetails:
                    parsedResumeData.educationDetails?.length > 0
                        ? parsedResumeData.educationDetails
                        : initialResume.educationDetails,
            })

            // setTemplate('modern')
            setTemplate('classic')
            setSaved(false)

            localStorage.removeItem('uploadedResumeData')
        } catch (error) {
            console.error('Unable to load uploaded resume data.')
        }
    }, [id])

    const updateField = (event) => {
        const { name, value } = event.target

        setResume((previousResume) => ({
            ...previousResume,
            [name]: value,
        }))

        setSaved(false)
    }

    const updateSkillCategory = (category, value) => {
        setResume((previousResume) => ({
            ...previousResume,
            skillCategories: {
                ...previousResume.skillCategories,
                [category]: value,
            },
        }))

        setSaved(false)
    }

    const updateProject = (index, field, value) => {
        setResume((previousResume) => {
            const updatedProjects = [...previousResume.projectDetails]

            updatedProjects[index] = {
                ...updatedProjects[index],
                [field]: value,
            }

            return {
                ...previousResume,
                projectDetails: updatedProjects,
            }
        })

        setSaved(false)
    }

    const addProject = () => {
        setResume((previousResume) => ({
            ...previousResume,
            projectDetails: [
                ...previousResume.projectDetails,
                {
                    title: '',
                    techStack: '',
                    description: '',
                    githubUrl: '',
                    liveUrl: '',
                },
            ],
        }))

        setSaved(false)
    }

    const removeProject = (index) => {
        setResume((previousResume) => ({
            ...previousResume,
            projectDetails: previousResume.projectDetails.filter(
                (_, projectIndex) => projectIndex !== index
            ),
        }))

        setSaved(false)
    }
    const updateEducation = (index, field, value) => {
        setResume((previousResume) => {
            const updatedEducation = [...previousResume.educationDetails]

            updatedEducation[index] = {
                ...updatedEducation[index],
                [field]: value,
            }

            return {
                ...previousResume,
                educationDetails: updatedEducation,
            }
        })

        setSaved(false)
    }

    const addEducation = () => {
        setResume((previousResume) => ({
            ...previousResume,
            educationDetails: [
                ...previousResume.educationDetails,
                {
                    degree: '',
                    institute: '',
                    year: '',
                    score: '',
                    location: '',
                },
            ],
        }))

        setSaved(false)
    }

    const removeEducation = (index) => {
        setResume((previousResume) => ({
            ...previousResume,
            educationDetails: previousResume.educationDetails.filter(
                (_, educationIndex) => educationIndex !== index
            ),
        }))

        setSaved(false)
    }



    const handleSave = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        setIsSaving(true)


        // `http://localhost:5000/api/resumes/${resumeId}`
        // 'http://localhost:5000/api/resumes'


        try {
            const endpoint = resumeId
                ? `${API_URL}/api/resumes/${resumeId}`
                : `${API_URL}/api/resumes`

            const response = await fetch(endpoint, {
                method: resumeId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...resume,
                    template,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Unable to save resume.')
            }

            setResumeId(data.resume._id)
            setSaved(true)

            alert('Resume saved successfully to MongoDB!')
        } catch (error) {
            alert(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    const handleImproveWithAI = async (field, section) => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        const content = resume[field]

        if (!content || !content.trim()) {
            alert(`Please write your ${section} first.`)
            return
        }

        setIsImproving(field)

        try {
            const response = await fetch(
                // 'http://localhost:5000/api/ai/improve',
                `${API_URL}/api/ai/improve`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        content,
                        section,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'AI could not improve this content.')
            }

            setResume((previousResume) => ({
                ...previousResume,
                [field]: data.improvedText,
            }))

            setSaved(false)
        } catch (error) {
            alert(error.message)
        } finally {
            setIsImproving('')
        }
    }


    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Please upload an image smaller than 5 MB.')
            return
        }

        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        const formData = new FormData()

        formData.append('image', file)
        formData.append('removeBackground', String(removeBackground))

        setIsUploading(true)

        try {
            const response = await fetch(
                // 'http://localhost:5000/api/images/profile-image',
                `${API_URL}/api/images/profile-image`,
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
                throw new Error(data.message || 'Unable to upload image.')
            }

            setResume((previousResume) => ({
                ...previousResume,
                profileImage: data.imageUrl,
            }))

            setSaved(false)

            alert('Profile image uploaded successfully!')
        } catch (error) {
            alert(error.message)
        } finally {
            setIsUploading(false)
            event.target.value = ''
        }
    }

    const handleImproveProjectDescription = async (index) => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/login')
            return
        }

        const content = resume.projectDetails[index].description

        if (!content || !content.trim()) {
            alert('Please write project description first.')
            return
        }

        setIsImproving(`project-${index}`)

        try {
            const response = await fetch(
                // 'http://localhost:5000/api/ai/improve',
                `${API_URL}/api/ai/improve`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        content,
                        section: 'project description',
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'AI could not improve project description.')
            }

            updateProject(index, 'description', data.improvedText)
        } catch (error) {
            alert(error.message)
        } finally {
            setIsImproving('')
        }
    }


    // const handleDownloadPDF = async () => {
    //     if (!previewRef.current) {
    //         return
    //     }

    //     try {
    //         const html2pdfModule = await import('html2pdf.js')
    //         const html2pdf = html2pdfModule.default

    //         const fileName = (resume.fullName || 'resume')
    //             .trim()
    //             .replace(/\s+/g, '-')
    //             .toLowerCase()

    //         html2pdf()
    //             .set({
    //                 margin: 0,
    //                 filename: `${fileName}-resume.pdf`,
    //                 image: {
    //                     type: 'jpeg',
    //                     quality: 0.98,
    //                 },
    //                 html2canvas: {
    //                     scale: 2,
    //                     useCORS: true,
    //                 },
    //                 jsPDF: {
    //                     unit: 'mm',
    //                     format: 'a4',
    //                     orientation: 'portrait',
    //                 },
    //                 pagebreak: {
    //                     mode: ['css', 'legacy'],
    //                 },
    //             })
    //             .from(previewRef.current)
    //             .save()
    //     } catch (error) {
    //         alert('Unable to download PDF. Please try again.')
    //     }
    // }

    const handleDownloadPDF = () => {
        window.print()
    }







    return (
        <div className="min-h-screen bg-slate-100">
            {/* <header className="sticky top-0 z-20 border-b border-slate-200 bg-white"> */}
            <header
                id="editor-header"
                className="sticky top-0 z-20 border-b border-slate-200 bg-white"
            >
                <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/dashboard"
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft size={21} />
                        </Link>

                        <div className="hidden items-center gap-2 sm:flex">
                            <div className="rounded-lg bg-blue-600 p-2 text-white">
                                <FileText size={19} />
                            </div>
                            <span className="font-bold">AI Resume Builder</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-xs font-medium text-slate-500">Editing</p>
                        <h1 className="font-bold text-slate-900">{resume.title}</h1>
                    </div>

                    {/* <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${saved
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                            } ${isSaving ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                        {saved && !isSaving ? <Check size={18} /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : saved ? 'Saved to MongoDB' : 'Save Resume'}
                    </button> */}

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${saved
                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                                } ${isSaving ? 'cursor-not-allowed opacity-70' : ''}`}
                        >
                            {saved && !isSaving ? <Check size={18} /> : <Save size={18} />}
                            {isSaving ? 'Saving...' : saved ? 'Saved to MongoDB' : 'Save Resume'}
                        </button>
                    </div>
                </div>
            </header>

            {/* <main className="mx-auto grid max-w-[1600px] gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:p-6"> */}
            <main
                id="editor-main"
                className="mx-auto grid max-w-[1600px] gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:p-6"
            >
                {/* Left form area */}
                {/* <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7"> */}
                <section
                    id="editor-form"
                    className="rounded-2xl bg-white p-5 shadow-sm sm:p-7"
                >
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm font-semibold text-blue-600">
                                RESUME EDITOR
                            </p>
                            <h2 className="mt-1 text-2xl font-bold">Build your resume</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Changes appear instantly in the live preview.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
                            <Sparkles size={17} />
                            AI Ready
                        </div>
                    </div>

                    <div className="mt-7 space-y-9">
                        <section>
                            <h3 className="mb-5 text-lg font-bold">Resume Details</h3>

                            <InputField
                                label="Resume Title"
                                name="title"
                                value={resume.title}
                                onChange={updateField}
                                placeholder="Example: Frontend Developer Resume"
                            />
                        </section>



                        <section>
                            <h3 className="mb-5 text-lg font-bold">
                                Personal Information
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <InputField
                                    label="Full Name"
                                    name="fullName"
                                    value={resume.fullName}
                                    onChange={updateField}
                                    placeholder="Your full name"
                                />

                                <InputField
                                    label="Professional Title"
                                    name="jobTitle"
                                    value={resume.jobTitle}
                                    onChange={updateField}
                                    placeholder="Example: Frontend Developer"
                                />

                                <InputField
                                    label="Email Address"
                                    name="email"
                                    value={resume.email}
                                    onChange={updateField}
                                    placeholder="you@example.com"
                                />

                                <InputField
                                    label="Phone Number"
                                    name="phone"
                                    value={resume.phone}
                                    onChange={updateField}
                                    placeholder="+91 98765 43210"
                                />
                                <InputField
                                    label="LinkedIn Profile URL"
                                    name="linkedinUrl"
                                    value={resume.linkedinUrl || ''}
                                    onChange={updateField}
                                    placeholder="https://www.linkedin.com/in/your-profile"
                                />

                                <InputField
                                    label="GitHub Profile URL"
                                    name="githubProfileUrl"
                                    value={resume.githubProfileUrl || ''}
                                    onChange={updateField}
                                    placeholder="https://github.com/your-username"
                                />

                                <div className="sm:col-span-2">
                                    <InputField
                                        label="Location"
                                        name="location"
                                        value={resume.location}
                                        onChange={updateField}
                                        placeholder="City, State"
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="mb-5 text-lg font-bold">
                                Professional Summary
                            </h3>

                            <textarea
                                name="summary"
                                value={resume.summary}
                                onChange={updateField}
                                rows="5"
                                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Write a short professional summary..."
                            />
                            <div className="mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleImproveWithAI('summary', 'professional summary')}
                                    disabled={isImproving === 'summary'}
                                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
                                >
                                    <Sparkles size={16} />
                                    {isImproving === 'summary'
                                        ? 'Improving with AI...'
                                        : 'Improve Summary with AI'}
                                </button>
                            </div>
                        </section>

                        <section>
                            <h3 className="mb-5 text-lg font-bold">Work Experience</h3>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <InputField
                                    label="Job Role"
                                    name="role"
                                    value={resume.role}
                                    onChange={updateField}
                                    placeholder="Example: Frontend Developer"
                                />

                                <InputField
                                    label="Company Name"
                                    name="company"
                                    value={resume.company}
                                    onChange={updateField}
                                    placeholder="Company name"
                                />

                                <InputField
                                    label="Start Date"
                                    name="startDate"
                                    value={resume.startDate}
                                    onChange={updateField}
                                    placeholder="Example: Jan 2024"
                                />

                                <InputField
                                    label="End Date"
                                    name="endDate"
                                    value={resume.endDate}
                                    onChange={updateField}
                                    placeholder="Present"
                                />
                            </div>

                            <textarea
                                name="description"
                                value={resume.description}
                                onChange={updateField}
                                rows="4"
                                className="mt-5 w-full resize-none rounded-lg border border-slate-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Describe your responsibilities and achievements..."
                            />
                        </section>


                        <section>
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="mb-3 text-lg font-bold">Education</h3>

                                <button
                                    type="button"
                                    onClick={addEducation}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    + Add Another Education
                                </button>
                            </div>

                            <p className="mb-4 text-sm text-slate-500">
                                Add Graduation, Class 12th, Class 10th, Diploma, or any other education.
                            </p>

                            <div className="space-y-5">
                                {resume.educationDetails.map((education, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="font-bold text-slate-800">
                                                Education {index + 1}
                                            </h4>

                                            {resume.educationDetails.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeEducation(index)}
                                                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <InputField
                                                label="Degree / Course"
                                                name={`education-degree-${index}`}
                                                value={education.degree}
                                                onChange={(event) =>
                                                    updateEducation(index, 'degree', event.target.value)
                                                }
                                                placeholder="Example: Class 12th (CBSE)"
                                            />

                                            <InputField
                                                label="School / College / University"
                                                name={`education-institute-${index}`}
                                                value={education.institute}
                                                onChange={(event) =>
                                                    updateEducation(index, 'institute', event.target.value)
                                                }
                                                placeholder="Example: Lakshmi Narain College"
                                            />
                                        </div>

                                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                            <InputField
                                                label="Passing Year"
                                                name={`education-year-${index}`}
                                                value={education.year}
                                                onChange={(event) =>
                                                    updateEducation(index, 'year', event.target.value)
                                                }
                                                placeholder="2024"
                                            />

                                            <InputField
                                                label="Percentage / CGPA"
                                                name={`education-score-${index}`}
                                                value={education.score}
                                                onChange={(event) =>
                                                    updateEducation(index, 'score', event.target.value)
                                                }
                                                placeholder="7.25 CGPA / 85%"
                                            />

                                            <InputField
                                                label="Location"
                                                name={`education-location-${index}`}
                                                value={education.location}
                                                onChange={(event) =>
                                                    updateEducation(index, 'location', event.target.value)
                                                }
                                                placeholder="Bhopal"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>



                        <section>
                            <h3 className="mb-3 text-lg font-bold">Technical Skills</h3>

                            <p className="mb-4 text-sm text-slate-500">
                                Har category mein apni skills comma se separate karke add karo.
                            </p>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <InputField
                                    label="Programming Languages"
                                    name="programmingLanguages"
                                    value={resume.skillCategories?.programmingLanguages || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('programmingLanguages', event.target.value)
                                    }
                                    placeholder="Java, Python, C++, C, JavaScript, SQL"
                                />


                                <InputField
                                    label="Frontend Skills"
                                    name="frontendSkills"
                                    value={resume.skillCategories?.frontend || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('frontend', event.target.value)
                                    }
                                    placeholder="React.js, JavaScript, HTML5, CSS3, Tailwind CSS"
                                />

                                <InputField
                                    label="Backend Skills"
                                    name="backendSkills"
                                    value={resume.skillCategories?.backend || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('backend', event.target.value)
                                    }
                                    placeholder="Node.js, Express.js, REST APIs, JWT"
                                />

                                <InputField
                                    label="Database Skills"
                                    name="databaseSkills"
                                    value={resume.skillCategories?.database || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('database', event.target.value)
                                    }
                                    placeholder="MongoDB, MySQL"
                                />

                                <InputField
                                    label="Tools & Platforms"
                                    name="toolsSkills"
                                    value={resume.skillCategories?.tools || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('tools', event.target.value)
                                    }
                                    placeholder="Git, GitHub, Postman, VS Code, Render, Vercel"
                                />

                                <InputField
                                    label="Core Subjects"
                                    name="coreSubjects"
                                    value={resume.skillCategories?.coreSubjects || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('coreSubjects', event.target.value)
                                    }
                                    placeholder="DSA, OOP, DBMS, OS, Computer Networks"
                                />

                                <InputField
                                    label="Other Skills"
                                    name="otherSkills"
                                    value={resume.skillCategories?.otherSkills || ''}
                                    onChange={(event) =>
                                        updateSkillCategory('otherSkills', event.target.value)
                                    }
                                    placeholder="Java, Python, Google Gemini AI, Prompt Engineering"
                                />
                            </div>
                        </section>


                        <section>
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="mb-3 text-lg font-bold">Projects</h3>

                                <button
                                    type="button"
                                    onClick={addProject}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    + Add Another Project
                                </button>
                            </div>

                            <p className="mb-4 text-sm text-slate-500">
                                Add project name, tech stack, description, GitHub link, and live demo link.
                            </p>

                            <div className="space-y-5">
                                {resume.projectDetails.map((project, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="font-bold text-slate-800">
                                                Project {index + 1}
                                            </h4>

                                            {resume.projectDetails.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeProject(index)}
                                                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <InputField
                                                label="Project Name"
                                                name={`project-title-${index}`}
                                                value={project.title}
                                                onChange={(event) =>
                                                    updateProject(index, 'title', event.target.value)
                                                }
                                                placeholder="Example: AI Resume Builder"
                                            />

                                            <InputField
                                                label="Tech Stack"
                                                name={`project-tech-${index}`}
                                                value={project.techStack}
                                                onChange={(event) =>
                                                    updateProject(index, 'techStack', event.target.value)
                                                }
                                                placeholder="React, Node.js, MongoDB, Gemini AI"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-semibold text-slate-700">
                                                    Project Description
                                                </span>

                                                <textarea
                                                    value={project.description}
                                                    onChange={(event) =>
                                                        updateProject(index, 'description', event.target.value)
                                                    }
                                                    rows="3"
                                                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                    placeholder="Describe your project, features, responsibilities, and impact..."
                                                />

                                                <div className="mt-3 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImproveProjectDescription(index)}
                                                        disabled={isImproving === `project-${index}`}
                                                        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
                                                    >
                                                        <Sparkles size={16} />
                                                        {isImproving === `project-${index}`
                                                            ? 'Improving with AI...'
                                                            : 'Improve Description with AI'}
                                                    </button>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                            <InputField
                                                label="GitHub Link"
                                                name={`project-github-${index}`}
                                                value={project.githubUrl}
                                                onChange={(event) =>
                                                    updateProject(index, 'githubUrl', event.target.value)
                                                }
                                                placeholder="https://github.com/username/project"
                                            />

                                            <InputField
                                                label="Live Demo Link"
                                                name={`project-live-${index}`}
                                                value={project.liveUrl}
                                                onChange={(event) =>
                                                    updateProject(index, 'liveUrl', event.target.value)
                                                }
                                                placeholder="https://your-project-demo.com"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-bold">Achievements</h3>

                            <p className="mb-3 text-sm text-slate-500">
                                Add one achievement per line.
                            </p>

                            <textarea
                                name="achievements"
                                value={resume.achievements || ''}
                                onChange={updateField}
                                rows="3"
                                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Won first prize in college hackathon&#10;Solved 200+ DSA problems"
                            />



                            {/* ai features */}

                            <div className="mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleImproveWithAI('achievements', 'achievements')}
                                    disabled={isImproving === 'achievements'}
                                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
                                >
                                    <Sparkles size={16} />
                                    {isImproving === 'achievements'
                                        ? 'Improving with AI...'
                                        : 'Improve Achievements with AI'}
                                </button>
                            </div>





                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-bold">Certifications</h3>

                            <p className="mb-3 text-sm text-slate-500">
                                Add one certification per line.
                            </p>

                            <textarea
                                name="certifications"
                                value={resume.certifications || ''}
                                onChange={updateField}
                                rows="3"
                                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Meta Front-End Developer Certificate&#10;JavaScript Certification"
                            />

                            {/* ai features */}


                            <div className="mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleImproveWithAI('certifications', 'certifications')}
                                    disabled={isImproving === 'certifications'}
                                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
                                >
                                    <Sparkles size={16} />
                                    {isImproving === 'certifications'
                                        ? 'Improving with AI...'
                                        : 'Improve Certifications with AI'}
                                </button>
                            </div>
                        </section>
                    </div>
                </section>

                {/* Right preview area */}


                {/* <aside className="lg:sticky lg:top-24 lg:h-fit"> */}

                <aside
                    id="preview-container"
                    className="lg:sticky lg:top-24 lg:h-fit"
                >
                    <div className="mb-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2 font-bold">
                            <LayoutTemplate size={20} className="text-blue-600" />
                            Resume Template
                        </div>

                        <select
                            value={template}
                            onChange={(event) => {
                                setTemplate(event.target.value)
                                setSaved(false)
                            }}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500"
                        >
                            {/* <option value="modern">Modern Blue</option>
                            <option value="classic">Classic Black</option> */}
                            <option value="classic">Classic Black</option>
                            <option value="modern">Modern Blue</option>
                            <option value="minimal">Minimal Clean</option>
                            <option value="professional">Professional Sidebar</option>
                        </select>
                    </div>

                    <p className="mb-3 text-center text-sm font-medium text-slate-500">
                        Live Preview
                    </p>

                    {/* <ResumePreview resume={resume} template={template} /> */}
                    {/* <div ref={previewRef}> */}
                    <div id="resume-preview" ref={previewRef}>
                        <ResumePreview resume={resume} template={template} />
                    </div>
                </aside>
            </main>
        </div>
    )
}

export default ResumeEditor