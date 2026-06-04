/**
 * IBiodataRepository - Domain Repository Interface
 */
class IBiodataRepository {
  async findByUserId(userId) {
    throw new Error('Method not implemented: findByUserId');
  }

  async findById(id) {
    throw new Error('Method not implemented: findById');
  }

  async create(data) {
    throw new Error('Method not implemented: create');
  }

  async update(id, data) {
    throw new Error('Method not implemented: update');
  }

  async delete(id) {
    throw new Error('Method not implemented: delete');
  }

  async findAll({ search, searchBy, page, limit }) {
    throw new Error('Method not implemented: findAll');
  }
}

module.exports = IBiodataRepository;
