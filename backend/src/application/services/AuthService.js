const { hashPassword, comparePassword, generateToken, verifyToken } = require('../../infrastructure/security/jwtService');

/**
 * AuthService - Application Layer
 * Implementasi IAuthService, menggunakan infrastructure security
 */
class AuthService {
  async hashPassword(password) {
    return await hashPassword(password);
  }

  async comparePassword(password, hashed) {
    return await comparePassword(password, hashed);
  }

  generateToken(payload) {
    return generateToken(payload);
  }

  verifyToken(token) {
    return verifyToken(token);
  }
}

module.exports = new AuthService();
