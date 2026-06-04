const { body } = require('express-validator');

const biodataValidator = [
  // 3. Biodata
  body('posisi_dilamar').notEmpty().withMessage('Posisi Dilamar wajib diisi'),
  body('nama')
    .notEmpty().withMessage('Nama wajib diisi')
    .isLength({ min: 3, max: 100 }).withMessage('Nama minimal 3 karakter dan maksimal 100 karakter'),
  body('no_ktp')
    .notEmpty().withMessage('Nomor KTP wajib diisi')
    .customSanitizer(val => String(val))
    .isNumeric().withMessage('Nomor KTP hanya boleh berisi angka')
    .isLength({ min: 16, max: 16 }).withMessage('Nomor KTP harus terdiri dari 16 digit angka'),
  body('tempat_lahir').notEmpty().withMessage('Tempat Lahir wajib diisi'),
  body('tanggal_lahir')
    .notEmpty().withMessage('Tanggal Lahir wajib diisi')
    .isISO8601().withMessage('Tanggal Lahir tidak valid')
    .custom(value => {
      if (new Date(value) > new Date()) throw new Error('Tanggal Lahir tidak boleh melebihi tanggal saat ini');
      return true;
    }),
  body('jenis_kelamin').notEmpty().withMessage('Jenis Kelamin wajib diisi'),
  body('agama').notEmpty().withMessage('Agama wajib diisi'),
  body('status').notEmpty().withMessage('Status wajib diisi'),
  body('alamat_ktp').notEmpty().withMessage('Alamat KTP wajib diisi'),
  body('alamat_tinggal').notEmpty().withMessage('Alamat Tinggal wajib diisi'),
  body('email')
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Email harus menggunakan format email yang valid'),
  body('no_telp')
    .notEmpty().withMessage('Nomor Telepon wajib diisi')
    .customSanitizer(val => String(val))
    .isNumeric().withMessage('Nomor Telepon hanya boleh berisi angka')
    .isLength({ min: 10, max: 15 }).withMessage('Nomor Telepon minimal 10 digit dan maksimal 15 digit'),
  body('orang_terdekat').notEmpty().withMessage('Orang Terdekat wajib diisi'),
  body('skill').notEmpty().withMessage('Skill wajib diisi'),
  body('bersedia_ditempatkan')
    .isBoolean().withMessage('Bersedia Ditempatkan harus berupa boolean'),
  body('penghasilan_diharapkan')
    .notEmpty().withMessage('Penghasilan Diharapkan wajib diisi')
    .isNumeric().withMessage('Penghasilan Diharapkan harus berupa angka')
    .custom(val => {
      if (parseFloat(val) <= 0) throw new Error('Penghasilan Diharapkan harus lebih besar dari 0');
      return true;
    }),

  // 4. Pendidikan
  body('pendidikan')
    .isArray({ min: 1 }).withMessage('Minimal harus memiliki 1 data pendidikan'),
  body('pendidikan.*.jenjang').notEmpty().withMessage('Jenjang wajib diisi'),
  body('pendidikan.*.nama_institusi').notEmpty().withMessage('Nama Institusi wajib diisi'),
  body('pendidikan.*.jurusan').notEmpty().withMessage('Jurusan wajib diisi'),
  body('pendidikan.*.tahun_lulus')
    .notEmpty().withMessage('Tahun Lulus wajib diisi')
    .isInt({ max: new Date().getFullYear() }).withMessage('Tahun Lulus tidak boleh lebih besar dari tahun berjalan'),
  body('pendidikan.*.ipk')
    .notEmpty().withMessage('IPK wajib diisi')
    .isFloat({ min: 0, max: 4 }).withMessage('IPK harus berada pada rentang 0 sampai 4'),

  // 5. Pelatihan
  body('pelatihan').optional().isArray(),
  body('pelatihan.*.nama_kursus').notEmpty().withMessage('Nama Kursus wajib diisi jika data pelatihan ditambahkan'),
  body('pelatihan.*.tahun')
    .notEmpty().withMessage('Tahun wajib diisi jika data pelatihan ditambahkan')
    .isInt({ max: new Date().getFullYear() }).withMessage('Tahun tidak boleh lebih besar dari tahun berjalan'),
  body('pelatihan.*.sertifikat')
    .isIn(['ada', 'tidak', 'Ada', 'Tidak']).withMessage('Sertifikat hanya boleh bernilai "ada" atau "tidak"')
    .customSanitizer(val => val.toLowerCase()),

  // 6. Pekerjaan
  body('pekerjaan').optional().isArray(),
  body('pekerjaan.*.nama_perusahaan').notEmpty().withMessage('Nama Perusahaan wajib diisi jika data pekerjaan ditambahkan'),
  body('pekerjaan.*.posisi_terakhir').notEmpty().withMessage('Posisi Terakhir wajib diisi jika data pekerjaan ditambahkan'),
  body('pekerjaan.*.tahun')
    .notEmpty().withMessage('Tahun wajib diisi jika data pekerjaan ditambahkan')
    .isInt({ max: new Date().getFullYear() }).withMessage('Tahun tidak boleh lebih besar dari tahun berjalan'),
  body('pekerjaan.*.pendapatan_terakhir')
    .notEmpty().withMessage('Pendapatan Terakhir wajib diisi jika data pekerjaan ditambahkan')
    .isFloat({ min: 0 }).withMessage('Pendapatan Terakhir tidak boleh bernilai negatif'),
];

module.exports = { biodataValidator };
