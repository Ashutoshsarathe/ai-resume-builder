function makeUrl(url) {
    if (!url) {
        return ''
    }

    return url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`
}

function ContactLinks({ resume, dark = false, centered = false }) {
    const textColor = dark ? 'text-slate-200' : 'text-slate-600'
    const linkColor = dark
        ? 'text-blue-300 hover:text-white'
        : 'text-blue-600 hover:text-blue-800'

    return (
        <div
            className={`flex flex-wrap gap-x-3 gap-y-1 text-xs ${textColor} ${centered ? 'justify-center' : ''
                }`}
        >
            {resume.email && (
                <a
                    href={`mailto:${resume.email}`}
                    title={`Send email to ${resume.email}`}
                    className={`font-medium transition hover:underline ${linkColor}`}
                >
                    {resume.email}
                </a>
            )}

            {resume.phone && <span>{resume.phone}</span>}

            {resume.location && <span>{resume.location}</span>}

            {resume.linkedinUrl && (
                <a
                    href={makeUrl(resume.linkedinUrl)}
                    target="_blank"
                    rel="noreferrer"
                    title="Open LinkedIn Profile"
                    className={`font-semibold transition hover:underline ${linkColor}`}
                >
                    LinkedIn
                </a>
            )}

            {resume.githubProfileUrl && (
                <a
                    href={makeUrl(resume.githubProfileUrl)}
                    target="_blank"
                    rel="noreferrer"
                    title="Open GitHub Profile"
                    className={`font-semibold transition hover:underline ${linkColor}`}
                >
                    GitHub
                </a>
            )}
        </div>
    )
}

export default ContactLinks