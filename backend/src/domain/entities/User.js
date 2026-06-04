/**
 * User Entity - Domain Layer
 * Merepresentasikan objek User dalam domain bisnis
 */
class User {
  constructor({ id, email, password, role, created_at }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role || 'user';
    this.created_at = created_at;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  toPublic() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      created_at: this.created_at,
    };
  }
}

module.exports = User;
