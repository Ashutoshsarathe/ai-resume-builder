require('dotenv').config()

const dns = require('node:dns')
dns.setDefaultResultOrder('ipv4first')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const aiRoutes = require('./routes/aiRoutes')
const imageRoutes = require('./routes/imageRoutes')
const uploadResumeRoutes = require('./routes/uploadResumeRoutes')

const app = express()

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//     })
// )

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    })
)

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/resume-upload', uploadResumeRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'AI Resume Builder API is running successfully!',
    })
})

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
    })
})

const PORT = process.env.PORT || 5000

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('MongoDB connected successfully')

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

connectDatabase()