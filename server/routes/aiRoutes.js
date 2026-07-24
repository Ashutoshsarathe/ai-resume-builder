const express = require('express')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// const GEMINI_MODELS = ['gemini-3.5-flash', 'gemini-2.5-flash']
const GEMINI_MODELS = [
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
]

const getGeminiClient = async () => {
    const { GoogleGenAI } = await import('@google/genai')

    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    })
}

const isHighDemandError = (error) => {
    return error?.message?.includes('503') || error?.status === 503
}

const generateWithFallback = async (ai, prompt, config) => {
    let lastError

    for (const model of GEMINI_MODELS) {
        try {
            return await ai.models.generateContent({
                model,
                contents: prompt,
                config,
            })
        } catch (error) {
            lastError = error

            if (!isHighDemandError(error)) {
                throw error
            }

            // console.warn(`${model} is busy. Trying fallback model...`)
            console.warn(`${model} is busy. Trying fallback model...`)
        }
    }

    throw lastError
}

const getSectionGuidance = (section = '') => {
    const sectionName = section.toLowerCase()

    if (sectionName.includes('summary')) {
        return `
Write a concise 2-3 sentence professional summary.
Highlight role, main technical strengths, and relevant experience.
Do not use first-person words like "I" or "my".
`
    }

    if (sectionName.includes('project')) {
        return `
Write a concise and technically strong project description.
Highlight the problem solved, major features, technologies, and contribution.
Use action verbs such as Designed, Developed, Built, Implemented, Integrated, or Optimized.
`
    }

    if (sectionName.includes('experience')) {
        return `
Write a strong work-experience description.
Focus on responsibilities, technical contribution, collaboration, and measurable impact only if it is already present in the original content.
`
    }

    return `
Improve the content to be concise, professional, ATS-friendly, and grammatically correct.
`
}

router.use(protect)

// Improve Summary, Project Description, Experience, Achievements, etc.
router.post('/improve', async (req, res) => {
    try {
        const { content, section } = req.body

        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Please provide content to improve.',
            })
        }

        const ai = await getGeminiClient()

        const prompt = `
You are a senior ATS resume writer.

Improve the following resume section: ${section || 'content'}.

${getSectionGuidance(section)}

Strict rules:
- Preserve all factual information from the original content.
- Do not invent skills, achievements, companies, job titles, metrics, or responsibilities.
- Keep mentioned technologies and tools if they are relevant.
- Use strong action-oriented language.
- Fix grammar, spelling, clarity, and readability.
- Avoid generic filler words and unnecessary repetition.
- Do not add headings, notes, explanations, quotes, markdown, or code blocks.
- Return only the final improved resume text.

Original content:
${content.slice(0, 8000)}
`

        const response = await generateWithFallback(ai, prompt, {
            temperature: 0.35,
            maxOutputTokens: 700,
        })

        const improvedText = response.text?.trim()

        if (!improvedText) {
            throw new Error('AI did not return improved content.')
        }

        res.status(200).json({
            success: true,
            improvedText,
        })
    } catch (error) {
        console.error('Gemini AI error:', error.message)

        res.status(isHighDemandError(error) ? 503 : 500).json({
            success: false,
            message: isHighDemandError(error)
                ? 'Gemini AI is currently busy. Please try again in a minute.'
                : 'Unable to improve resume content with AI.',
        })
    }
})

