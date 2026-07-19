const express = require('express')
const multer = require('multer')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        } else {
            callback(new Error('Only image files are allowed.'))
        }
    },
})

const getImageKitClient = async () => {
    const { default: ImageKit } = await import('@imagekit/nodejs')

    return new ImageKit({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    })
}

router.post(
    '/profile-image',
    protect,
    upload.single('image'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Please select an image file.',
                })
            }

            const imagekit = await getImageKitClient()

            const safeFileName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')

            const uploadOptions = {
                // file: req.file.buffer,
                file: req.file.buffer.toString('base64'),
                fileName: `profile_${req.user._id}_${Date.now()}_${safeFileName}`,
                folder: '/ai-resume-builder/profile-images',
                useUniqueFileName: true,
            }

            // Background removal optional hai
            if (req.body.removeBackground === 'true') {
                uploadOptions.extensions = [
                    {
                        name: 'remove-bg',
                        // options: {},
                        options: {
                            add_shadow: false,
                        },
                    },
                ]
            }

            const result = await imagekit.files.upload(uploadOptions)

            res.status(200).json({
                success: true,
                message: 'Profile image uploaded successfully.',
                imageUrl: result.url,
                fileId: result.fileId,
            })
        } catch (error) {
            console.error('ImageKit upload error:', error.message)

            res.status(500).json({
                success: false,
                message: 'Unable to upload profile image.',
            })
        }
    }
)

module.exports = router