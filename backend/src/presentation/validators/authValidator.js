const { body } = require('express-validator');

const registerValidator = [
  body('email')
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Email harus menggunakan format email yang valid')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password wajib diisi')
    .isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
  body('confirmPassword')
    .notEmpty().withMessage('Konfirmasi password wajib diisi')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password dan Confirm Password harus sama');
      }
      return true;
    }),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'USER', 'ADMIN']).withMessage('Role hanya boleh bernilai USER atau ADMIN')
    .customSanitizer(val => val.toLowerCase()),
];

const loginValidator = [
  body('email')
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Email harus menggunakan format email yang valid')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password wajib diisi'),
];

module.exports = { registerValidator, loginValidator };
