const express = require('express')
const multer = require('multer')
const mammoth = require('mammoth')
const { PDFParse } = require('pdf-parse')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]

        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error('Only PDF and DOCX files are allowed.'))
        }
    },
})

router.post('/parse', protect, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a PDF or DOCX resume file.',
            })
        }

        const fileExtension = req.file.originalname
            .split('.')
            .pop()
            .toLowerCase()

        let extractedText = ''

        if (fileExtension === 'pdf') {
            const parser = new PDFParse({
                data: req.file.buffer,
            })

            const result = await parser.getText()

            extractedText = result.text

            await parser.destroy()
        }

        if (fileExtension === 'docx') {
            const result = await mammoth.extractRawText({
                buffer: req.file.buffer,
            })

            extractedText = result.value
        }

        if (!extractedText || !extractedText.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    'No readable text found. Please upload a text-based PDF or DOCX file.',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Resume text extracted successfully.',
            fileName: req.file.originalname,
            extractedText: extractedText.trim(),
        })
    } catch (error) {
        console.error('Resume upload error:', error.message)

        res.status(500).json({
            success: false,
            message: 'Unable to read this resume file.',
        })
    }
})

module.exports = router