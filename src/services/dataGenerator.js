import { formatCPF, formatCNPJ, formatPhone } from '../utils/formatters';
import { isValidCPF, isValidCNPJ } from '../utils/validation';

/**
 * Data generators for testing
 */

const firstNames = [
  'Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena',
  'Igor', 'Juliana', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro', 'Rafaela',
  'Samuel', 'Tatiana', 'Victor', 'Yasmin'
];

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira',
  'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha', 'Almeida',
  'Nascimento', 'Araújo', 'Melo', 'Barbosa'
];

const domains = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'example.com',
  'test.com', 'email.com', 'mail.com'
];

/**
 * Generate random name
 */
export const generateName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

/**
 * Generate random email
 */
export const generateEmail = (name = null) => {
  const userName = name 
    ? name.toLowerCase().replace(/\s+/g, '.') 
    : `user${Math.floor(Math.random() * 10000)}`;
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${userName}@${domain}`;
};

/**
 * Generate valid Brazilian CPF
 */
export const generateCPF = () => {
  const randomDigits = () => Math.floor(Math.random() * 9);
  
  let cpf = Array.from({ length: 9 }, randomDigits);
  
  // Calculate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 >= 10) digit1 = 0;
  cpf.push(digit1);
  
  // Calculate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 >= 10) digit2 = 0;
  cpf.push(digit2);
  
  return formatCPF(cpf.join(''));
};

/**
 * Generate valid Brazilian CNPJ
 */
export const generateCNPJ = () => {
  const randomDigits = () => Math.floor(Math.random() * 9);
  
  let cnpj = Array.from({ length: 12 }, randomDigits);
  
  // Calculate first check digit
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += cnpj[i] * weights1[i];
  }
  let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  cnpj.push(digit1);
  
  // Calculate second check digit
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += cnpj[i] * weights2[i];
  }
  let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  cnpj.push(digit2);
  
  return formatCNPJ(cnpj.join(''));
};

/**
 * Generate random phone number (Brazilian format)
 */
export const generatePhone = (withNineDigit = true) => {
  const ddd = Math.floor(Math.random() * 89) + 11; // 11 to 99
  const firstDigit = withNineDigit ? 9 : Math.floor(Math.random() * 9);
  const digits = withNineDigit ? 8 : 7;
  const number = Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join('');
  
  return formatPhone(`${ddd}${firstDigit}${number}`);
};

/**
 * Generate random date
 */
export const generateDate = (startYear = 1950, endYear = 2005) => {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Generate random password
 */
export const generatePassword = (length = 12, options = {}) => {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options;

  let chars = '';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};

/**
 * Generate random UUID
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generate random IPv4 address
 */
export const generateIPv4 = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
};

/**
 * Generate random color hex code
 */
export const generateColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};
