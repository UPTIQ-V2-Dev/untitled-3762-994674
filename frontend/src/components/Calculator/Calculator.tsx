import { useCalculator } from '../../hooks/useCalculator';
import { useKeyboardInput } from '../../hooks/useKeyboardInput';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { Operation } from '../../types/calculator';

export const Calculator = () => {
  const {
    display,
    inputNumber,
    inputOperation,
    calculate,
    clear,
    clearAll,
    inputDot,
    negate,
    percent,
    backspace,
  } = useCalculator();

  const handleButtonClick = (value: string) => {
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        inputNumber(value);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        inputOperation(value as Operation);
        break;
      case '=':
        calculate();
        break;
      case '.':
        inputDot();
        break;
      case 'clear':
        clearAll();
        break;
      case 'negate':
        negate();
        break;
      case 'percent':
        percent();
        break;
      case 'backspace':
        backspace();
        break;
      default:
        break;
    }
  };

  useKeyboardInput({
    onNumberInput: inputNumber,
    onOperationInput: inputOperation,
    onCalculate: calculate,
    onClear: clearAll,
    onDot: inputDot,
    onBackspace: backspace,
    onNegate: negate,
    onPercent: percent,
  });

  return (
    <div className="w-full max-w-sm mx-auto">
      <Display value={display} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  );
};