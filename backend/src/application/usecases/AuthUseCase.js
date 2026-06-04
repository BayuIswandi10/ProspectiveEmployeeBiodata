const userRepository = require('../../infrastructure/repositories/UserRepository');
const { hashPassword, comparePassword, generateToken } = require('../../infrastructure/security/jwtService');
const { ConflictError, UnauthorizedError } = require('../../shared/exceptions');
const logger = require('../../infrastructure/logging/logger');

class AuthUseCase {
  async register(email, password, role = 'user') {
    // Check if email already exists
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError('Email sudah terdaftar');
    }

    const hashed = await hashPassword(password);
    const user = await userRepository.create({ email, password: hashed, role });

    logger.info(`Register success: ${email}`);
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);
      throw new UnauthorizedError('Email atau password salah');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed - wrong password: ${email}`);
      throw new UnauthorizedError('Email atau password salah');
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    logger.info(`Login success: ${email}`);
    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}

module.exports = new AuthUseCase();
