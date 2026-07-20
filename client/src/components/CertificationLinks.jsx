function makeUrl(url) {
    if (!url) {
        return ''
    }

    return url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`
}

function CertificationLinks({
    certificationDetails = [],
    legacyCertifications = '',
    dark = false,
    compact = false,
}) {
    const detailedCertifications = certificationDetails.filter(
        (certification) =>
            certification.title ||
            certification.issuer ||
            certification.year ||
            certification.credentialUrl
    )

    const legacyLines = (legacyCertifications || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

    const textColor = dark ? 'text-slate-300' : 'text-slate-700'
    const linkColor = dark
        ? 'text-blue-300 hover:text-white'
        : 'text-blue-600 hover:text-blue-800'

    const contentTextSize = compact ? 'text-[11px]' : 'text-sm'
    const linkTextSize = compact ? 'text-[10px]' : 'text-xs'

    return (
        <div className={`space-y-2 ${textColor}`}>
            {detailedCertifications.map((certification, index) => (
                <div
                    key={`certification-${index}`}
                    className="flex flex-wrap items-center justify-between gap-2"
                >
                    <div className={contentTextSize}>
                        <span className="font-bold">
                            {certification.title || `Certification ${index + 1}`}
                        </span>

                        {certification.issuer && (
                            <span> · {certification.issuer}</span>
                        )}

                        {certification.year && (
                            <span className={compact ? 'text-[10px]' : 'text-xs'}>
                                {' '}
                                · {certification.year}
                            </span>
                        )}
                    </div>

                    {certification.credentialUrl && (
                        <a
                            href={makeUrl(certification.credentialUrl)}
                            target="_blank"
                            rel="noreferrer"
                            className={`${linkTextSize} font-semibold transition hover:underline ${linkColor}`}
                        >
                            View Credential
                        </a>
                    )}
                </div>
            ))}

            {detailedCertifications.length === 0 &&
                legacyLines.map((certification, index) => (
                    <p key={`legacy-certification-${index}`} className={contentTextSize}>
                        {certification}
                    </p>
                ))}
        </div>
    )
}

export default CertificationLinks






















// function makeUrl(url) {
//     if (!url) {
//         return ''
//     }

//     return url.startsWith('http://') || url.startsWith('https://')
//         ? url
//         : `https://${url}`
// }

// function CertificationLinks({
//     certificationDetails = [],
//     legacyCertifications = '',
//     dark = false,
// }) {
//     const detailedCertifications = certificationDetails.filter(
//         (certification) =>
//             certification.title ||
//             certification.issuer ||
//             certification.year ||
//             certification.credentialUrl
//     )

//     const legacyLines = (legacyCertifications || '')
//         .split('\n')
//         .map((item) => item.trim())
//         .filter(Boolean)

//     const textColor = dark ? 'text-slate-300' : 'text-slate-700'
//     const linkColor = dark
//         ? 'text-blue-300 hover:text-white'
//         : 'text-blue-600 hover:text-blue-800'

//     return (
//         <div className={`space-y-2 ${textColor}`}>
//             {detailedCertifications.map((certification, index) => (
//                 <div
//                     key={`certification-${index}`}
//                     className="flex flex-wrap items-center justify-between gap-2"
//                 >
//                     <div className="text-sm">
//                         <span className="font-bold">
//                             {certification.title || `Certification ${index + 1}`}
//                         </span>

//                         {certification.issuer && (
//                             <span> · {certification.issuer}</span>
//                         )}

//                         {certification.year && (
//                             <span className="text-xs"> · {certification.year}</span>
//                         )}
//                     </div>

//                     {certification.credentialUrl && (
//                         <a
//                             href={makeUrl(certification.credentialUrl)}
//                             target="_blank"
//                             rel="noreferrer"
//                             className={`text-xs font-semibold transition hover:underline ${linkColor}`}
//                         >
//                             View Credential
//                         </a>
//                     )}
//                 </div>
//             ))}

//             {detailedCertifications.length === 0 &&
//                 legacyLines.map((certification, index) => (
//                     <p key={`legacy-certification-${index}`} className="text-sm">
//                         {certification}
//                     </p>
//                 ))}
//         </div>
//     )
// }

// export default CertificationLinks