import ContactLinks from './ContactLinks'
import CertificationLinks from './CertificationLinks'

function Section({ title, children }) {
    return (
        <section className="mt-4">
            <h2 className="border-b border-slate-500 pb-1 text-[11px] font-bold uppercase tracking-wide text-sky-700">
                {title}
            </h2>
            <div className="mt-2">{children}</div>
        </section>
    )
}

function AtsClassicPreview({ resume }) {
    const projectLines = (resume.projects || '')
        .split('\n')
        .map((item) => item.trim())
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

    const achievementLines = (resume.achievements || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

    const certificationLines = (resume.certifications || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

    const contactDetails = [resume.location, resume.phone, resume.email]
        .filter(Boolean)
        .join(' | ')



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

    return (
        <div className="min-h-[850px] bg-white px-8 py-7 font-serif text-[11px] leading-[1.35] text-slate-900 shadow-2xl shadow-slate-300/60 sm:px-10">
            <header className="border-b border-slate-400 pb-3 text-center">
                <h1 className="text-2xl font-bold tracking-wide">
                    {resume.fullName}
                </h1>

                {/* <p className="mt-1 font-sans text-[10px] text-slate-700">
                    {contactDetails}
                </p> */}
                <div className="mt-2">
                    <ContactLinks resume={resume} centered />
                </div>

                <p className="mt-1 font-sans text-[10px] text-blue-700">
                    {resume.jobTitle}
                </p>
            </header>

            {resume.summary && (
                <Section title="Summary">
                    <p>{resume.summary}</p>
                </Section>
            )}

            {/* <Section title="Technical Skills">
                <p>
                    <strong>Skills:</strong> {resume.skills || 'Add your technical skills'}
                </p>
            </Section> */}


            <Section title="Technical Skills">
                {skillCategoryItems.length > 0 ? (
                    <div className="space-y-1">
                        {skillCategoryItems.map((item) => (
                            <p key={item.label}>
                                <strong>{item.label}:</strong> {item.value}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>
                        <strong>Skills:</strong> {resume.skills || 'Add your technical skills'}
                    </p>
                )}
            </Section>





            {(resume.role || resume.company || resume.description) && (
                <Section title="Experience">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="font-bold">{resume.role}</h3>
                            <p className="italic">{resume.company}</p>
                        </div>

                        <p className="shrink-0 text-right text-[10px]">
                            {resume.startDate} - {resume.endDate}
                        </p>
                    </div>

                    {resume.description && (
                        <p className="mt-1.5 whitespace-pre-line">{resume.description}</p>
                    )}
                </Section>
            )}

            {(detailedProjects.length > 0 || projectLines.length > 0) && (
                <Section title="Projects">
                    {detailedProjects.length > 0 ? (
                        <div className="space-y-3">
                            {detailedProjects.map((project, index) => (
                                <div key={`project-${index}`}>
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <h3 className="font-bold italic">
                                            {project.title || `Project ${index + 1}`}
                                        </h3>

                                        <div className="flex gap-2 text-[10px] text-blue-700">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="underline"
                                                >
                                                    GitHub
                                                </a>
                                            )}

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="underline"
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {project.techStack && (
                                        <p className="mt-0.5">
                                            <strong>Tech Stack:</strong> {project.techStack}
                                        </p>
                                    )}

                                    {project.description && (
                                        <p className="mt-0.5">{project.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul className="list-disc space-y-1 pl-4">
                            {projectLines.map((project, index) => (
                                <li key={`${project}-${index}`}>{project}</li>
                            ))}
                        </ul>
                    )}
                </Section>
            )}

            {educationItems.length > 0 && (
                <Section title="Education">
                    <div className="space-y-2">
                        {educationItems.map((education, index) => (
                            <div
                                key={`education-${index}`}
                                className="flex items-start justify-between gap-3"
                            >
                                <div>
                                    <h3 className="font-bold">{education.degree}</h3>

                                    <p>
                                        {education.institute}
                                        {education.location ? `, ${education.location}` : ''}
                                    </p>

                                    {education.score && (
                                        <p className="text-[10px]">Score: {education.score}</p>
                                    )}
                                </div>

                                <p className="shrink-0 text-right text-[10px]">
                                    {education.year}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* {(achievementLines.length > 0 || certificationLines.length > 0) && (
                <Section title="Achievements & Certifications">
                    <ul className="list-disc space-y-1 pl-4">
                        {achievementLines.map((achievement, index) => (
                            <li key={`achievement-${index}`}>{achievement}</li>
                        ))}

                        {certificationLines.map((certification, index) => (
                            <li key={`certification-${index}`}>{certification}</li>
                        ))}
                    </ul>
                </Section>
            )} */}

            {/* {(achievementLines.length > 0 ||
                certificationLines.length > 0 ||
                (resume.certificationDetails || []).length > 0) && (
                    <Section title="Achievements & Certifications">
                        {achievementLines.length > 0 && (
                            <ul className="list-disc space-y-1 pl-4">
                                {achievementLines.map((achievement, index) => (
                                    <li key={`achievement-${index}`}>{achievement}</li>
                                ))}
                            </ul>
                        )}

                        <div className={achievementLines.length > 0 ? 'mt-2' : ''}>
                            <CertificationLinks
                                certificationDetails={resume.certificationDetails || []}
                                legacyCertifications={resume.certifications}
                            />
                        </div>
                    </Section>
                )} */}

            {achievementLines.length > 0 && (
                <Section title="Achievements">
                    <ul className="list-disc space-y-1 pl-4">
                        {achievementLines.map((achievement, index) => (
                            <li key={`achievement-${index}`}>{achievement}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {(certificationLines.length > 0 ||
                (resume.certificationDetails || []).length > 0) && (
                    <Section title="Certifications">
                        {/* <CertificationLinks
                            certificationDetails={resume.certificationDetails || []}
                            legacyCertifications={resume.certifications}
                        /> */}
                        <CertificationLinks
                            certificationDetails={resume.certificationDetails || []}
                            legacyCertifications={resume.certifications}
                            compact
                        />
                    </Section>
                )}
        </div>
    )
}

export default AtsClassicPreview