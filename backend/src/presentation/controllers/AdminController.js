const adminUseCase = require('../../application/usecases/AdminUseCase');
const { successResponse } = require('../../shared/helpers/responseHelper');

class AdminController {
  async getAllCandidates(req, res, next) {
    try {
      const { search, searchBy, page = 1, limit = 10 } = req.query;
      const result = await adminUseCase.getAllCandidates({ search, searchBy, page, limit });
      return successResponse(res, result, 'Berhasil mengambil data kandidat');
    } catch (err) {
      next(err);
    }
  }

  async getCandidateDetail(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const biodata = await adminUseCase.getCandidateDetail(id);
      return successResponse(res, biodata, 'Berhasil mengambil detail kandidat');
    } catch (err) {
      next(err);
    }
  }

  async deleteCandidate(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await adminUseCase.deleteCandidate(id);
      return successResponse(res, null, 'Kandidat berhasil dihapus');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
