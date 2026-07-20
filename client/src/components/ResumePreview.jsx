import AtsClassicPreview from './AtsClassicPreview'
import MinimalTemplate from './MinimalTemplate'
import ProfessionalSidebarTemplate from './ProfessionalSidebarTemplate'
import ContactLinks from './ContactLinks'
import CertificationLinks from './CertificationLinks'

function ModernSection({ title, children }) {
    return (
        <section>
            <h2 className="border-b border-blue-200 pb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
        </section>
    )
}

function ResumePreview({ resume, template }) {
    if (template === 'classic') {
        return <AtsClassicPreview resume={resume} />
    }
    if (template === 'minimal') {
        return <MinimalTemplate resume={resume} />
    }
    if (template === 'professional') {
        return <ProfessionalSidebarTemplate resume={resume} />
    }

    const skills = (resume.skills || '')
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)

    const projectLines = (resume.projects || '')
        .split('\n')
        .map((project) => project.trim())
        .filter(Boolean)

    const detailedProjects = (resume.projectDetails || []).filter(
        (project) =>
            project.title ||
            project.techStack ||
            project.description ||
            project.githubUrl ||
            project.liveUrl
    )

    const detailedEducation = (resume.educationDetails || []).filter(
        (education) =>
            education.degree ||
            education.institute ||
            education.year ||
            education.score ||
            education.location
    )

    const educationItems =
        detailedEducation.length > 0
            ? detailedEducation
            : resume.degree || resume.institute
                ? [
                    {
                        degree: resume.degree,
                        institute: resume.institute,
                        year: resume.graduationYear,
                        score: '',
                        location: '',
                    },
                ]
                : []



    const skillCategoryItems = [
        {
            label: 'Programming Languages',
            value: resume.skillCategories?.programmingLanguages,
        },
        {
            label: 'Frontend',
            value: resume.skillCategories?.frontend,
        },
        {
            label: 'Backend',
            value: resume.skillCategories?.backend,
        },
        {
            label: 'Database',
            value: resume.skillCategories?.database,
        },
        {
            label: 'Tools',
            value: resume.skillCategories?.tools,
        },
        {
            label: 'Core Subjects',
            value: resume.skillCategories?.coreSubjects,
        },
        {
            label: 'Other Skills',
            value: resume.skillCategories?.otherSkills,
        },
    ].filter((item) => item.value && item.value.trim())

    const initials = resume.fullName
        ? resume.fullName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : 'AR'

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-slate-300/60">
            <div className="bg-blue-600 p-7 text-white">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                        {initials}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">{resume.fullName}</h1>
                        <p className="mt-1 text-sm text-white/85">{resume.jobTitle}</p>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/85">
                    {/* <span>{resume.email}</span>
                    <span>{resume.phone}</span>
                    <span>{resume.location}</span> */}
                    <div className="mt-5">
                        <ContactLinks resume={resume} dark />
                    </div>
                </div>
            </div>

            <div className="space-y-6 p-7 text-slate-700">
                {resume.summary && (
                    <ModernSection title="Professional Summary">
                        <p className="text-sm leading-6">{resume.summary}</p>
                    </ModernSection>
                )}

                {(resume.role || resume.company || resume.description) && (
                    <ModernSection title="Experience">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="font-bold">{resume.role}</h3>
                                <p className="text-sm font-medium text-slate-600">
                                    {resume.company}
                                </p>
                            </div>

                            <p className="text-right text-xs text-slate-500">
                                {resume.startDate} - {resume.endDate}
                            </p>
                        </div>

                        <p className="mt-2 text-sm leading-6">{resume.description}</p>
                    </ModernSection>
                )}

                {(detailedProjects.length > 0 || projectLines.length > 0) && (
                    <ModernSection title="Projects">
                        {detailedProjects.length > 0 ? (
                            <div className="space-y-4">
                                {detailedProjects.map((project, index) => (
                                    <div
                                        key={`project-${index}`}
                                        className="rounded-lg bg-slate-50 p-3"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <h3 className="font-bold">
                                                {project.title || `Project ${index + 1}`}
                                            </h3>

                                            <div className="flex gap-3 text-xs font-semibold text-blue-600">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}

                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {project.techStack && (
                                            <p className="mt-2 text-xs">
                                                <strong>Tech Stack:</strong> {project.techStack}
                                            </p>
                                        )}

                                        {project.description && (
                                            <p className="mt-2 text-sm leading-6">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="whitespace-pre-line text-sm leading-6">
                                {resume.projects}
                            </p>
                        )}
                    </ModernSection>
                )}

                {educationItems.length > 0 && (
                    <ModernSection title="Education">
                        <div className="space-y-3">
                            {educationItems.map((education, index) => (
                                <div
                                    key={`education-${index}`}
                                    className="flex items-start justify-between gap-3"
                                >
                                    <div>
                                        <h3 className="font-bold">{education.degree}</h3>

                                        <p className="text-sm text-slate-600">
                                            {education.institute}
                                            {education.location ? `, ${education.location}` : ''}
                                        </p>

                                        {education.score && (
                                            <p className="mt-1 text-xs text-slate-500">
                                                Score: {education.score}
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-500">{education.year}</p>
                                </div>
                            ))}
                        </div>
                    </ModernSection>
                )}

                {skills.length > 0 && (
                    // <ModernSection title="Skills">
                    //     <div className="flex flex-wrap gap-2">
                    //         {skills.map((skill) => (
                    //             <span
                    //                 key={skill}
                    //                 className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    //             >
                    //                 {skill}
                    //             </span>
                    //         ))}
                    //     </div>
                    // </ModernSection>


                    <ModernSection title="Technical Skills">
                        {skillCategoryItems.length > 0 ? (
                            <div className="space-y-2">
                                {skillCategoryItems.map((item) => (
                                    <p key={item.label} className="text-sm leading-6">
                                        <span className="font-bold text-blue-700">
                                            {item.label}:
                                        </span>{' '}
                                        {item.value}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </ModernSection>
                )}

                {resume.achievements && (
                    <ModernSection title="Achievements">
                        <p className="whitespace-pre-line text-sm leading-6">
                            {resume.achievements}
                        </p>
                    </ModernSection>
                )}

                {/* {resume.certifications && (
                    <ModernSection title="Certifications">
                        <p className="whitespace-pre-line text-sm leading-6">
                            {resume.certifications}
                        </p>
                    </ModernSection>
                )} */}

                {(resume.certifications ||
                    (resume.certificationDetails || []).length > 0) && (
                        <ModernSection title="Certifications">
                            <CertificationLinks
                                certificationDetails={resume.certificationDetails || []}
                                legacyCertifications={resume.certifications}
                            />
                        </ModernSection>
                    )}
            </div>
        </div>
    )
}

export default ResumePreview