// Extract structured resume data from uploaded PDF/DOCX text
router.post('/extract-resume', async (req, res) => {
    try {
        const { extractedText } = req.body

        if (!extractedText || !extractedText.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Resume text is required.',
            })
        }

        const ai = await getGeminiClient()

        const prompt = `
You are an expert resume parser.

Extract structured resume information from the resume text below.

Rules:
- Return only valid JSON.
- Do not return markdown or code fences.
- Do not invent any information.
- Use empty strings for missing fields.
- Skills must be a single comma-separated string.
- Categorize skills into Programming Languages, Frontend, Backend, Database, Tools, Core Subjects, and Other Skills.
- Do not repeat the same skill in multiple categories.
- Achievements and certifications must be newline-separated strings.
- Keep project descriptions concise and professional.
- If links are not present, use empty strings.

Return JSON in this exact format:

{
  "title": "",
  "fullName": "",
  "jobTitle": "",
  "email": "",
  "phone": "",
  "location": "",
  "summary": "",
  "skills": "",
  "skillCategories": {
    "programmingLanguages": "",
    "frontend": "",
    "backend": "",
    "database": "",
    "tools": "",
    "coreSubjects": "",
    "otherSkills": ""
  },
  "role": "",
  "company": "",
  "startDate": "",
  "endDate": "",
  "description": "",
  "educationDetails": [
    {
      "degree": "",
      "institute": "",
      "year": "",
      "score": "",
      "location": ""
    }
  ],
  "projectDetails": [
    {
      "title": "",
      "techStack": "",
      "description": "",
      "githubUrl": "",
      "liveUrl": ""
    }
  ],
  "achievements": "",
  "certifications": ""
}

Resume text:
${extractedText.slice(0, 30000)}
`

        const response = await generateWithFallback(ai, prompt, {
            temperature: 0.1,
            maxOutputTokens: 3000,
            responseMimeType: 'application/json',
        })

        const responseText = (response.text || '')
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim()

        if (!responseText) {
            throw new Error('AI did not return resume data.')
        }

        const resumeData = JSON.parse(responseText)

        res.status(200).json({
            success: true,
            message: 'Resume data extracted with AI successfully.',
            resumeData,
        })
    } catch (error) {
        console.error('AI resume extraction error:', error.message)

        res.status(isHighDemandError(error) ? 503 : 500).json({
            success: false,
            message: isHighDemandError(error)
                ? 'Gemini AI is currently busy. Please try again in a minute.'
                : 'Unable to extract resume data with AI.',
        })
    }
})

module.exports = router


























// const express = require('express')
// const protect = require('../middleware/authMiddleware')

// const router = express.Router()

// const GEMINI_MODEL = 'gemini-3.5-flash'

// const getGeminiClient = async () => {
//     const { GoogleGenAI } = await import('@google/genai')

//     return new GoogleGenAI({
//         apiKey: process.env.GEMINI_API_KEY,
//     })
// }

// const getSectionGuidance = (section = '') => {
//     const sectionName = section.toLowerCase()

//     if (sectionName.includes('summary')) {
//         return `
// Write a concise 2-3 sentence professional summary.
// Highlight role, main technical strengths, and relevant experience.
// Do not use first-person words like "I" or "my".
// `
//     }

//     if (sectionName.includes('project')) {
//         return `
// Write a concise and technically strong project description.
// Highlight the problem solved, major features, technologies, and contribution.
// Use action verbs such as Designed, Developed, Built, Implemented, Integrated, or Optimized.
// `
//     }

//     if (sectionName.includes('experience')) {
//         return `
// Write a strong work-experience description.
// Focus on responsibilities, technical contribution, collaboration, and measurable impact only if it is already present in the original content.
// `
//     }

//     return `
// Improve the content to be concise, professional, ATS-friendly, and grammatically correct.
// `
// }

// router.use(protect)

// // Improve Summary, Project Description, Experience, etc.
// router.post('/improve', async (req, res) => {
//     try {
//         const { content, section } = req.body

//         if (!content || !content.trim()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide content to improve.',
//             })
//         }

//         const ai = await getGeminiClient()

//         const prompt = `
// You are a senior ATS resume writer.

// Improve the following resume section: ${section || 'content'}.

// ${getSectionGuidance(section)}

// Strict rules:
// - Preserve all factual information from the original content.
// - Do not invent skills, achievements, companies, job titles, metrics, or responsibilities.
// - Keep mentioned technologies and tools if they are relevant.
// - Use strong action-oriented language.
// - Fix grammar, spelling, clarity, and readability.
// - Avoid generic filler words and unnecessary repetition.
// - Do not add headings, notes, explanations, quotes, markdown, or code blocks.
// - Return only the final improved resume text.

// Original content:
// ${content.slice(0, 8000)}
// `

//         const response = await ai.models.generateContent({
//             model: GEMINI_MODEL,
//             contents: prompt,
//             config: {
//                 temperature: 0.35,
//                 maxOutputTokens: 700,
//             },
//         })

//         const improvedText = response.text?.trim()

//         if (!improvedText) {
//             throw new Error('AI did not return improved content.')
//         }

//         res.status(200).json({
//             success: true,
//             improvedText,
//         })
//     } catch (error) {
//         console.error('Gemini AI error:', error.message)

//         const isHighDemandError = error.message?.includes('503')

//         res.status(isHighDemandError ? 503 : 500).json({
//             success: false,
//             message: isHighDemandError
//                 ? 'Gemini AI is currently busy. Please try again in a minute.'
//                 : 'Unable to improve resume content with AI.',
//         })
//     }
// })

