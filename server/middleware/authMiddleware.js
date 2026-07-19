const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing.',
      })
    }

    const token = authorization.split(' ')[1]

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.userId).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found.',
      })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    })
  }
}

module.exports = protect