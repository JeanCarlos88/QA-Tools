/**
 * Utility functions for data validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Brazilian CPF
 * @param {string} cpf - CPF to validate
 * @returns {boolean} True if valid
 */
export const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (parseInt(cpf.charAt(9)) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (parseInt(cpf.charAt(10)) !== digit) return false;

  return true;
};

/**
 * Validate Brazilian CNPJ
 * @param {string} cnpj - CNPJ to validate
 * @returns {boolean} True if valid
 */
export const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length += 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

/**
 * Validate phone number (Brazilian format)
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validate IPv4 address
 * @param {string} ip - IP to validate
 * @returns {boolean} True if valid
 */
export const isValidIPv4 = (ip) => {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === num.toString();
  });
};

/**
 * Check if string is valid JSON
 * @param {string} str - String to check
 * @returns {boolean} True if valid JSON
 */
export const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};
