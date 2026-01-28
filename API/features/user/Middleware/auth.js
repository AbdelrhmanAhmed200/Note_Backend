const { verifyJwt } = require('../../../config/jwt_token');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader;  // Get the token after "Bearer "
    
    const decoded = verifyJwt(token);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};