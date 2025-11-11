/**
 * Utility functions for formatting data
 */

/**
 * Format CPF (Brazilian ID)
 * @param {string} cpf - CPF to format
 * @returns {string} Formatted CPF
 */
export const formatCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Format CNPJ (Brazilian company ID)
 * @param {string} cnpj - CNPJ to format
 * @returns {string} Formatted CNPJ
 */
export const formatCNPJ = (cnpj) => {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Format phone number (Brazilian format)
 * @param {string} phone - Phone to format
 * @returns {string} Formatted phone
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

/**
 * Format date to Brazilian format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Format file size in human-readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format JSON with indentation
 * @param {Object|string} data - Data to format
 * @param {number} spaces - Number of spaces for indentation
 * @returns {string} Formatted JSON
 */
export const formatJSON = (data, spaces = 2) => {
  try {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;
    return JSON.stringify(obj, null, spaces);
  } catch (error) {
    return data;
  }
};

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
