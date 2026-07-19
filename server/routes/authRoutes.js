const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/User')

const router = express.Router()

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}

// const emailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_APP_PASSWORD,
//     },
// })

const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
})






// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required.',
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long.',
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email.',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = createToken(user._id.toString())

        res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while creating account.',
        })
    }
})

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.',
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            })
        }

        const token = createToken(user._id.toString())

        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while logging in.',
        })
    }
})

// Send forgot password email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email address is required.',
            })
        }

        const user = await User.findOne({ email })

        // Same generic response for security
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    'If an account exists with this email, a reset link has been sent.',
            })
        }

        const resetToken = jwt.sign(
            {
                userId: user._id.toString(),
                purpose: 'reset-password',
            },
            process.env.RESET_PASSWORD_SECRET,
            {
                expiresIn: '15m',
            }
        )

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

        await emailTransporter.sendMail({
            from: `"AI Resume Builder" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Reset your AI Resume Builder password',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px;">
          <h2 style="color: #2563eb;">Reset Your Password</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your AI Resume Builder password.</p>
          <p>This reset link will expire in 15 minutes.</p>
          <a
            href="${resetLink}"
            style="display: inline-block; margin-top: 12px; padding: 12px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;"
          >
            Reset Password
          </a>
          <p style="margin-top: 24px; color: #64748b; font-size: 13px;">
            If you did not request this password reset, you can safely ignore this email.
          </p>
        </div>
      `,
        })

        res.status(200).json({
            success: true,
            message: 'Password reset link sent. Please check your email inbox.',
        })
    } catch (error) {
        console.error('Forgot password email error:', error.message)

        res.status(500).json({
            success: false,
            message: 'Unable to send password reset email.',
        })
    }
})

// Reset password using reset token
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long.',
            })
        }

        const decodedToken = jwt.verify(
            token,
            process.env.RESET_PASSWORD_SECRET
        )

        if (decodedToken.purpose !== 'reset-password') {
            return res.status(401).json({
                success: false,
                message: 'Invalid password reset token.',
            })
        }

        const user = await User.findById(decodedToken.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            })
        }

        user.password = await bcrypt.hash(password, 12)
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Password reset successful. You can now login.',
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Reset link is invalid or expired.',
        })
    }
})

module.exports = router

























// const express = require('express')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const User = require('../models/User')

// const router = express.Router()

// const createToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//     })
// }

// // Register new user
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body

//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Name, email and password are required.',
//             })
//         }

//         if (password.length < 6) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Password must be at least 6 characters long.',
//             })
//         }

//         const existingUser = await User.findOne({ email })

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User already exists with this email.',
//             })
//         }

//         const hashedPassword = await bcrypt.hash(password, 12)

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         })

//         const token = createToken(user._id.toString())

//         res.status(201).json({
//             success: true,
//             message: 'Account created successfully.',
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Something went wrong while creating account.',
//         })
//     }
// })

// // Login user
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body

//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email and password are required.',
//             })
//         }

//         const user = await User.findOne({ email })

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password.',
//             })
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password)

//         if (!isPasswordCorrect) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid email or password.',
//             })
//         }

//         const token = createToken(user._id.toString())

//         res.status(200).json({
//             success: true,
//             message: 'Login successful.',
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Something went wrong while logging in.',
//         })
//     }
// })

// module.exports = router