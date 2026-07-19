import { FileText, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <div className="rounded-xl bg-blue-600 p-2 text-white">
                            <FileText size={21} />
                        </div>
                        <span className="text-lg font-bold text-white">
                            AI Resume Builder
                        </span>
                    </Link>

                    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                        Build ATS-friendly resumes, optimize your content with AI, and
                        share your professional profile with recruiters.
                    </p>

                    <div className="mt-5">
                        <p className="text-sm font-semibold text-white">
                            Built by Ashutosh Sarathe
                        </p>

                        <div className="mt-3 flex items-center gap-3 text-sm">
                            <a
                                href="https://www.linkedin.com/in/ashutosh-sarathe-a80922338/"
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                            >
                                LinkedIn
                            </a>

                            <span className="text-slate-600">|</span>

                            <a
                                href="https://github.com/Ashutoshsarathe"
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-white">Explore</h3>

                    <div className="mt-4 flex flex-col gap-3 text-sm">
                        <a href="#features" className="hover:text-blue-400">
                            Features
                        </a>

                        <Link to="/templates" className="hover:text-blue-400">
                            Templates
                        </Link>

                        <Link to="/upload-resume" className="hover:text-blue-400">
                            Upload Resume
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-white">Get Started</h3>

                    <div className="mt-4 flex flex-col gap-3 text-sm">
                        <Link to="/register" className="hover:text-blue-400">
                            Create Account
                        </Link>

                        <Link to="/login" className="hover:text-blue-400">
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="font-semibold text-blue-400 hover:text-blue-300"
                        >
                            Create Your Resume →
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} AI Resume Builder. All rights
                        reserved.
                    </p>

                    <p className="flex items-center gap-1">
                        Built with <Heart size={14} className="fill-red-500 text-red-500" />{' '}
                        using React, Node.js, MongoDB & Gemini AI
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer






































// import { FileText, Heart } from 'lucide-react'
// import { Link } from 'react-router-dom'

// function Footer() {
//     return (
//         <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
//             <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
//                 <div>
//                     <Link to="/" className="flex items-center gap-2">
//                         <div className="rounded-xl bg-blue-600 p-2 text-white">
//                             <FileText size={21} />
//                         </div>
//                         <span className="text-lg font-bold text-white">
//                             AI Resume Builder
//                         </span>
//                     </Link>

//                     <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
//                         Build ATS-friendly resumes, optimize your content with AI, and
//                         share your professional profile with recruiters.
//                     </p>
//                 </div>

//                 <div>
//                     <h3 className="font-bold text-white">Explore</h3>

//                     <div className="mt-4 flex flex-col gap-3 text-sm">
//                         <a href="#features" className="hover:text-blue-400">
//                             Features
//                         </a>

//                         <Link to="/templates" className="hover:text-blue-400">
//                             Templates
//                         </Link>

//                         <Link to="/upload-resume" className="hover:text-blue-400">
//                             Upload Resume
//                         </Link>
//                     </div>
//                 </div>

//                 <div>
//                     <h3 className="font-bold text-white">Get Started</h3>

//                     <div className="mt-4 flex flex-col gap-3 text-sm">
//                         <Link to="/register" className="hover:text-blue-400">
//                             Create Account
//                         </Link>

//                         <Link to="/login" className="hover:text-blue-400">
//                             Login
//                         </Link>

//                         <Link
//                             to="/register"
//                             className="font-semibold text-blue-400 hover:text-blue-300"
//                         >
//                             Create Your Resume →
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             <div className="border-t border-slate-800">
//                 <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
//                     <p>
//                         © {new Date().getFullYear()} AI Resume Builder. All rights
//                         reserved.
//                     </p>

//                     <p className="flex items-center gap-1">
//                         Built with <Heart size={14} className="fill-red-500 text-red-500" />{' '}
//                         using React, Node.js, MongoDB & Gemini AI
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer