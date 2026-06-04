const biodataRepository = require('../../infrastructure/repositories/BiodataRepository');
const { NotFoundError } = require('../../shared/exceptions');
const { paginate } = require('../../shared/helpers/responseHelper');

class AdminUseCase {
  async getAllCandidates({ search, searchBy, page = 1, limit = 10 }) {
    const { data, total } = await biodataRepository.findAll({ search, searchBy, page, limit });
    return paginate(data, total, page, limit);
  }

  async getCandidateDetail(id) {
    const biodata = await biodataRepository.findById(id);
    if (!biodata) throw new NotFoundError('Biodata tidak ditemukan');
    return biodata;
  }

  async deleteCandidate(id) {
    const biodata = await biodataRepository.findById(id);
    if (!biodata) throw new NotFoundError('Biodata tidak ditemukan');
    await biodataRepository.delete(id);
  }
}

module.exports = new AdminUseCase();
