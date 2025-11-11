import { STORAGE_KEYS } from '../constants';
import { sanitizeObject } from './security';

/**
 * Storage service for managing localStorage with security
 */

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  try {
    const sanitizedValue = sanitizeObject(value);
    localStorage.setItem(key, JSON.stringify(sanitizedValue));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

/**
 * Clear all app data from localStorage
 * @returns {boolean} Success status
 */
export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get storage usage information
 * @returns {Object} Storage usage stats
 */
export const getStorageUsage = () => {
  let total = 0;
  const items = {};

  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const item = localStorage.getItem(key);
    const size = item ? new Blob([item]).size : 0;
    items[name] = size;
    total += size;
  });

  return { total, items };
};
