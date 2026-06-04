/**
 * Format tanggal dari ISO string ke format Indonesia
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format tanggal ke format input date (YYYY-MM-DD)
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatDateInput = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
};

/**
 * Format angka ke format currency Indonesia
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Hitung umur dari tanggal lahir
 * @param {string|Date} dateStr
 * @returns {number}
 */
export const calculateAge = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  const birthDate = new Date(dateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

/**
 * Truncate string
 */
export const truncate = (str, n = 50) => {
  if (!str) return '-';
  return str.length > n ? str.slice(0, n) + '...' : str;
};
