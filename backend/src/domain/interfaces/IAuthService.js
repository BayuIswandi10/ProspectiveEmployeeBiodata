/**
 * IAuthService - Domain Interface
 * Kontrak untuk layanan autentikasi
 */
class IAuthService {
  /**
   * Hash password
   * @param {string} password
   * @returns {Promise<string>}
   */
  async hashPassword(password) {
    throw new Error('Method not implemented: hashPassword');
  }

  /**
   * Bandingkan password dengan hash
   * @param {string} password
   * @param {string} hashed
   * @returns {Promise<boolean>}
   */
  async comparePassword(password, hashed) {
    throw new Error('Method not implemented: comparePassword');
  }

  /**
   * Generate JWT token
   * @param {Object} payload
   * @returns {string}
   */
  generateToken(payload) {
    throw new Error('Method not implemented: generateToken');
  }

  /**
   * Verifikasi JWT token
   * @param {string} token
   * @returns {Object}
   */
  verifyToken(token) {
    throw new Error('Method not implemented: verifyToken');
  }
}

module.exports = IAuthService;
