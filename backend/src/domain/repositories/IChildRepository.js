/**
 * IChildRepository - Domain Repository Interface
 * Base interface untuk child entities (Pendidikan, Pelatihan, Pekerjaan)
 */
class IChildRepository {
  async findByBiodataId(biodataId) {
    throw new Error('Method not implemented: findByBiodataId');
  }

  async findById(id) {
    throw new Error('Method not implemented: findById');
  }

  async create(data) {
    throw new Error('Method not implemented: create');
  }

  async createMany(records) {
    throw new Error('Method not implemented: createMany');
  }

  async update(id, data) {
    throw new Error('Method not implemented: update');
  }

  async delete(id) {
    throw new Error('Method not implemented: delete');
  }

  async deleteByBiodataId(biodataId) {
    throw new Error('Method not implemented: deleteByBiodataId');
  }
}

module.exports = IChildRepository;
