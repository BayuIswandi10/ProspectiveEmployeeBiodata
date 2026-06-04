const { paginate } = require('../../shared/helpers/responseHelper');

/**
 * BiodataService - Application Layer
 * Service untuk logika bisnis terkait biodata yang tidak ada di use case
 */
class BiodataService {
  /**
   * Format data biodata untuk response publik
   */
  formatBiodataResponse(biodata) {
    if (!biodata) return null;
    return {
      ...biodata,
      tanggal_lahir: biodata.tanggal_lahir
        ? new Date(biodata.tanggal_lahir).toISOString().split('T')[0]
        : null,
      penghasilan_diharapkan: biodata.penghasilan_diharapkan
        ? parseFloat(biodata.penghasilan_diharapkan)
        : null,
    };
  }

  /**
   * Format list biodata dengan pagination
   */
  formatListResponse(data, total, page, limit) {
    const formattedData = data.map((item) => this.formatBiodataResponse(item));
    return paginate(formattedData, total, page, limit);
  }
}

module.exports = new BiodataService();
