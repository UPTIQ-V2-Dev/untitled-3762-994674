import { CalculatorButtonConfig } from '../types/calculator';

export const CALCULATOR_BUTTONS: CalculatorButtonConfig[] = [
  { label: 'C', value: 'clear', type: 'function', className: 'bg-orange-500 hover:bg-orange-600' },
  { label: '±', value: 'negate', type: 'function', className: 'bg-gray-600 hover:bg-gray-700' },
  { label: '%', value: 'percent', type: 'function', className: 'bg-gray-600 hover:bg-gray-700' },
  { label: '÷', value: '/', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600' },
  
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '×', value: '*', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600' },
  
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '−', value: '-', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600' },
  
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '+', value: '+', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600' },
  
  { label: '0', value: '0', type: 'number', className: 'col-span-2' },
  { label: '.', value: '.', type: 'function' },
  { label: '=', value: '=', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600' },
];

export const KEYBOARD_MAPPINGS: Record<string, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '=': '=',
  'Enter': '=',
  '.': '.',
  'Escape': 'clear',
  'Backspace': 'backspace',
  'c': 'clear',
  'C': 'clear',
};

export const ERROR_MESSAGES = {
  DIVISION_BY_ZERO: 'Cannot divide by zero',
  INVALID_OPERATION: 'Invalid operation',
  INVALID_INPUT: 'Invalid input',
  OVERFLOW: 'Number too large',
} as const;