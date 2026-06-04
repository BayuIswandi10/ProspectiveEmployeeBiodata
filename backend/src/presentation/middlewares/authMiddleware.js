const { verifyToken } = require('../../infrastructure/security/jwtService');
const { UnauthorizedError, ForbiddenError } = require('../../shared/exceptions');

/**
 * Middleware to authenticate JWT token
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Token tidak valid atau sudah expired'));
    }
    next(err);
  }
};

/**
 * Middleware to authorize by role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Akses ditolak'));
    }
    next();
  };
};

module.exports = { authenticate, authorize };
