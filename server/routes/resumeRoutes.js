const express = require('express')
const crypto = require('crypto')
const Resume = require('../models/Resume')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Public resume API — token required nahi hai
router.get('/public/:publicId', async (req, res) => {
    try {
        const resume = await Resume.findOne({
            publicId: req.params.publicId,
            isPublic: true,
        }).select('-user')

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Public resume not found.',
            })
        }

        res.status(200).json({
            success: true,
            resume,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to fetch public resume.',
        })
    }
})

// Neeche ke saare routes ke liye login token required hoga
router.use(protect)

// Create new resume
router.post('/', async (req, res) => {
    try {
        const publicId = crypto.randomBytes(8).toString('hex')

        const resume = await Resume.create({
            ...req.body,
            user: req.user._id,
            publicId,
        })

        res.status(201).json({
            success: true,
            message: 'Resume created successfully.',
            resume,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to create resume.',
        })
    }
})

// Get all resumes of logged-in user
router.get('/', async (req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user._id,
        }).sort({ updatedAt: -1 })

        res.status(200).json({
            success: true,
            resumes,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to fetch resumes.',
        })
    }
})

// Get one resume of logged-in user
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id,
        })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found.',
            })
        }

        res.status(200).json({
            success: true,
            resume,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to fetch resume.',
        })
    }
})

// Update resume
router.put('/:id', async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            req.body,
            // {
            //     new: true,
            //     runValidators: true,
            // }
            {
                returnDocument: 'after',
                runValidators: true,
            }
        )

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found.',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Resume updated successfully.',
            resume,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to update resume.',
        })
    }
})

// Change resume public/private setting
router.patch('/:id/visibility', async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            {
                isPublic: req.body.isPublic,
            },
            // {
            //     new: true,
            // }
            {
                returnDocument: 'after',
            }
        )

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found.',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Resume visibility updated.',
            resume,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to update resume visibility.',
        })
    }
})

// Delete resume
router.delete('/:id', async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found.',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Resume deleted successfully.',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to delete resume.',
        })
    }
})

module.exports = router