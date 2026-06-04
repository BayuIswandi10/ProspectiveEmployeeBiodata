/**
 * IUserRepository - Domain Repository Interface
 * Mendefinisikan kontrak yang harus diimplementasikan oleh infrastructure layer
 */
class IUserRepository {
  /**
   * Cari user berdasarkan email
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    throw new Error('Method not implemented: findByEmail');
  }

  /**
   * Cari user berdasarkan ID
   * @param {number} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    throw new Error('Method not implemented: findById');
  }

  /**
   * Buat user baru
   * @param {Object} data
   * @returns {Promise<User>}
   */
  async create(data) {
    throw new Error('Method not implemented: create');
  }
}

module.exports = IUserRepository;
