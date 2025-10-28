import { Operation } from '../types/calculator';

/**
 * Performs arithmetic calculations
 */
export const performCalculation = (a: number, b: number, operation: Operation): number => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
      return a / b;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};

/**
 * Formats numbers for display, handling scientific notation for large numbers
 */
export const formatNumber = (number: number): string => {
  if (isNaN(number)) {
    return 'Error';
  }
  
  if (!isFinite(number)) {
    return 'Error';
  }

  // Handle very large or very small numbers with scientific notation
  if (Math.abs(number) >= 1e10 || (Math.abs(number) < 1e-6 && number !== 0)) {
    return number.toExponential(6);
  }

  // Convert to string and remove unnecessary trailing zeros
  const str = number.toString();
  
  // If it's a decimal, remove trailing zeros
  if (str.includes('.')) {
    return str.replace(/\.?0+$/, '');
  }
  
  return str;
};

/**
 * Validates if the input is a valid number or decimal point
 */
export const isValidInput = (input: string): boolean => {
  // Allow digits, decimal point, and basic operations
  return /^[0-9+\-*/.=C]$/.test(input);
};

/**
 * Parses string input to number
 */
export const parseInput = (input: string): number => {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
};

/**
 * Checks if a string represents a valid number
 */
export const isNumeric = (str: string): boolean => {
  return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
};