import { useEffect } from 'react';
import { KEYBOARD_MAPPINGS } from '../utils/constants';
import { Operation } from '../types/calculator';

interface UseKeyboardInputProps {
  onNumberInput: (number: string) => void;
  onOperationInput: (operation: Operation) => void;
  onCalculate: () => void;
  onClear: () => void;
  onDot: () => void;
  onBackspace: () => void;
  onNegate: () => void;
  onPercent: () => void;
}

export const useKeyboardInput = ({
  onNumberInput,
  onOperationInput,
  onCalculate,
  onClear,
  onDot,
  onBackspace,
  onNegate,
  onPercent,
}: UseKeyboardInputProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const mappedKey = KEYBOARD_MAPPINGS[key];

      if (!mappedKey && !key.match(/[0-9+\-*/.=]/)) {
        return;
      }

      event.preventDefault();

      const targetKey = mappedKey || key;

      // Handle numbers
      if (targetKey.match(/[0-9]/)) {
        onNumberInput(targetKey);
        return;
      }

      // Handle operations
      if (targetKey.match(/[+\-*/]/)) {
        onOperationInput(targetKey as Operation);
        return;
      }

      // Handle special keys
      switch (targetKey) {
        case '=':
          onCalculate();
          break;
        case '.':
          onDot();
          break;
        case 'clear':
          onClear();
          break;
        case 'backspace':
          onBackspace();
          break;
        case 'negate':
          onNegate();
          break;
        case 'percent':
          onPercent();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    onNumberInput,
    onOperationInput,
    onCalculate,
    onClear,
    onDot,
    onBackspace,
    onNegate,
    onPercent,
  ]);
};