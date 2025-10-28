import { useReducer } from 'react';
import { CalculatorState, Operation } from '../types/calculator';
import { performCalculation, formatNumber, parseInput } from '../utils/calculator';

type CalculatorAction =
  | { type: 'INPUT_NUMBER'; payload: string }
  | { type: 'INPUT_OPERATION'; payload: Operation }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ALL' }
  | { type: 'INPUT_DOT' }
  | { type: 'NEGATE' }
  | { type: 'PERCENT' }
  | { type: 'BACKSPACE' };

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case 'INPUT_NUMBER': {
      const { payload: number } = action;
      
      if (state.waitingForOperand) {
        return {
          ...state,
          display: number,
          waitingForOperand: false,
        };
      }

      return {
        ...state,
        display: state.display === '0' ? number : state.display + number,
      };
    }

    case 'INPUT_DOT': {
      if (state.waitingForOperand) {
        return {
          ...state,
          display: '0.',
          waitingForOperand: false,
        };
      }

      if (state.display.indexOf('.') === -1) {
        return {
          ...state,
          display: state.display + '.',
        };
      }

      return state;
    }

    case 'INPUT_OPERATION': {
      const { payload: operation } = action;
      const inputValue = parseInput(state.display);

      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: inputValue,
          operation,
          waitingForOperand: true,
        };
      }

      if (state.operation && state.waitingForOperand) {
        return {
          ...state,
          operation,
        };
      }

      if (state.operation) {
        try {
          const result = performCalculation(state.previousValue, inputValue, state.operation);
          return {
            ...state,
            display: formatNumber(result),
            previousValue: result,
            operation,
            waitingForOperand: true,
          };
        } catch (error) {
          return {
            ...state,
            display: 'Error',
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        }
      }

      return state;
    }

    case 'CALCULATE': {
      const inputValue = parseInput(state.display);

      if (state.previousValue !== null && state.operation) {
        try {
          const result = performCalculation(state.previousValue, inputValue, state.operation);
          return {
            ...state,
            display: formatNumber(result),
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        } catch (error) {
          return {
            ...state,
            display: 'Error',
            previousValue: null,
            operation: null,
            waitingForOperand: true,
          };
        }
      }

      return state;
    }

    case 'CLEAR': {
      return {
        ...state,
        display: '0',
        waitingForOperand: false,
      };
    }

    case 'CLEAR_ALL': {
      return initialState;
    }

    case 'NEGATE': {
      const value = parseInput(state.display);
      if (value === 0) return state;
      
      return {
        ...state,
        display: formatNumber(-value),
      };
    }

    case 'PERCENT': {
      const value = parseInput(state.display);
      return {
        ...state,
        display: formatNumber(value / 100),
      };
    }

    case 'BACKSPACE': {
      if (state.display.length <= 1 || state.display === '0') {
        return {
          ...state,
          display: '0',
        };
      }

      return {
        ...state,
        display: state.display.slice(0, -1),
      };
    }

    default:
      return state;
  }
};

export const useCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const inputNumber = (number: string) => {
    dispatch({ type: 'INPUT_NUMBER', payload: number });
  };

  const inputOperation = (operation: Operation) => {
    dispatch({ type: 'INPUT_OPERATION', payload: operation });
  };

  const calculate = () => {
    dispatch({ type: 'CALCULATE' });
  };

  const clear = () => {
    dispatch({ type: 'CLEAR' });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const inputDot = () => {
    dispatch({ type: 'INPUT_DOT' });
  };

  const negate = () => {
    dispatch({ type: 'NEGATE' });
  };

  const percent = () => {
    dispatch({ type: 'PERCENT' });
  };

  const backspace = () => {
    dispatch({ type: 'BACKSPACE' });
  };

  return {
    display: state.display,
    previousValue: state.previousValue,
    operation: state.operation,
    waitingForOperand: state.waitingForOperand,
    inputNumber,
    inputOperation,
    calculate,
    clear,
    clearAll,
    inputDot,
    negate,
    percent,
    backspace,
  };
};