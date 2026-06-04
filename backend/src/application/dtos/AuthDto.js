/**
 * Auth DTOs - Application Layer
 * Data Transfer Objects untuk request/response autentikasi
 */

class RegisterRequestDto {
  constructor({ email, password, confirmPassword }) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

class LoginRequestDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

class AuthResponseDto {
  constructor({ token, user }) {
    this.token = token;
    this.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

class UserResponseDto {
  constructor({ id, email, role, created_at }) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.created_at = created_at;
  }
}

module.exports = {
  RegisterRequestDto,
  LoginRequestDto,
  AuthResponseDto,
  UserResponseDto,
};
