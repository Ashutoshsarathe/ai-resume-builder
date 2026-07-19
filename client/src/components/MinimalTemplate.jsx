import ContactLinks from './ContactLinks'

function MinimalSection({ title, children }) {
    return (
        <section className="mt-6">
            <h2 className="border-b-2 border-slate-900 pb-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
        </section>
    )
}

function MinimalTemplate({ resume }) {
    const skillCategories = [
        ['Programming Languages', resume.skillCategories?.programmingLanguages],
        ['Frontend', resume.skillCategories?.frontend],
        ['Backend', resume.skillCategories?.backend],
        ['Database', resume.skillCategories?.database],
        ['Tools', resume.skillCategories?.tools],
        ['Core Subjects', resume.skillCategories?.coreSubjects],
        ['Other Skills', resume.skillCategories?.otherSkills],
    ].filter((item) => item[1] && item[1].trim())

    const educationItems = (resume.educationDetails || []).filter(
        (education) =>
            education.degree ||
            education.institute ||
            education.year ||
            education.score ||
            education.location
    )

    const projects = (resume.projectDetails || []).filter(
        (project) =>
            project.title ||
            project.techStack ||
            project.description ||
            project.githubUrl ||
            project.liveUrl
    )

    const achievements = (resume.achievements || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

    const certifications = (resume.certifications || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

    return (
        <div className="min-h-[850px] bg-white p-8 font-sans text-slate-800 shadow-2xl shadow-slate-300/60 sm:p-10">
            <header className="border-b-4 border-blue-600 pb-5">
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-slate-900">
                    {resume.fullName}
                </h1>

                <p className="mt-2 text-base font-semibold text-blue-600">
                    {resume.jobTitle}
                </p>

                {/* <p className="mt-3 text-xs text-slate-600">
                    {[resume.email, resume.phone, resume.location]
                        .filter(Boolean)
                        .join('  |  ')}
                </p> */}
                <div className="mt-3">
                    <ContactLinks resume={resume} />
                </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
                <div>
                    {resume.summary && (
                        <MinimalSection title="Profile">
                            <p className="text-sm leading-6">{resume.summary}</p>
                        </MinimalSection>
                    )}

                    {(resume.role || resume.company || resume.description) && (
                        <MinimalSection title="Experience">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-bold">{resume.role}</h3>
                                    <p className="text-sm font-medium text-blue-600">
                                        {resume.company}
                                    </p>
                                </div>

                                <p className="text-xs text-slate-500">
                                    {resume.startDate} - {resume.endDate}
                                </p>
                            </div>

                            <p className="mt-2 text-sm leading-6">{resume.description}</p>
                        </MinimalSection>
                    )}

                    {projects.length > 0 && (
                        <MinimalSection title="Projects">
                            <div className="space-y-4">
                                {projects.map((project, index) => (
                                    <div key={`project-${index}`}>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <h3 className="font-bold">
                                                {project.title || `Project ${index + 1}`}
                                            </h3>

                                            <div className="flex gap-2 text-xs font-semibold text-blue-600">
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
                                            <p className="mt-1 text-xs">
                                                <strong>Tech:</strong> {project.techStack}
                                            </p>
                                        )}

                                        {project.description && (
                                            <p className="mt-1 text-sm leading-6">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </MinimalSection>
                    )}
                </div>

                <aside>
                    {skillCategories.length > 0 && (
                        <MinimalSection title="Skills">
                            <div className="space-y-2">
                                {skillCategories.map(([label, value]) => (
                                    <p key={label} className="text-xs leading-5">
                                        <strong>{label}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                        </MinimalSection>
                    )}

                    {educationItems.length > 0 && (
                        <MinimalSection title="Education">
                            <div className="space-y-3">
                                {educationItems.map((education, index) => (
                                    <div key={`education-${index}`}>
                                        <h3 className="text-sm font-bold">{education.degree}</h3>
                                        <p className="text-xs text-slate-600">
                                            {education.institute}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {education.year}
                                            {education.score ? ` · ${education.score}` : ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </MinimalSection>
                    )}

                    {(achievements.length > 0 || certifications.length > 0) && (
                        <MinimalSection title="Achievements">
                            <ul className="list-disc space-y-1 pl-4 text-xs leading-5">
                                {achievements.map((achievement, index) => (
                                    <li key={`achievement-${index}`}>{achievement}</li>
                                ))}

                                {certifications.map((certification, index) => (
                                    <li key={`certification-${index}`}>{certification}</li>
                                ))}
                            </ul>
                        </MinimalSection>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default MinimalTemplate