// // Extract structured resume data from uploaded PDF/DOCX text
// router.post('/extract-resume', async (req, res) => {
//     try {
//         const { extractedText } = req.body

//         if (!extractedText || !extractedText.trim()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Resume text is required.',
//             })
//         }

//         const ai = await getGeminiClient()

//         const prompt = `
// You are an expert resume parser.

// Extract structured resume information from the resume text below.

// Rules:
// - Return only valid JSON.
// - Do not return markdown or code fences.
// - Do not invent any information.
// - Use empty strings for missing fields.
// - Skills must be a single comma-separated string.
// - Categorize skills into Programming Languages, Frontend, Backend, Database, Tools, Core Subjects, and Other Skills.
// - Do not repeat the same skill in multiple categories.
// - Achievements and certifications must be newline-separated strings.
// - Keep project descriptions concise and professional.
// - If links are not present, use empty strings.

// Return JSON in this exact format:

// {
//   "title": "",
//   "fullName": "",
//   "jobTitle": "",
//   "email": "",
//   "phone": "",
//   "location": "",
//   "summary": "",
//   "skills": "",
//   "skillCategories": {
//     "programmingLanguages": "",
//     "frontend": "",
//     "backend": "",
//     "database": "",
//     "tools": "",
//     "coreSubjects": "",
//     "otherSkills": ""
//   },
//   "role": "",
//   "company": "",
//   "startDate": "",
//   "endDate": "",
//   "description": "",
//   "educationDetails": [
//     {
//       "degree": "",
//       "institute": "",
//       "year": "",
//       "score": "",
//       "location": ""
//     }
//   ],
//   "projectDetails": [
//     {
//       "title": "",
//       "techStack": "",
//       "description": "",
//       "githubUrl": "",
//       "liveUrl": ""
//     }
//   ],
//   "achievements": "",
//   "certifications": ""
// }

// Resume text:
// ${extractedText.slice(0, 30000)}
// `

//         const response = await ai.models.generateContent({
//             model: GEMINI_MODEL,
//             contents: prompt,
//             config: {
//                 temperature: 0.1,
//                 maxOutputTokens: 3000,
//                 responseMimeType: 'application/json',
//             },
//         })

//         const responseText = (response.text || '')
//             .replace(/```json/g, '')
//             .replace(/```/g, '')
//             .trim()

//         if (!responseText) {
//             throw new Error('AI did not return resume data.')
//         }

//         const resumeData = JSON.parse(responseText)

//         res.status(200).json({
//             success: true,
//             message: 'Resume data extracted with AI successfully.',
//             resumeData,
//         })
//     } catch (error) {
//         console.error('AI resume extraction error:', error.message)

//         const isHighDemandError = error.message?.includes('503')

//         res.status(isHighDemandError ? 503 : 500).json({
//             success: false,
//             message: isHighDemandError
//                 ? 'Gemini AI is currently busy. Please try again in a minute.'
//                 : 'Unable to extract resume data with AI.',
//         })
//     }
// })

// module.exports = router






























































// const express = require('express')
// const protect = require('../middleware/authMiddleware')

// const router = express.Router()

// const getGeminiClient = async () => {
//     const { GoogleGenAI } = await import('@google/genai')

//     return new GoogleGenAI({
//         apiKey: process.env.GEMINI_API_KEY,
//     })
// }

// const getSectionGuidance = (section = '') => {
//     const sectionName = section.toLowerCase()

//     if (sectionName.includes('summary')) {
//         return `
// Write a concise 2-3 sentence professional summary.
// Highlight role, main technical strengths, and relevant experience.
// Do not use first-person words like "I" or "my".
// `
//     }

//     if (sectionName.includes('project')) {
//         return `
// Write a concise and technically strong project description.
// Highlight the problem solved, major features, technologies, and contribution.
// Use action verbs such as Designed, Developed, Built, Implemented, Integrated, or Optimized.
// `
//     }

//     if (sectionName.includes('experience')) {
//         return `
// Write a strong work-experience description.
// Focus on responsibilities, technical contribution, collaboration, and measurable impact only if it is already present in the original content.
// `
//     }

//     return `
// Improve the content to be concise, professional, ATS-friendly, and grammatically correct.
// `
// }

// router.use(protect)

// // Improve Summary, Project Description, Experience, etc.
// router.post('/improve', async (req, res) => {
//     try {
//         const { content, section } = req.body

//         if (!content || !content.trim()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide content to improve.',
//             })
//         }

//         const ai = await getGeminiClient()

