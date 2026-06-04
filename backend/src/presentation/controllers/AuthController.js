const authUseCase = require('../../application/usecases/AuthUseCase');
const { successResponse } = require('../../shared/helpers/responseHelper');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const user = await authUseCase.register(email, password, role);
      return successResponse(res, user, 'Registrasi berhasil', 201);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authUseCase.login(email, password);
      return successResponse(res, result, 'Login berhasil');
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      // JWT is stateless; logout handled by client deleting token
      return successResponse(res, null, 'Logout berhasil');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
