import ContactLinks from './ContactLinks'
import CertificationLinks from './CertificationLinks'

function SidebarSection({ title, children }) {
    return (
        <section className="mt-6">
            <h2 className="border-b border-white/30 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
        </section>
    )
}

function MainSection({ title, children }) {
    return (
        <section className="mt-6">
            <h2 className="border-b-2 border-blue-600 pb-1 text-sm font-bold uppercase tracking-wide text-slate-900">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
        </section>
    )
}

function ProfessionalSidebarTemplate({ resume }) {
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
        <div className="grid min-h-[850px] grid-cols-[0.85fr_1.65fr] overflow-hidden bg-white shadow-2xl shadow-slate-300/60">
            <aside className="bg-slate-900 p-6 text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                    {resume.fullName
                        ? resume.fullName
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()
                        : 'AR'}
                </div>

                <h1 className="mt-5 text-xl font-bold leading-tight">
                    {resume.fullName}
                </h1>

                <p className="mt-2 text-sm font-medium text-blue-300">
                    {resume.jobTitle}
                </p>

                {/* <SidebarSection title="Contact">
                    <div className="space-y-2 text-xs leading-5 text-slate-200">
                        <p>{resume.email}</p>
                        <p>{resume.phone}</p>
                        <p>{resume.location}</p>
                    </div>
                </SidebarSection> */}
                <SidebarSection title="Contact">
                    <ContactLinks resume={resume} dark />
                </SidebarSection>

                {skillCategories.length > 0 && (
                    <SidebarSection title="Skills">
                        <div className="space-y-3">
                            {skillCategories.map(([label, value]) => (
                                <div key={label}>
                                    <p className="text-xs font-bold text-white">{label}</p>
                                    <p className="mt-1 text-xs leading-5 text-slate-300">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}

                {educationItems.length > 0 && (
                    <SidebarSection title="Education">
                        <div className="space-y-4">
                            {educationItems.map((education, index) => (
                                <div key={`education-${index}`}>
                                    <p className="text-xs font-bold text-white">
                                        {education.degree}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-300">
                                        {education.institute}
                                    </p>
                                    <p className="mt-1 text-xs text-blue-200">
                                        {education.year}
                                        {education.score ? ` · ${education.score}` : ''}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SidebarSection>
                )}
            </aside>

            <main className="p-7 text-slate-700">
                {resume.summary && (
                    <MainSection title="Professional Summary">
                        <p className="text-sm leading-6">{resume.summary}</p>
                    </MainSection>
                )}

                {(resume.role || resume.company || resume.description) && (
                    <MainSection title="Experience">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="font-bold text-slate-900">{resume.role}</h3>
                                <p className="text-sm font-medium text-blue-600">
                                    {resume.company}
                                </p>
                            </div>

                            <p className="text-xs text-slate-500">
                                {resume.startDate} - {resume.endDate}
                            </p>
                        </div>

                        <p className="mt-2 text-sm leading-6">{resume.description}</p>
                    </MainSection>
                )}

                {projects.length > 0 && (
                    <MainSection title="Projects">
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div key={`project-${index}`}>
                                    <div className="flex flex-wrap justify-between gap-2">
                                        <h3 className="font-bold text-slate-900">
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
                    </MainSection>
                )}

                {/* {(achievements.length > 0 || certifications.length > 0) && (
                    <MainSection title="Achievements & Certifications">
                        <ul className="list-disc space-y-1 pl-4 text-sm leading-6">
                            {achievements.map((achievement, index) => (
                                <li key={`achievement-${index}`}>{achievement}</li>
                            ))}

                            {certifications.map((certification, index) => (
                                <li key={`certification-${index}`}>{certification}</li>
                            ))}
                        </ul>
                    </MainSection>
                )} */}
                {/* {(achievements.length > 0 ||
                    certifications.length > 0 ||
                    (resume.certificationDetails || []).length > 0) && (
                        <MainSection title="Achievements & Certifications">
                            {achievements.length > 0 && (
                                <ul className="list-disc space-y-1 pl-4 text-sm leading-6">
                                    {achievements.map((achievement, index) => (
                                        <li key={`achievement-${index}`}>{achievement}</li>
                                    ))}
                                </ul>
                            )}

                            <div className={achievements.length > 0 ? 'mt-3' : ''}>
                                <CertificationLinks
                                    certificationDetails={resume.certificationDetails || []}
                                    legacyCertifications={resume.certifications}
                                />
                            </div>
                        </MainSection>
                    )} */}

                {achievements.length > 0 && (
                    <MainSection title="Achievements">
                        <ul className="list-disc space-y-1 pl-4 text-sm leading-6">
                            {achievements.map((achievement, index) => (
                                <li key={`achievement-${index}`}>{achievement}</li>
                            ))}
                        </ul>
                    </MainSection>
                )}

                {(certifications.length > 0 ||
                    (resume.certificationDetails || []).length > 0) && (
                        <MainSection title="Certifications">
                            <CertificationLinks
                                certificationDetails={resume.certificationDetails || []}
                                legacyCertifications={resume.certifications}
                            />
                        </MainSection>
                    )}
            </main>
        </div>
    )
}

export default ProfessionalSidebarTemplate