//         const prompt = `
// You are a senior ATS resume writer.

// Improve the following resume section: ${section || 'content'}.

// ${getSectionGuidance(section)}

// Strict rules:
// - Preserve all factual information from the original content.
// - Do not invent skills, achievements, companies, job titles, metrics, or responsibilities.
// - Keep mentioned technologies and tools if they are relevant.
// - Use strong action-oriented language.
// - Fix grammar, spelling, clarity, and readability.
// - Avoid generic filler words and unnecessary repetition.
// - Do not add headings, notes, explanations, quotes, markdown, or code blocks.
// - Return only the final improved resume text.

// Original content:
// ${content.slice(0, 8000)}
// `

//         const response = await ai.models.generateContent({
//             model: 'gemini-3.5-flash', // ye important hai kyuki jab server busy ratha hai es per so imp topic
//             contents: prompt,
//             config: {
//                 temperature: 0.35,
//                 maxOutputTokens: 700,
//             },
//         })

//         const improvedText = response.text?.trim()

//         if (!improvedText) {
//             throw new Error('AI did not return improved content.')
//         }

//         res.status(200).json({
//             success: true,
//             improvedText,
//         })
//     } catch (error) {
//         console.error('Gemini AI error:', error.message)

//         const isHighDemandError = error.message?.includes('503')

//         res.status(isHighDemandError ? 503 : 500).json({
//             success: false,
//             message: isHighDemandError
//                 ? 'Gemini AI is currently busy. Please try again in a minute.'
//                 : 'Unable to improve resume content with AI.',
//         })
//     }
// })

// // Extract structured resume data from uploaded PDF/DOCX text
// router.post('/extract-resume', async (req, res) => {
//     try {
//         const { extractedText } = req.body

//         if (!extractedText || !extractedText.trim()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Resume text is required.',
//             })
//         }

//         const ai = await getGeminiClient()

//         const prompt = `
// You are an expert resume parser.

// Extract structured resume information from the resume text below.

// Rules:
// - Return only valid JSON.
// - Do not return markdown or code fences.
// - Do not invent any information.
// - Use empty strings for missing fields.
// - Skills must be a single comma-separated string.
// - Achievements and certifications must be newline-separated strings.
// - Keep project descriptions concise and professional.
// - If links are not present, use empty strings.

// Return JSON in this exact format:

// {
//   "title": "",
//   "fullName": "",
//   "jobTitle": "",
//   "email": "",
//   "phone": "",
//   "location": "",
//   "summary": "",
//   "skills": "",
//   "skillCategories": {
//   "programmingLanguages": "",
//   "frontend": "",
//   "backend": "",
//   "database": "",
//   "tools": "",
//   "coreSubjects": "",
//   "otherSkills": ""
// },
//   "role": "",
//   "company": "",
//   "startDate": "",
//   "endDate": "",
//   "description": "",
//   "educationDetails": [
//     {
//       "degree": "",
//       "institute": "",
//       "year": "",
//       "score": "",
//       "location": ""
//     }
//   ],
//   "projectDetails": [
//     {
//       "title": "",
//       "techStack": "",
//       "description": "",
//       "githubUrl": "",
//       "liveUrl": ""
//     }
//   ],
//   "achievements": "",
//   "certifications": ""
// }

// Resume text:
// ${extractedText.slice(0, 30000)}
// `

//         const response = await ai.models.generateContent({
//             model: 'gemini-3.5-flash',  // ye important hai kyuki jab server busy ratha hai es per so imp topic
//             contents: prompt,
//             config: {
//                 temperature: 0.1,
//                 maxOutputTokens: 3000,
//                 responseMimeType: 'application/json',
//             },
//         })

//         const responseText = (response.text || '')
//             .replace(/```json/g, '')
//             .replace(/```/g, '')
//             .trim()

//         if (!responseText) {
//             throw new Error('AI did not return resume data.')
//         }

//         const resumeData = JSON.parse(responseText)

//         res.status(200).json({
//             success: true,
//             message: 'Resume data extracted with AI successfully.',
//             resumeData,
//         })
//     } catch (error) {
//         console.error('AI resume extraction error:', error.message)

//         const isHighDemandError = error.message?.includes('503')

//         res.status(isHighDemandError ? 503 : 500).json({
//             success: false,
//             message: isHighDemandError
//                 ? 'Gemini AI is currently busy. Please try again in a minute.'
//                 : 'Unable to extract resume data with AI.',
//         })
//     }
// })

// module.exports = router