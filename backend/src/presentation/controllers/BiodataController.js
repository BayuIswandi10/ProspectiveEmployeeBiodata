const biodataUseCase = require('../../application/usecases/BiodataUseCase');
const { successResponse } = require('../../shared/helpers/responseHelper');

class BiodataController {
  async getMyBiodata(req, res, next) {
    try {
      const biodata = await biodataUseCase.getMyBiodata(req.user.id);
      return successResponse(res, biodata, 'Berhasil mengambil biodata');
    } catch (err) {
      next(err);
    }
  }

  async createBiodata(req, res, next) {
    try {
      const biodata = await biodataUseCase.createBiodata(req.user.id, req.body);
      return successResponse(res, biodata, 'Biodata berhasil disimpan', 201);
    } catch (err) {
      next(err);
    }
  }

  async updateBiodata(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const biodata = await biodataUseCase.updateBiodata(
        id,
        req.user.id,
        req.user.role,
        req.body
      );
      return successResponse(res, biodata, 'Biodata berhasil diupdate');
    } catch (err) {
      next(err);
    }
  }

  async deleteBiodata(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await biodataUseCase.deleteBiodata(id, req.user.id, req.user.role);
      return successResponse(res, null, 'Biodata berhasil dihapus');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BiodataController();
