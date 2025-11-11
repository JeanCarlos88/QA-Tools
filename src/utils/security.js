/**
 * Security utilities for sanitizing and validating user input
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeHTML = (str) => {
  if (!str) return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

/**
 * Sanitize object properties recursively
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
export const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? sanitizeHTML(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
  }
  return sanitized;
};

/**
 * Validate URL to prevent malicious URLs
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (error) {
    return false;
  }
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} True if valid
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file || !file.type) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum size in bytes
 * @returns {boolean} True if valid
 */
export const isValidFileSize = (file, maxSize) => {
  if (!file || !file.size) return false;
  return file.size <= maxSize;
};

/**
 * Generate a safe ID for use in HTML
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Safe ID
 */
export const generateSafeId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate JSON string safely
 * @param {string} str - String to validate
 * @returns {Object|null} Parsed object or null if invalid
 */
export const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
};

/**
 * Rate limiter for preventing abuse
 */
export class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }

  getRemainingTime() {
    if (this.requests.length === 0) return 0;
    const oldest = this.requests[0];
    const elapsed = Date.now() - oldest;
    return Math.max(0, this.windowMs - elapsed);
  }
}
