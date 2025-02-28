// backend/middleware/verify-token.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    // Check if the Authorization header exists and has the correct format
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided or invalid format' });
    }

    // Extract the token (remove 'Bearer ' prefix)
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to req.user
    req.user = decoded.payload || decoded; // Use payload if present, otherwise full decoded object

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle specific JWT errors for better feedback
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports = verifyToken;